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
        text: "Obviously Panda 😌 (I call it a tax, not stealing)",
        pandaExpression: "embarrassed",
        duckReaction: "I knew it! My fries have never been safe for even three seconds! 🍟😭",
        duckExpression: "shocked",
        scores: { cute: 8, chaos: 9, softness: 6, teasing: 8 }
      },
      {
        id: "1b",
        text: "Definitely Vaathu! You eye my snacks like a tiny yellow hawk 😂",
        pandaExpression: "laughing",
        duckReaction: "Hey! That is quality control inspection, not stealing! How dare you! 😤🐣",
        duckExpression: "angry-but-cute",
        scores: { cute: 9, chaos: 7, softness: 7, teasing: 10 }
      },
      {
        id: "1c",
        text: "Both of us... snack wars are an everyday event here ⚔️🍕",
        pandaExpression: "excited",
        duckReaction: "True... neither of us can be trusted around garlic bread. It's mutual chaos! 🤤",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 10, softness: 5, teasing: 7 }
      },
      {
        id: "1d",
        text: "I always share willingly because I love you ❤️ (mostly)",
        pandaExpression: "shy",
        duckReaction: "Awww wait, stop being sweet, I'm trying to interrogate you here! 🥹✨",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 2, softness: 10, teasing: 3 }
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
        text: "'Bring snacks, a blanket burrito, and give quiet cuddles ASAP' 🌯",
        pandaExpression: "happy",
        duckReaction: "1000% correct! You truly understand the sacred Vaathu language! 🏆❤️",
        duckExpression: "excited",
        scores: { cute: 10, chaos: 4, softness: 10, teasing: 4 }
      },
      {
        id: "2b",
        text: "'You have exactly 30 seconds to figure out what you did wrong' 💣",
        pandaExpression: "shocked",
        duckReaction: "The clock is ticking, Panda. Tick... tock... tick... tock... 👀⏱️",
        duckExpression: "angry-but-cute",
        scores: { cute: 8, chaos: 10, softness: 4, teasing: 9 }
      },
      {
        id: "2c",
        text: "'Vaathu is secretly overthinking something from 3 weeks ago' 🧠💭",
        pandaExpression: "shy",
        duckReaction: "Oof, why did you have to read my soul so accurately?! 😭🙈",
        duckExpression: "embarrassed",
        scores: { cute: 9, chaos: 6, softness: 9, teasing: 7 }
      },
      {
        id: "2d",
        text: "You are actually fine! ...Wait, is this a trap?! 🚨",
        pandaExpression: "confused",
        duckReaction: "Panda, sweet summer child... IT IS ALWAYS A TRAP! 🤣🦆",
        duckExpression: "laughing",
        scores: { cute: 7, chaos: 8, softness: 5, teasing: 10 }
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
        text: "Panda! Then I sleep like a log while you complain I'm snoring 😴",
        pandaExpression: "embarrassed",
        duckReaction: "Your snoring sounds like a baby motorboat! Adorable, but loud! 🚤😂",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 8 }
      },
      {
        id: "3b",
        text: "Vaathu! You laugh out loud at memes when I'm trying to sleep 📱🦆",
        pandaExpression: "shocked",
        duckReaction: "THE MEMES WERE TOP TIER, PANDA! I couldn't just keep them to myself! 📺🤯",
        duckExpression: "shocked",
        scores: { cute: 8, chaos: 9, softness: 6, teasing: 9 }
      },
      {
        id: "3c",
        text: "We take turns enabling each other's terrible sleep schedule 💀",
        pandaExpression: "excited",
        duckReaction: "'Should we sleep?' 'Nah, one more.' Next thing we know birds are chirping outside! 🌙",
        duckExpression: "confused",
        scores: { cute: 9, chaos: 10, softness: 6, teasing: 7 }
      },
      {
        id: "3d",
        text: "Neither, we are innocent angels who sleep peacefully at 10 PM 😇",
        pandaExpression: "shy",
        duckReaction: "Who are we lying to? But okay, that sounds dreamy and aesthetic! 🥰✨",
        duckExpression: "happy",
        scores: { cute: 9, chaos: 2, softness: 10, teasing: 5 }
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
        text: "Neither. One of us sends an unhinged meme within 12 minutes 📱",
        pandaExpression: "laughing",
        duckReaction: "Facts. We have zero chill and zero emotional endurance! 😂",
        duckExpression: "laughing",
        scores: { cute: 10, chaos: 8, softness: 9, teasing: 5 }
      },
      {
        id: "4b",
        text: "Panda! I have the stoic mental discipline of a sleeping rock 🪨",
        pandaExpression: "excited",
        duckReaction: "Lies! You double-text me every time you see a cute panda video! 🤨🐼",
        duckExpression: "confused",
        scores: { cute: 7, chaos: 6, softness: 6, teasing: 9 }
      },
      {
        id: "4c",
        text: "Vaathu pretends to be busy, but is secretly staring at the chat 💬",
        pandaExpression: "embarrassed",
        duckReaction: "Excuse me! I'm a very busy vaathu! (Okay fine, I was watching the typing dots) 🦆",
        duckExpression: "blushing",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 8 }
      },
      {
        id: "4d",
        text: "I refuse to go even 1 hour without checking on my favorite vaathu 🥺",
        pandaExpression: "blushing",
        duckReaction: "MY HEART! Panda, stop being so criminally adorable right now! 💖🥺",
        duckExpression: "excited",
        scores: { cute: 10, chaos: 2, softness: 10, teasing: 2 }
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
        text: "Panda! I'm pouting in the corner secretly wanting to be squished 🥺",
        pandaExpression: "shy",
        duckReaction: "I see right through your grumpy panda cheeks! Prepare to be hugged immediately! 🫂",
        duckExpression: "happy",
        scores: { cute: 10, chaos: 4, softness: 10, teasing: 4 }
      },
      {
        id: "5b",
        text: "Vaathu! You make angry duck noises for 2 minutes then want cuddles 🐣",
        pandaExpression: "laughing",
        duckReaction: "Listen here, my feathers get ruffled easily but my heart is pure marshmallow! 😤💕",
        duckExpression: "blushing",
        scores: { cute: 9, chaos: 6, softness: 9, teasing: 7 }
      },
      {
        id: "5c",
        text: "Both of us, but we stubbornly glare for another 30 seconds 🙄",
        pandaExpression: "embarrassed",
        duckReaction: "The dramatic couple standoff! Staring angrily while inching closer and closer! 🤣",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 8 }
      },
      {
        id: "5d",
        text: "Whoever gets bribed with bubble tea or hot food first 🧋",
        pandaExpression: "happy",
        duckReaction: "Snacks solve 99.9% of all international couple disputes! 🍵✨",
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
        text: "We spend 45 minutes saying 'I don't know, you choose' 🤦‍♂️",
        pandaExpression: "embarrassed",
        duckReaction: "The daily existential crisis! It's like neither of us has ever eaten food before! 🍜😂",
        duckExpression: "laughing",
        scores: { cute: 8, chaos: 9, softness: 7, teasing: 8 }
      },
      {
        id: "6b",
        text: "Panda rejects the first 6 options until we order fries anyway 🍟",
        pandaExpression: "laughing",
        duckReaction: "Every single time! 'No, not pizza. No, not noodles.' *orders 30 fries* 🍟💀",
        duckExpression: "angry-but-cute",
        scores: { cute: 9, chaos: 8, softness: 6, teasing: 9 }
      },
      {
        id: "6c",
        text: "Vaathu already decided 3 hours ago and was just testing me 👀",
        pandaExpression: "shocked",
        duckReaction: "Hey! A vaathu has to test your psychic telepathy connection! 🧠🔮",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 9 }
      },
      {
        id: "6d",
        text: "We end up eating noodles or cereal in our pajamas like cozy gremlins 🥣",
        pandaExpression: "happy",
        duckReaction: "And honestly? Those pajama dinners are our top tier dates! 🛋️❤️",
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
        text: "Panda! I require 100% of your undivided attention at all times 🐼✨",
        pandaExpression: "shy",
        duckReaction: "A needy baby panda is literally the cutest thing in the universe! 🥺💖",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 5, softness: 10, teasing: 4 }
      },
      {
        id: "7b",
        text: "Vaathu! Your feathers get ruffled if I don't reply within 4 seconds 🪶",
        pandaExpression: "laughing",
        duckReaction: "4 seconds is a lifetime, Panda! What if there was an emergency cute dog photo?! 🐶😤",
        duckExpression: "angry-but-cute",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 9 }
      },
      {
        id: "7c",
        text: "Both of us are dramatic attention gremlins 🤡",
        pandaExpression: "excited",
        duckReaction: "We will literally poke each other on the shoulder until someone laughs! 🤣👉",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 9, softness: 7, teasing: 7 }
      },
      {
        id: "7d",
        text: "We pretend to be mature and unbothered (it lasts 45 seconds) 🕶️",
        pandaExpression: "embarrassed",
        duckReaction: "World record for fake emotional maturity: 45 seconds flat! ⏱️😂",
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
        text: "Panda drives responsibly; Vaathu screams song lyrics at the moon 🎶",
        pandaExpression: "laughing",
        duckReaction: "Quacking off-key to pop songs at 1 AM is mandatory road trip therapy! 🎤🦆",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 9, softness: 7, teasing: 8 }
      },
      {
        id: "8b",
        text: "Vaathu plans the whole route; Panda is strictly here for the 7-Eleven snacks 🏪",
        pandaExpression: "happy",
        duckReaction: "I provide navigation and vibes, you carry the iced tea and mochi! The perfect duo! 🎒🧋",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 6 }
      },
      {
        id: "8c",
        text: "We talk about going for an hour then stay wrapped in our blankets 🛋️",
        pandaExpression: "embarrassed",
        duckReaction: "Peak couple milestone: pajama date night beats the outside world 10/10! 🛌❤️",
        duckExpression: "happy",
        scores: { cute: 10, chaos: 4, softness: 10, teasing: 4 }
      },
      {
        id: "8d",
        text: "We get lost in 10 minutes and end up eating ice cream in the car 🍦",
        pandaExpression: "blushing",
        duckReaction: "Honestly? Getting lost with Panda is my favorite destination anyway. 🥹✨",
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
        text: "Panda! I treat it as modern interior art until you notice 🎨",
        pandaExpression: "embarrassed",
        duckReaction: "Modern art?! It's a crushed juice box, Panda! A crushed juice box! 🧃🤣",
        duckExpression: "laughing",
        scores: { cute: 8, chaos: 9, softness: 6, teasing: 9 }
      },
      {
        id: "9b",
        text: "Vaathu! You stare at it hoping it magically evaporates into thin air 🪄",
        pandaExpression: "laughing",
        duckReaction: "Hey! One day magic will work, and on that day I will be vindicated! 🧙‍♂️✨",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 8, softness: 7, teasing: 9 }
      },
      {
        id: "9c",
        text: "It turns into an intense standoff of 'whoever touches it loses' ⚔️",
        pandaExpression: "excited",
        duckReaction: "We will literally walk around a wrapper for 4 days just on principle! 💀",
        duckExpression: "angry-but-cute",
        scores: { cute: 8, chaos: 10, softness: 5, teasing: 8 }
      },
      {
        id: "9d",
        text: "We both ignore it and playfully blame the imaginary house ghost 👻",
        pandaExpression: "shy",
        duckReaction: "The house ghost is very messy and loves potato chips! Not our fault! 🥔👻",
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
        text: "Me! I act cool, but I literally look at you like you're magic 🐼💖",
        pandaExpression: "blushing",
        duckReaction: "MY HEART JUST MELTED INTO A PUDDLE! Panda you can't say that to me!! 😭❤️❤️❤️",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 2, softness: 10, teasing: 2 }
      },
      {
        id: "10b",
        text: "Vaathu! Your camera roll is 95% goofy sleeping candid photos of me 📸",
        pandaExpression: "laughing",
        duckReaction: "THEY ARE VALUABLE HISTORICAL ARCHIVES! ...and maybe you look really cute okay?! 😳🦆",
        duckExpression: "embarrassed",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 9 }
      },
      {
        id: "10c",
        text: "It's an absolute tie. Two goofy idiots hopelessly down bad for each other 🥰",
        pandaExpression: "excited",
        duckReaction: "Two goofy souls completely obsessed with each other forever! Case closed! 💍✨",
        duckExpression: "excited",
        scores: { cute: 10, chaos: 6, softness: 10, teasing: 5 }
      },
      {
        id: "10d",
        text: "I plead the fifth! My lawyer (a bamboo stick) told me to stay quiet 🎋",
        pandaExpression: "shy",
        duckReaction: "Your blushing panda ears say everything you're trying to hide! Gotcha! 🤭💕",
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
