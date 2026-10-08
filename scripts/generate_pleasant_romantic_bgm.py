import math
import struct
import wave
import subprocess
import os

sample_rate = 44100
bpm = 56.0  # Slow, calm, soothing, tender tempo
beat_dur = 60.0 / bpm  # ~1.07 seconds per beat
measure_dur = beat_dur * 4 # ~4.285 seconds per measure
total_measures = 12
total_duration = total_measures * measure_dur # ~51.4 seconds
num_samples = int(sample_rate * total_duration)

left_channel = [0.0] * num_samples
right_channel = [0.0] * num_samples

def note_freq(name):
    notes = {
        'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54,
        'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08,
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'Bb5': 932.33, 'C6': 1046.50
    }
    return notes.get(name, 440.0)

# Ultra-soft Felt Piano (pure, warm, soothing round tones, zero harshness)
def add_felt_piano(freq, start_t, dur, vol=0.25, pan=0.0):
    start_i = int(start_t * sample_rate)
    length = int(dur * sample_rate)
    end_i = min(num_samples, start_i + length)
    
    for i in range(start_i, end_i):
        t = (i - start_i) / sample_rate
        # Gentle felt hammer attack (15ms soft rise)
        if t < 0.015:
            att = t / 0.015
        else:
            att = 1.0
            
        # Natural warm exponential decay
        dec = math.exp(-2.2 * t)
        
        # Fundamental + subtle warm mellow harmonics only (no high screechy frequencies)
        s = (
            1.0 * math.sin(2 * math.pi * freq * t) +
            0.35 * math.sin(2 * math.pi * freq * 2 * t) * math.exp(-3.5 * t) +
            0.10 * math.sin(2 * math.pi * freq * 3 * t) * math.exp(-5.5 * t)
        ) * att * dec * vol
        
        l_v = (1.0 - pan) * 0.5
        r_v = (1.0 + pan) * 0.5
        left_channel[i] += s * l_v
        right_channel[i] += s * r_v

# Soft Music Box / Celesta Bell (sparkling, gentle, like cozy lullaby chimes)
def add_music_box(freq, start_t, dur=2.2, vol=0.12, pan=0.2):
    start_i = int(start_t * sample_rate)
    length = int(dur * sample_rate)
    end_i = min(num_samples, start_i + length)
    
    for i in range(start_i, end_i):
        t = (i - start_i) / sample_rate
        dec = math.exp(-2.8 * t)
        # Pure sine bell with warm bell harmonic
        s = (
            math.sin(2 * math.pi * freq * t) +
            0.2 * math.sin(2 * math.pi * freq * 2.005 * t)
        ) * dec * vol
        
        l_v = (1.0 - pan) * 0.5
        r_v = (1.0 + pan) * 0.5
        left_channel[i] += s * l_v
        right_channel[i] += s * r_v

# Warm Cello Bass (very soft, rounded, soothing foundation)
def add_warm_bass(freq, start_t, dur, vol=0.22, pan=-0.15):
    start_i = int(start_t * sample_rate)
    length = int(dur * sample_rate)
    end_i = min(num_samples, start_i + length)
    
    for i in range(start_i, end_i):
        t = (i - start_i) / sample_rate
        if t < 0.1:
            att = t / 0.1
        elif t > dur - 0.2:
            att = max(0.0, (dur - t) / 0.2)
        else:
            att = 1.0
            
        s = (
            math.sin(2 * math.pi * freq * t) +
            0.25 * math.sin(2 * math.pi * freq * 2 * t)
        ) * att * vol
        
        l_v = (1.0 - pan) * 0.5
        r_v = (1.0 + pan) * 0.5
        left_channel[i] += s * l_v
        right_channel[i] += s * r_v

# Sweet, Pleasant Romantic Chord Progression:
# F maj9 -> C add9 -> D min9 -> Bb maj7 -> F/A -> Gm7 -> C sus4 -> F maj
chord_prog = [
    # 0: F Major 9 (Sweet warmth & peace)
    {'bass': 'F2', 'notes': ['F3', 'A3', 'C4', 'E4', 'G4']},
    # 1: C add9 (Gentle hope)
    {'bass': 'C3', 'notes': ['G3', 'C4', 'D4', 'E4', 'G4']},
    # 2: D Minor 9 (Romantic tenderness)
    {'bass': 'D2', 'notes': ['F3', 'A3', 'C4', 'E4', 'F4']},
    # 3: Bb Major 7 (Warm cozy embrace)
    {'bass': 'Bb2', 'notes': ['F3', 'Bb3', 'D4', 'F4', 'A4']},
    # 4: F Major / A (Gentle lullaby)
    {'bass': 'A2', 'notes': ['F3', 'A3', 'C4', 'F4']},
    # 5: G Minor 7 (Tender affection)
    {'bass': 'G2', 'notes': ['D3', 'G3', 'Bb3', 'D4', 'F4']},
    # 6: C 7sus4 -> C (Soft expectation)
    {'bass': 'C3', 'notes': ['G3', 'C4', 'F4', 'G4', 'E4']},
    # 7: F Major 9 (Heartwarming resolution)
    {'bass': 'F2', 'notes': ['F3', 'A3', 'C4', 'E4', 'A4']},
    # 8: D Minor (Sweet contemplation)
    {'bass': 'D2', 'notes': ['D3', 'F3', 'A3', 'D4', 'E4']},
    # 9: Bb Major (Deep pure love)
    {'bass': 'Bb2', 'notes': ['D3', 'F3', 'Bb3', 'D4', 'F4']},
    # 10: G Minor 9 -> C7 (Romantic buildup)
    {'bass': 'G2', 'notes': ['D3', 'G3', 'Bb3', 'C4', 'E4']},
    # 11: F Major (Loop point, returns softly to start)
    {'bass': 'F2', 'notes': ['C3', 'F3', 'A3', 'C4', 'E4']}
]

# 1. Play Soft Arpeggiated Chords & Bass
for m_idx, chord in enumerate(chord_prog):
    m_start = m_idx * measure_dur
    # Warm bass note on beat 1
    add_warm_bass(note_freq(chord['bass']), m_start, measure_dur * 0.95, vol=0.20)
    
    # Soft flowing felt piano arpeggios (8 eighth notes per measure)
    for step in range(8):
        t_step = m_start + step * (measure_dur / 8.0)
        n_name = chord['notes'][step % len(chord['notes'])]
        pan_val = -0.2 + (step % 4) * 0.1
        add_felt_piano(note_freq(n_name), t_step, 2.0, vol=0.18, pan=pan_val)
        
        # Subtle music box chimes on beats 1 and 5
        if step in (0, 4):
            chime_n = chord['notes'][(step + 2) % len(chord['notes'])]
            add_music_box(note_freq(chime_n) * 2, t_step, 2.5, vol=0.08, pan=0.25)

# 2. Add an Ultra-Sweet, Pleasant Romantic Melody on Piano & Music Box
# Completely calm, soothing, peaceful, and romantic
melody = [
    # M1 (F): "I love you" opening motif
    ('A4', 0.0, 1.8), ('C5', 1.8, 1.2), ('E5', 2.8, 1.5),
    # M2 (C):
    ('D5', 4.3, 1.8), ('C5', 6.0, 1.2), ('G4', 7.2, 1.4),
    # M3 (Dm):
    ('F4', 8.6, 1.6), ('A4', 10.2, 1.4), ('D5', 11.6, 1.6),
    # M4 (Bb):
    ('C5', 12.9, 1.8), ('Bb4', 14.5, 1.4), ('A4', 15.8, 1.4),
    # M5 (F/A):
    ('F4', 17.2, 1.8), ('G4', 19.0, 1.2), ('A4', 20.2, 1.4),
    # M6 (Gm):
    ('Bb4', 21.5, 1.6), ('A4', 23.0, 1.4), ('G4', 24.3, 1.5),
    # M7 (C7):
    ('E4', 25.8, 1.8), ('F4', 27.5, 1.2), ('G4', 28.7, 1.5),
    # M8 (F):
    ('A4', 30.1, 2.2), ('C5', 32.2, 1.8),
    # M9 (Dm): Sweet high bell
    ('E5', 34.4, 2.0), ('D5', 36.4, 1.8), ('C5', 37.8, 1.2),
    # M10 (Bb):
    ('D5', 38.7, 2.0), ('F5', 40.6, 1.8), ('E5', 42.0, 1.4),
    # M11 (Gm -> C):
    ('D5', 43.0, 1.8), ('C5', 44.6, 1.6), ('Bb4', 46.0, 1.4),
    # M12 (F): Gentle return home
    ('A4', 47.3, 2.4), ('F4', 49.2, 2.2)
]

for n_name, start_t, dur in melody:
    # Soft singing felt piano melody note
    add_felt_piano(note_freq(n_name), start_t, dur * 1.2, vol=0.28, pan=0.0)
    # Layered delicate celesta bell for romantic sweetness
    add_music_box(note_freq(n_name), start_t, dur * 1.5, vol=0.10, pan=0.15)

# 3. Soft warm stereo reverb
rev_samples = int(sample_rate * 0.38)
for i in range(rev_samples, num_samples):
    left_channel[i] += right_channel[i - rev_samples] * 0.22
    right_channel[i] += left_channel[i - rev_samples] * 0.22

# 4. Master volume normalization (soft and pleasant, peak at 0.75)
peak = max(max(abs(s) for s in left_channel), max(abs(s) for s in right_channel))
if peak > 0:
    g = 0.75 / peak
    left_channel = [s * g for s in left_channel]
    right_channel = [s * g for s in right_channel]

# 5. Perfect seamless crossfade at loop boundary (first 0.5s & last 0.5s)
fade_s = int(sample_rate * 0.5)
for i in range(fade_s):
    w = i / fade_s
    left_channel[i] = left_channel[i] * w + left_channel[num_samples - fade_s + i] * (1.0 - w)
    right_channel[i] = right_channel[i] * w + right_channel[num_samples - fade_s + i] * (1.0 - w)

# Write to WAV
wav_path = '/tmp/pleasant_romantic_bgm.wav'
with wave.open(wav_path, 'wb') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(sample_rate)
    
    buf = bytearray()
    for l, r in zip(left_channel, right_channel):
        l_val = int(max(-32767, min(32767, l * 32767)))
        r_val = int(max(-32767, min(32767, r * 32767)))
        buf.extend(struct.pack('<hh', l_val, r_val))
    wf.writeframes(buf)

# Export to /public/bgm.mp3 and /public/romantic_bgm.mp3
os.makedirs('public', exist_ok=True)
subprocess.run(['ffmpeg', '-y', '-i', wav_path, '-codec:a', 'libmp3lame', '-b:a', '192k', 'public/bgm.mp3'], check=True)
subprocess.run(['cp', 'public/bgm.mp3', 'public/romantic_bgm.mp3'], check=True)
print(f"Successfully generated pleasant romantic music ({total_duration:.1f}s loop)")
