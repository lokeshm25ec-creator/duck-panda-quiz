import { Question, CoupleProfile, QuizScores, AnswerChoice } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    questionNumber: 1,
    duckQuestion: "Panda, be honest… who is more likely to say 'I just want one bite' and take half the burger?",
    duckPromptMood: "confused",
    choices: [
      {
        id: "1a",
        text: "Panda 100%. My 'one bite' has the geometric surface area of a shark attack 🦈🍔",
        pandaExpression: "embarrassed",
        duckReaction: "I KNEW IT! My burgers look like they survived an archaeological excavation! 😭🍟",
        duckExpression: "shocked",
        scores: { cute: 8, chaos: 9, softness: 6, teasing: 8 }
      },
      {
        id: "1b",
        text: "Vaathu! You say 'just tasting' and suddenly my fries need a missing persons report 🍟🚨",
        pandaExpression: "laughing",
        duckReaction: "Hey! That is mandatory government quality control! Be grateful for my service! 😤🐣",
        duckExpression: "angry-but-cute",
        scores: { cute: 9, chaos: 7, softness: 7, teasing: 10 }
      },
      {
        id: "1c",
        text: "Both of us. We eat like two competitive raccoons behind an unattended pizza shop 🦝🍕",
        pandaExpression: "excited",
        duckReaction: "Accurate! There is no honor, no peace treaty, only survival when pizza arrives! 🍕⚔️",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 10, softness: 5, teasing: 7 }
      },
      {
        id: "1d",
        text: "I offer to share politely, but my eyes whisper 'touch this and face federal charges' 👁️🔪",
        pandaExpression: "shy",
        duckReaction: "The silent deadly glare! I withdraw my tiny feathers for my own safety! 😳🦆",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 4, softness: 8, teasing: 6 }
      }
    ]
  },
  {
    id: 2,
    questionNumber: 2,
    duckQuestion: "If I say 'I'm totally fine', what does Panda's gut instinct tell you? 👀",
    duckPromptMood: "confused",
    choices: [
      {
        id: "2a",
        text: "'Evacuate the perimeter. Order chocolate. Apologize for breathing too loudly' 🍫💣",
        pandaExpression: "happy",
        duckReaction: "Brilliant survival instincts, Panda! You might actually survive this relationship! 🏆❤️",
        duckExpression: "excited",
        scores: { cute: 10, chaos: 4, softness: 10, teasing: 4 }
      },
      {
        id: "2b",
        text: "'Initiate emergency blanket burrito protocol and play cute animal videos' 🌯🐶",
        pandaExpression: "shy",
        duckReaction: "Rolling me into a warm sushi roll is literally the cure to all my life problems! 🥺✨",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 3, softness: 10, teasing: 3 }
      },
      {
        id: "2c",
        text: "'Vaathu is currently drafting a 47-page imaginary courtroom closing argument' ⚖️🦆",
        pandaExpression: "shocked",
        duckReaction: "Your Honor, I object to being psychoanalyzed so accurately right now!! 😭🔨",
        duckExpression: "embarrassed",
        scores: { cute: 9, chaos: 8, softness: 7, teasing: 9 }
      },
      {
        id: "2d",
        text: "'They said fine, so they must be fine!' (famous last words spoken before disaster) 💀⚰️",
        pandaExpression: "confused",
        duckReaction: "PANDA NO! Sweet innocent creature... that is how civilizations fall! 🤣🚨",
        duckExpression: "laughing",
        scores: { cute: 7, chaos: 9, softness: 5, teasing: 10 }
      }
    ]
  },
  {
    id: 3,
    questionNumber: 3,
    duckQuestion: "Who is more guilty of whispering 'just one more episode/reel' and staying awake until 3:30 AM?",
    duckPromptMood: "laughing",
    choices: [
      {
        id: "3a",
        text: "Panda! Then I pass out in 4 seconds and snore like a diesel tractor engine 🚜😴",
        pandaExpression: "embarrassed",
        duckReaction: "HONK SHOO HONK SHOO! You rattle the window panes while I'm wide awake! 🚜😂",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 9, softness: 7, teasing: 9 }
      },
      {
        id: "3b",
        text: "Vaathu! You aggressively shake my shoulder at 2:45 AM yelling 'LOOK AT THIS DANCING FROG' 🐸📱",
        pandaExpression: "shocked",
        duckReaction: "THAT FROG HAD RHYTHM, PANDA! It was a cultural event! You needed to bear witness! 💃🐸",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 9, softness: 6, teasing: 9 }
      },
      {
        id: "3c",
        text: "Both of us! Two sleep-deprived zombies sharing our last functioning brain cell 🧟‍♂️🧟‍♀️",
        pandaExpression: "excited",
        duckReaction: "At 3 AM our conversations sound like broken radio signals! We are completely unhinged! 🧠💀",
        duckExpression: "confused",
        scores: { cute: 9, chaos: 10, softness: 6, teasing: 7 }
      },
      {
        id: "3d",
        text: "The phone algorithms have taken us hostage, we are completely innocent victims! 👽📲",
        pandaExpression: "shy",
        duckReaction: "Yes! Blame the evil algorithm! It forced us to watch 40 carpet cleaning videos! 🧼✨",
        duckExpression: "happy",
        scores: { cute: 8, chaos: 8, softness: 8, teasing: 6 }
      }
    ]
  },
  {
    id: 4,
    questionNumber: 4,
    duckQuestion: "Who would survive longer without texting the other first?",
    duckPromptMood: "happy",
    choices: [
      {
        id: "4a",
        text: "Neither. Within 9 minutes someone sends an unhinged meme with zero context 🤡💬",
        pandaExpression: "laughing",
        duckReaction: "No greeting, no 'hello', just a photo of a cursed pigeon! That is true love! 🐦💬",
        duckExpression: "laughing",
        scores: { cute: 10, chaos: 8, softness: 9, teasing: 6 }
      },
      {
        id: "4b",
        text: "Panda! I can stare at a blank ceiling for 6 hours without a single thought 🪨🧘‍♂️",
        pandaExpression: "excited",
        duckReaction: "Lies! The moment you get hungry your paws instinctively type 'vaathu food?' 🍔🐾",
        duckExpression: "confused",
        scores: { cute: 7, chaos: 6, softness: 6, teasing: 9 }
      },
      {
        id: "4c",
        text: "Vaathu tries to stay quiet, but fails because you HAVE to report neighborhood drama 📢🦆",
        pandaExpression: "embarrassed",
        duckReaction: "THE NEIGHBOR'S CAT CLIMBED ON THE ROOF, PANDA! I am a frontline investigative reporter! 🕵️‍♀️📰",
        duckExpression: "shocked",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 8 }
      },
      {
        id: "4d",
        text: "I last 30 seconds before panic-asking 'Are you mad at me or did you get kidnapped?' 🥺🚨",
        pandaExpression: "blushing",
        duckReaction: "OMG PANDA!! Stop being so precious before my heart combusts into pure glitter! 💖💥",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 3, softness: 10, teasing: 2 }
      }
    ]
  },
  {
    id: 5,
    questionNumber: 5,
    duckQuestion: "When we have a silly disagreement, who secretly wants to break character and hug first?",
    duckPromptMood: "shy",
    choices: [
      {
        id: "5a",
        text: "Panda! I'm sitting there trying to look tough while secretly wanting to be squished 🥺",
        pandaExpression: "shy",
        duckReaction: "You look like a grumpy little toasted marshmallow! Come here and take your hug! 🫂🔥",
        duckExpression: "happy",
        scores: { cute: 10, chaos: 4, softness: 10, teasing: 4 }
      },
      {
        id: "5b",
        text: "Vaathu! You make aggressive angry quacking noises for 90 seconds then demand cuddles 🐣💢",
        pandaExpression: "laughing",
        duckReaction: "Look, my anger has an expiration date of 2 minutes, then my cuddle timer starts! 😤💕",
        duckExpression: "blushing",
        scores: { cute: 9, chaos: 6, softness: 9, teasing: 7 }
      },
      {
        id: "5c",
        text: "Both of us! We glare like anime rivals until someone accidentally snorts or laughs 🤣⚔️",
        pandaExpression: "embarrassed",
        duckReaction: "The classic 'trying not to smile' mouth twitch! The moment one cracks, it's over! 💀",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 8 }
      },
      {
        id: "5d",
        text: "Whoever gets lured out of hiding by the smell of hot biryani or crispy fries 🍗🤤",
        pandaExpression: "happy",
        duckReaction: "Food diplomacy: uniting Pandas and Vaathus worldwide since the beginning of time! 🍗✨",
        duckExpression: "excited",
        scores: { cute: 8, chaos: 8, softness: 7, teasing: 6 }
      }
    ]
  },
  {
    id: 6,
    questionNumber: 6,
    duckQuestion: "When it's dinner time and I ask 'What should we eat?', what happens next?",
    duckPromptMood: "confused",
    choices: [
      {
        id: "6a",
        text: "The Olympic 50-Minute 'Anything is fine' -> 'No, not that' World Championship 🏅🤦‍♂️",
        pandaExpression: "embarrassed",
        duckReaction: "'You choose!' 'Okay, tacos?' 'No, not tacos.' 'Sushi?' 'No.' AND REPEAT 40 TIMES! 🌮💀",
        duckExpression: "laughing",
        scores: { cute: 8, chaos: 9, softness: 7, teasing: 8 }
      },
      {
        id: "6b",
        text: "Panda rejects 14 Michelin restaurants then decides on 20 chicken nuggets 🍗✨",
        pandaExpression: "laughing",
        duckReaction: "A connoisseur of high culinary art! 20 nuggets and sweet-and-sour sauce every time! 🏆",
        duckExpression: "angry-but-cute",
        scores: { cute: 9, chaos: 8, softness: 6, teasing: 9 }
      },
      {
        id: "6c",
        text: "Vaathu already picked a place 4 hours ago and is waiting for me to guess it wrong 🎯🔮",
        pandaExpression: "shocked",
        duckReaction: "It's an IQ test, Panda! If you truly love me, your mind should read my mind! 🧠🔮",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 9 }
      },
      {
        id: "6d",
        text: "We give up on adulting and eat cereal in bed while questioning our life choices 🥣🛋️",
        pandaExpression: "happy",
        duckReaction: "Crunching cereal in pajama blankets together is honestly peak relationship luxury! 🥣💖",
        duckExpression: "happy",
        scores: { cute: 10, chaos: 5, softness: 10, teasing: 4 }
      }
    ]
  },
  {
    id: 7,
    questionNumber: 7,
    duckQuestion: "Be honest Panda… who gets slightly more pouty when the other is busy looking at their phone?",
    duckPromptMood: "shy",
    choices: [
      {
        id: "7a",
        text: "Panda! I will literally rest my heavy head directly on your phone screen until you pet me 🐼📱",
        pandaExpression: "shy",
        duckReaction: "The human headrest tactic! Resistance is completely futile against panda cheeks! 🥺💖",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 5, softness: 10, teasing: 4 }
      },
      {
        id: "7b",
        text: "Vaathu! If I take 12 seconds to reply, you send 15 question marks and a dramatic skull 💀❓",
        pandaExpression: "laughing",
        duckReaction: "WHAT WERE YOU DOING FOR THOSE 12 SECONDS PANDA?! WERE YOU GETTING A DEGREE?! 🎓😤",
        duckExpression: "angry-but-cute",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 9 }
      },
      {
        id: "7c",
        text: "Both of us! Two Stage-5 clingy gremlins competing for 24/7 attention 🧲🤪",
        pandaExpression: "excited",
        duckReaction: "We are both certified Velcro pets! Separation anxiety starts after 8 seconds apart! 🧲😂",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 9, softness: 7, teasing: 7 }
      },
      {
        id: "7d",
        text: "We pretend we're super chill and independent, but our souls are emotionally vibrating 📳😤",
        pandaExpression: "embarrassed",
        duckReaction: "'I don't care at all.' *secretly refreshing notifications at 400 clicks per minute* 🕶️",
        duckExpression: "confused",
        scores: { cute: 8, chaos: 8, softness: 8, teasing: 8 }
      }
    ]
  },
  {
    id: 8,
    questionNumber: 8,
    duckQuestion: "If Panda and Vaathu went on a spontaneous midnight drive, who is driving and who is in charge of snacks?",
    duckPromptMood: "excited",
    choices: [
      {
        id: "8a",
        text: "Panda drives carefully; Vaathu does full Broadway screeching in the passenger seat 🎤🦆",
        pandaExpression: "laughing",
        duckReaction: "You're getting a free live concert with special duck acoustics! You should be tipping me! 🎶",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 9, softness: 7, teasing: 8 }
      },
      {
        id: "8b",
        text: "Vaathu gives panic GPS directions ('TURN HERE NO THE OTHER LEFT') while Panda sweats 🗺️🚗",
        pandaExpression: "happy",
        duckReaction: "'The other left' is a scientifically valid spatial coordinate, Panda! Don't blame me! 🗺️😂",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 6 }
      },
      {
        id: "8c",
        text: "We spend 40 minutes looking for shoes, get exhausted, and just sit eating chips in the driveway 🛋️🥔",
        pandaExpression: "embarrassed",
        duckReaction: "Car never left the garage, but the snack bag is empty! Mission accomplished! 🚗🍟",
        duckExpression: "happy",
        scores: { cute: 10, chaos: 4, softness: 10, teasing: 4 }
      },
      {
        id: "8d",
        text: "Panda's sole mission is raiding 7-Eleven like a convenience store bandit 🏪🎒",
        pandaExpression: "blushing",
        duckReaction: "Walking out with 4 iced teas, 3 bags of chips, and zero regrets! That's my panda! 🧋🛒",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 8, softness: 10, teasing: 5 }
      }
    ]
  },
  {
    id: 9,
    questionNumber: 9,
    duckQuestion: "If an empty cup or snack wrapper is sitting on the table, who waits for the other to clean it up?",
    duckPromptMood: "laughing",
    choices: [
      {
        id: "9a",
        text: "Panda! I classify it as a permanent modern art installation to test your patience 🗿🎨",
        pandaExpression: "embarrassed",
        duckReaction: "'The Melancholy of the Empty Boba Cup' by Panda, 2026! Louvre museum when?! 🎨🤣",
        duckExpression: "laughing",
        scores: { cute: 8, chaos: 9, softness: 6, teasing: 9 }
      },
      {
        id: "9b",
        text: "Vaathu! You glare at the trash expecting it to spontaneously combust into ashes 🪄🔥",
        pandaExpression: "laughing",
        duckReaction: "My laser eyes will work one day! Mind over matter, Panda! You'll see! 🧙‍♂️⚡",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 8, softness: 7, teasing: 9 }
      },
      {
        id: "9c",
        text: "It becomes a game of psychological warfare where whoever touches it first is a loser ♟️👀",
        pandaExpression: "excited",
        duckReaction: "We will literally set our coffee mugs on top of the wrapper rather than throw it out! 💀",
        duckExpression: "angry-but-cute",
        scores: { cute: 8, chaos: 10, softness: 5, teasing: 8 }
      },
      {
        id: "9d",
        text: "We both look at each other and say 'Must be that messy house ghost again' 👻🥤",
        pandaExpression: "shy",
        duckReaction: "That ghost has terrible manners and an addiction to potato chips! We are innocent! 🥔👻",
        duckExpression: "happy",
        scores: { cute: 10, chaos: 7, softness: 9, teasing: 6 }
      }
    ]
  },
  {
    id: 10,
    questionNumber: 10,
    duckQuestion: "Okay Panda… final question! Who is secretly more obsessed with the other? 👀❤️",
    duckPromptMood: "blushing",
    choices: [
      {
        id: "10a",
        text: "Panda! I act all nonchalant, but I literally look at you like you invented sliced bread 🍞🐼",
        pandaExpression: "blushing",
        duckReaction: "MY HEART JUST EXPLODED INTO 500 BILLION SPARKLES! Stop being so cute I can't breathe!! 😭💖💖",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 2, softness: 10, teasing: 2 }
      },
      {
        id: "10b",
        text: "Vaathu! Your phone storage is 98% unflattering double-chin photos of me sleeping 📸😴",
        pandaExpression: "laughing",
        duckReaction: "THEY ARE VALUABLE HISTORICAL TREASURES! And your double chin is precious art okay?! 😳🦆",
        duckExpression: "embarrassed",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 9 }
      },
      {
        id: "10c",
        text: "It's an incurable tie. Two hopeless clowns completely head over heels in love 🤡💍",
        pandaExpression: "excited",
        duckReaction: "Two certified clowns destined to be weird and obsessed with each other forever! Case closed! 💍✨",
        duckExpression: "excited",
        scores: { cute: 10, chaos: 6, softness: 10, teasing: 5 }
      },
      {
        id: "10d",
        text: "My lawyer (a giant bamboo stalk) has advised me not to answer this trap question 🎋🤐",
        pandaExpression: "shy",
        duckReaction: "Your blushing panda ears just confessed under oath! Guilty of loving Vaathu! Case dismissed! ⚖️💕",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 9 }
      }
    ]
  }
];

export function calculateQuizResults(answers: AnswerChoice[]): { scores: QuizScores; profile: CoupleProfile } {
  let totalCute = 0;
  let totalChaos = 0;
  let totalSoft = 0;
  let totalTease = 0;

  answers.forEach((ans) => {
    totalCute += ans.scores.cute;
    totalChaos += ans.scores.chaos;
    totalSoft += ans.scores.softness;
    totalTease += ans.scores.teasing;
  });

  const count = answers.length || 1;
  // Scaled percentages nicely between 82% and 99%
  const cuteScore = Math.min(99, Math.max(84, Math.round((totalCute / (count * 10)) * 18 + 81)));
  const loveLevel = Math.min(99, Math.max(86, Math.round(((totalCute + totalSoft) / (count * 20)) * 16 + 83)));
  const chaosLevel = Math.min(98, Math.max(65, Math.round((totalChaos / (count * 10)) * 32 + 66)));
  const softnessLevel = Math.min(99, Math.max(75, Math.round((totalSoft / (count * 10)) * 24 + 75)));
  const teasingLevel = Math.min(98, Math.max(60, Math.round((totalTease / (count * 10)) * 34 + 64)));

  const scores: QuizScores = {
    cuteScore,
    loveLevel,
    chaosLevel,
    softnessLevel,
    teasingLevel
  };

  // Determine couple profile based on dominant trait
  let profile: CoupleProfile;

  if (chaosLevel > 88) {
    profile = {
      title: "Certified Cute Chaos",
      badge: "🌪️ Explosively Adorable",
      colorScheme: "from-fuchsia-500 to-purple-600",
      tagline: "Two chaotic masterminds sharing one warm brain cell.",
      summary: `You two are ${cuteScore}% cute, ${chaosLevel}% chaotic, and 100% impossible to separate! Your dynamic is 50% gentle hugs and 50% arguing over who ate the last slice of pizza.`,
      duckMessage: "Panda, you make life unhinged in the most wonderful way possible. I wouldn't trade our goofy midnight adventures and snack wars for anything in the world! ❤️"
    };
  } else if (softnessLevel > 91) {
    profile = {
      title: "Professionally Adorable",
      badge: "🧸 Maximum Cozy Soulmates",
      colorScheme: "from-pink-400 to-purple-500",
      tagline: "Sweet enough to give the entire universe cavities.",
      summary: `You two are ${cuteScore}% cute, ${softnessLevel}% pure softness, and completely devoted to each other. Your love language is warm blankets, snacks, and secret forehead kisses.`,
      duckMessage: "Panda, thank you for being my comfiest safe haven. Whenever the world gets noisy, your cuddles make everything quiet and warm again. 🥺💖"
    };
  } else if (teasingLevel > 84) {
    profile = {
      title: "Partners In Crime & Teasing",
      badge: "👀 Mischievous Best Friends",
      colorScheme: "from-violet-500 to-indigo-600",
      tagline: "Bullying each other lovingly with 24/7 affection.",
      summary: `You two are ${cuteScore}% cute, ${teasingLevel}% sarcastic teasing, and deeply obsessed with each other! You roast each other all day, but you're secretly the first one to reach out for a hug.`,
      duckMessage: "Panda, you're the only person I want to lovingly roast for the next 100 years. Even when you steal my snacks, I'm secretly smiling! 🐣💕"
    };
  } else {
    profile = {
      title: "Two Idiots, One Love Story",
      badge: "👑 The Ultimate Couple",
      colorScheme: "from-purple-500 to-pink-500",
      tagline: "A perfectly balanced blend of romance, laughs, and pure cuteness.",
      summary: `You two are ${cuteScore}% cute, ${loveLevel}% madly in love, and completely tuned to the same wavelength. You balance each other out like milk and cookies!`,
      duckMessage: "Panda, every single day with you is my new favorite day. Thank you for answering my silly questions—you're stuck with this vaathu forever! 🦆❤️🐼"
    };
  }

  return { scores, profile };
}
