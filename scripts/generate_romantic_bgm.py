import math
import struct
import wave
import subprocess
import os

sample_rate = 44100
total_duration = 48.0
num_samples = int(sample_rate * total_duration)

left_channel = [0.0] * num_samples
right_channel = [0.0] * num_samples

def note_to_freq(name):
    # Equal temperament frequency table
    table = {
        'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54, 'B2': 123.47,
        'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
        'C4': 261.63, 'Db4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99,
        'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99,
        'G5': 783.99, 'A5': 880.00, 'Bb5': 932.33, 'C6': 1046.50
    }
    return table.get(name, 440.0)

# Add an expressive violin tone with vibrato and natural overtones
def add_violin_note(freq, start_time, duration, volume=0.3, pan=0.0):
    start_idx = int(start_time * sample_rate)
    length = int(duration * sample_rate)
    end_idx = min(num_samples, start_idx + length)
    
    # Harmonics profile for warm singing violin
    harmonics = [
        (1.0, 1.0),
        (2.0, 0.45),
        (3.0, 0.28),
        (4.0, 0.16),
        (5.0, 0.10),
        (6.0, 0.05)
    ]
    
    for i in range(start_idx, end_idx):
        t = (i - start_idx) / sample_rate
        # Natural romantic vibrato (5.5 Hz vibrato that increases slightly after 0.2s)
        vib_depth = min(1.0, t / 0.4) * 0.007
        f_mod = freq * (1.0 + vib_depth * math.sin(2 * math.pi * 5.6 * t))
        
        # Envelope: soft romantic bowing attack (0.15s), singing sustain, gentle release
        if t < 0.18:
            env = t / 0.18
        elif t > duration - 0.25:
            env = max(0.0, (duration - t) / 0.25)
        else:
            env = 1.0 + 0.08 * math.sin(2 * math.pi * 1.5 * t) # subtle emotional swell
            
        sample = 0.0
        for h_num, h_amp in harmonics:
            sample += h_amp * math.sin(2 * math.pi * (f_mod * h_num) * t)
            
        sample *= (env * volume)
        left_vol = (1.0 - pan) * 0.5
        right_vol = (1.0 + pan) * 0.5
        left_channel[i] += sample * left_vol
        right_channel[i] += sample * right_vol

# Add warm acoustic piano / guitar chord note
def add_piano_note(freq, start_time, duration, volume=0.25, pan=0.0):
    start_idx = int(start_time * sample_rate)
    length = int(duration * sample_rate)
    end_idx = min(num_samples, start_idx + length)
    
    for i in range(start_idx, end_idx):
        t = (i - start_idx) / sample_rate
        # Fast hammer attack, exponential decay
        env = math.exp(-3.2 * t)
        sample = (
            math.sin(2 * math.pi * freq * t) +
            0.4 * math.sin(2 * math.pi * freq * 2 * t) * math.exp(-4.5 * t) +
            0.15 * math.sin(2 * math.pi * freq * 3 * t) * math.exp(-6.0 * t)
        ) * env * volume
        
        left_vol = (1.0 - pan) * 0.5
        right_vol = (1.0 + pan) * 0.5
        left_channel[i] += sample * left_vol
        right_channel[i] += sample * right_vol

# Add rich cello bass note
def add_cello_note(freq, start_time, duration, volume=0.28, pan=-0.2):
    start_idx = int(start_time * sample_rate)
    length = int(duration * sample_rate)
    end_idx = min(num_samples, start_idx + length)
    
    for i in range(start_idx, end_idx):
        t = (i - start_idx) / sample_rate
        if t < 0.2:
            env = t / 0.2
        elif t > duration - 0.3:
            env = max(0.0, (duration - t) / 0.3)
        else:
            env = 1.0
            
        sample = (
            math.sin(2 * math.pi * freq * t) +
            0.35 * math.sin(2 * math.pi * freq * 2 * t) +
            0.15 * math.sin(2 * math.pi * freq * 3 * t)
        ) * env * volume
        
        left_vol = (1.0 - pan) * 0.5
        right_vol = (1.0 + pan) * 0.5
        left_channel[i] += sample * left_vol
        right_channel[i] += sample * right_vol

# Add soft celestial music-box bell chime
def add_bell_chime(freq, start_time, duration=2.5, volume=0.12, pan=0.3):
    start_idx = int(start_time * sample_rate)
    length = int(duration * sample_rate)
    end_idx = min(num_samples, start_idx + length)
    
    for i in range(start_idx, end_idx):
        t = (i - start_idx) / sample_rate
        env = math.exp(-2.2 * t)
        sample = math.sin(2 * math.pi * freq * t) * env * volume
        left_vol = (1.0 - pan) * 0.5
        right_vol = (1.0 + pan) * 0.5
        left_channel[i] += sample * left_vol
        right_channel[i] += sample * right_vol

# Build the 48-second emotional love symphony
# 8 measures of 6.0 seconds each = exactly 48.0 seconds

chords = [
    # Measure 1 (0.0 - 6.0): D Minor 9 (Tender romantic opening, solo violin longing)
    {'bass': 'D2', 'harmony': ['D3', 'F3', 'A3', 'C4'], 'time': 0.0},
    # Measure 2 (6.0 - 12.0): Bb Major 7 (Deep affection, warm acoustic guitar arpeggios)
    {'bass': 'Bb2', 'harmony': ['Bb2', 'D3', 'F3', 'A3'], 'time': 6.0},
    # Measure 3 (12.0 - 18.0): C Major 9 (Blossoming hope & sweet connection)
    {'bass': 'C3', 'harmony': ['C3', 'E3', 'G3', 'D4'], 'time': 12.0},
    # Measure 4 (18.0 - 24.0): A Minor 7 (Soulful caress & gentle sigh)
    {'bass': 'A2', 'harmony': ['A2', 'C3', 'E3', 'G3'], 'time': 18.0},
    # Measure 5 (24.0 - 30.0): F Major (Soaring romantic strings swell)
    {'bass': 'F2', 'harmony': ['F3', 'A3', 'C4', 'E4'], 'time': 24.0},
    # Measure 6 (30.0 - 36.0): G Minor 9 (Intense passionate crescendo)
    {'bass': 'G2', 'harmony': ['G3', 'Bb3', 'D4', 'F4'], 'time': 30.0},
    # Measure 7 (36.0 - 42.0): Bb Major (Peak emotional climax & sparkles)
    {'bass': 'Bb2', 'harmony': ['Bb2', 'D3', 'F3', 'Bb3'], 'time': 36.0},
    # Measure 8 (42.0 - 48.0): A7sus4 -> D Minor resolution (Sweet romantic return, seamless loop)
    {'bass': 'A2', 'harmony': ['A2', 'E3', 'G3', 'C4'], 'time': 42.0},
]

# 1. Render Bass & Chord Accompaniment
for ch in chords:
    t = ch['time']
    dur = 5.95
    add_cello_note(note_to_freq(ch['bass']), t, dur, volume=0.26)
    
    # Lush strings harmony pad
    for note in ch['harmony']:
        add_violin_note(note_to_freq(note), t, dur, volume=0.10, pan=-0.1)
        
    # Flowing acoustic piano arpeggio figures throughout the measure
    for step in range(6):
        arp_time = t + step * 0.95
        arp_note = ch['harmony'][step % len(ch['harmony'])]
        add_piano_note(note_to_freq(arp_note), arp_time, 1.8, volume=0.18, pan=0.15)
        if step % 2 == 1:
            add_bell_chime(note_to_freq(arp_note) * 2, arp_time, 2.0, volume=0.08, pan=0.25)

# 2. Render the Singing Romantic Solo Violin Melody (heartfelt theme)
melody_notes = [
    # Bar 1 (0-6s): Theme statement
    ('D4', 0.2, 1.4, 0.35), ('F4', 1.6, 1.2, 0.38), ('A4', 2.8, 2.2, 0.44), ('G4', 4.4, 0.9, 0.36), ('F4', 5.1, 0.8, 0.35),
    
    # Bar 2 (6-12s): Warm rising phrase
    ('D4', 6.2, 1.2, 0.36), ('F4', 7.4, 1.4, 0.38), ('Bb4', 8.8, 1.8, 0.42), ('D5', 10.2, 1.6, 0.46),
    
    # Bar 3 (12-18s): Sweet ascending grace
    ('C5', 12.2, 1.4, 0.42), ('Bb4', 13.6, 1.2, 0.38), ('A4', 14.8, 1.6, 0.40), ('G4', 16.2, 1.6, 0.36),
    
    # Bar 4 (18-24s): Soulful descent
    ('E4', 18.2, 1.4, 0.35), ('G4', 19.6, 1.4, 0.38), ('F4', 21.0, 1.6, 0.39), ('E4', 22.4, 1.4, 0.34),
    
    # Bar 5 (24-30s): Soaring emotional climax begins
    ('F4', 24.2, 1.2, 0.40), ('A4', 25.4, 1.4, 0.45), ('C5', 26.6, 1.6, 0.48), ('F5', 28.0, 2.0, 0.52),
    
    # Bar 6 (30-36s): Passionate violin vibrato
    ('E5', 30.2, 1.6, 0.48), ('D5', 31.8, 1.4, 0.44), ('Bb4', 33.2, 1.6, 0.42), ('C5', 34.6, 1.3, 0.40),
    
    # Bar 7 (36-42s): Grand emotional release
    ('D5', 36.2, 1.8, 0.48), ('F5', 37.8, 2.2, 0.52), ('E5', 39.8, 1.2, 0.44), ('D5', 40.8, 1.1, 0.42),
    
    # Bar 8 (42-48s): Gentle resolution back to root (loops seamlessly)
    ('Db4', 42.2, 1.5, 0.36), ('E4', 43.6, 1.4, 0.35), ('D4', 44.8, 2.8, 0.38)
]

for note_name, start_t, dur, vol in melody_notes:
    add_violin_note(note_to_freq(note_name), start_t, dur, volume=vol, pan=0.05)

# 3. Simple stereo reverb / spatial echo
delay_samples = int(sample_rate * 0.32)
decay = 0.28
for i in range(delay_samples, num_samples):
    left_channel[i] += right_channel[i - delay_samples] * decay
    right_channel[i] += left_channel[i - delay_samples] * decay

# 4. Master volume normalization (clean peak at 0.85 to prevent clipping)
max_peak = max(max(abs(s) for s in left_channel), max(abs(s) for s in right_channel))
if max_peak > 0:
    gain = 0.85 / max_peak
    left_channel = [s * gain for s in left_channel]
    right_channel = [s * gain for s in right_channel]

# Seamless loop crossfade (first 0.4s and last 0.4s smoothly blend to eliminate any click/pop)
fade_len = int(sample_rate * 0.4)
for i in range(fade_len):
    w = i / fade_len
    # Crossfade end into start
    left_channel[i] = left_channel[i] * w + left_channel[num_samples - fade_len + i] * (1.0 - w)
    right_channel[i] = right_channel[i] * w + right_channel[num_samples - fade_len + i] * (1.0 - w)

# Write to WAV
wav_path = '/tmp/romantic_bgm.wav'
with wave.open(wav_path, 'wb') as wav_file:
    wav_file.setnchannels(2)
    wav_file.setsampwidth(2)
    wav_file.setframerate(sample_rate)
    
    interleaved = bytearray()
    for l, r in zip(left_channel, right_channel):
        l_int = int(max(-32767, min(32767, l * 32767)))
        r_int = int(max(-32767, min(32767, r * 32767)))
        interleaved.extend(struct.pack('<hh', l_int, r_int))
        
    wav_file.writeframes(interleaved)

# Convert to high-quality MP3 at /public/bgm.mp3 and /public/romantic_bgm.mp3
os.makedirs('public', exist_ok=True)
subprocess.run(['ffmpeg', '-y', '-i', wav_path, '-codec:a', 'libmp3lame', '-b:a', '192k', 'public/bgm.mp3'], check=True)
subprocess.run(['cp', 'public/bgm.mp3', 'public/romantic_bgm.mp3'], check=True)
print("Successfully generated /public/bgm.mp3 (48.0s seamless loop)")
