import { Question, CoupleProfile, QuizScores, AnswerChoice } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    questionNumber: 1,
    duckQuestion: "Panda, be honest… who is more likely to steal the other person's food while saying 'I just want one bite'?",
    duckPromptMood: "confused",
    choices: [
      {
        id: "1a",
        text: "Obviously me 😌 (and that one bite takes 60% of the burger)",
        pandaExpression: "embarrassed",
        duckReaction: "I knew it! My fries have never been safe for even three seconds! 🍟😭",
        duckExpression: "shocked",
        scores: { cute: 8, chaos: 9, softness: 6, teasing: 8 }
      },
      {
        id: "1b",
        text: "Definitely you! You eye my snacks like a tiny yellow hawk 😂",
        pandaExpression: "laughing",
        duckReaction: "Hey! That is quality control inspection, not stealing! How dare you! 😤🐣",
        duckExpression: "angry-but-cute",
        scores: { cute: 9, chaos: 7, softness: 7, teasing: 10 }
      },
      {
        id: "1c",
        text: "Both of us are guilty... it's an all-out food war ⚔️🍕",
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
    duckQuestion: "If I say 'I'm fine', what do you think I actually mean? 👀",
    duckPromptMood: "confused",
    choices: [
      {
        id: "2a",
        text: "'I need snacks, a blanket burrito, and silent cuddles ASAP' 🌯",
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
        text: "'I'm secretly overthinking something from 3 weeks ago' 🧠💭",
        pandaExpression: "shy",
        duckReaction: "Oof, why did you have to read my soul so accurately?! 😭🙈",
        duckExpression: "embarrassed",
        scores: { cute: 9, chaos: 6, softness: 9, teasing: 7 }
      },
      {
        id: "2d",
        text: "You are actually fine! ...Wait, is this a trap?! 🚨",
        pandaExpression: "confused",
        duckReaction: "Panda, darling... sweet summer child... IT IS ALWAYS A TRAP! 🤣🦆",
        duckExpression: "laughing",
        scores: { cute: 7, chaos: 8, softness: 5, teasing: 10 }
      }
    ]
  },
  {
    id: 3,
    questionNumber: 3,
    duckQuestion: "Who would survive longer without texting the other first?",
    duckPromptMood: "happy",
    choices: [
      {
        id: "3a",
        text: "Neither. One of us sends a dumb meme within 12 minutes 📱",
        pandaExpression: "laughing",
        duckReaction: "Facts. We have zero chill and zero emotional endurance! 😂",
        duckExpression: "laughing",
        scores: { cute: 10, chaos: 8, softness: 9, teasing: 5 }
      },
      {
        id: "3b",
        text: "Panda! I have the stoic mental discipline of a sleeping rock 🪨",
        pandaExpression: "excited",
        duckReaction: "Lies! You double-text me every time you see a cute dog video! 🤨🐶",
        duckExpression: "confused",
        scores: { cute: 7, chaos: 6, softness: 6, teasing: 9 }
      },
      {
        id: "3c",
        text: "Vaathu! You pretend to be busy but you're refreshing the chat 💬",
        pandaExpression: "embarrassed",
        duckReaction: "Excuse me! I'm a very busy vaathu with pond business! (Okay fine, I was staring at the typing dots) 🦆",
        duckExpression: "blushing",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 8 }
      },
      {
        id: "3d",
        text: "I refuse to go even 1 hour without checking on my favorite vaathu 🥺",
        pandaExpression: "blushing",
        duckReaction: "MY HEART! Panda, stop being so criminally adorable right now! 💖🥺",
        duckExpression: "excited",
        scores: { cute: 10, chaos: 2, softness: 10, teasing: 2 }
      }
    ]
  },
  {
    id: 4,
    questionNumber: 4,
    duckQuestion: "If we had a silly argument, who would secretly want a hug first?",
    duckPromptMood: "shy",
    choices: [
      {
        id: "4a",
        text: "Panda! I'd be pouting in the corner secretly wanting to be squished 🥺",
        pandaExpression: "shy",
        duckReaction: "I see right through your grumpy panda cheeks! Prepare to be hugged immediately! 🫂",
        duckExpression: "happy",
        scores: { cute: 10, chaos: 4, softness: 10, teasing: 4 }
      },
      {
        id: "4b",
        text: "Vaathu! You quack loudly for 2 minutes then want cuddles 🐥",
        pandaExpression: "laughing",
        duckReaction: "Listen here, my feathers get ruffled easily but my heart is pure marshmallow! 😤💕",
        duckExpression: "blushing",
        scores: { cute: 9, chaos: 6, softness: 9, teasing: 7 }
      },
      {
        id: "4c",
        text: "We both do, but we pretend to be mad for another 30 seconds 🙄",
        pandaExpression: "embarrassed",
        duckReaction: "The dramatic couple standoff! Staring angrily while inching closer and closer! 🤣",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 8 }
      },
      {
        id: "4d",
        text: "Whoever gets bribed with bubble tea first 🧋",
        pandaExpression: "happy",
        duckReaction: "Boba solves 99.9% of all international couple disputes! 🍵✨",
        duckExpression: "excited",
        scores: { cute: 8, chaos: 8, softness: 7, teasing: 6 }
      }
    ]
  },
  {
    id: 5,
    questionNumber: 5,
    duckQuestion: "What would make Panda instantly happy in 5 seconds flat?",
    duckPromptMood: "excited",
    choices: [
      {
        id: "5a",
        text: "Delicious hot food appearing without me having to decide what to eat 🍜",
        pandaExpression: "excited",
        duckReaction: "Solving the daily 'What do you want to eat?' existential dread! A true superpower! 🍲",
        duckExpression: "happy",
        scores: { cute: 8, chaos: 7, softness: 8, teasing: 6 }
      },
      {
        id: "5b",
        text: "A surprise forehead kiss and hearing 'I'm proud of you' 🌸",
        pandaExpression: "blushing",
        duckReaction: "*Gasps* *Gives Panda forehead kiss right this second* 🥺💖",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 1, softness: 10, teasing: 2 }
      },
      {
        id: "5c",
        text: "Taking a 4-hour nap under three heavy blankets together 💤",
        pandaExpression: "happy",
        duckReaction: "Professional hibernate mode activated! Save room for Vaathu under the duvet! 🛌🦆",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 3, softness: 10, teasing: 4 }
      },
      {
        id: "5d",
        text: "Vaathu doing a funny little waddle dance to cheer me up 💃",
        pandaExpression: "laughing",
        duckReaction: "You know I will embarrass myself anywhere just to see your silly panda smile! 🕺✨",
        duckExpression: "excited",
        scores: { cute: 10, chaos: 9, softness: 8, teasing: 7 }
      }
    ]
  },
  {
    id: 6,
    questionNumber: 6,
    duckQuestion: "Who is more likely to say 'just one more episode' and watch five more?",
    duckPromptMood: "laughing",
    choices: [
      {
        id: "6a",
        text: "Definitely Panda... and then I fall asleep with my mouth open at 2:45 AM 😴",
        pandaExpression: "embarrassed",
        duckReaction: "And your snoring sounds like a baby motorboat! Adorable, but loud! 🚤😂",
        duckExpression: "laughing",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 8 }
      },
      {
        id: "6b",
        text: "Vaathu! You hit 'Next Episode' faster than lighting while gasping at plot twists ⚡",
        pandaExpression: "shocked",
        duckReaction: "THEY LEFT US ON A CLIFFHANGER, PANDA! I couldn't just abandon our characters! 📺🤯",
        duckExpression: "shocked",
        scores: { cute: 8, chaos: 9, softness: 6, teasing: 9 }
      },
      {
        id: "6c",
        text: "We enabling each other is a dangerous toxic loop of no sleep 🌙",
        pandaExpression: "excited",
        duckReaction: "'Should we sleep?' 'Nah, one more.' Next thing we know birds are chirping outside! 💀",
        duckExpression: "confused",
        scores: { cute: 9, chaos: 10, softness: 6, teasing: 7 }
      },
      {
        id: "6d",
        text: "Neither, we always cuddle and drift off into dreamland peacefully ☁️",
        pandaExpression: "shy",
        duckReaction: "Who are we lying to? But okay, that sounds dreamy and aesthetic! 🥰✨",
        duckExpression: "happy",
        scores: { cute: 9, chaos: 2, softness: 10, teasing: 5 }
      }
    ]
  },
  {
    id: 7,
    questionNumber: 7,
    duckQuestion: "If Panda and Vaathu went on a random midnight adventure, who would plan it and who would just follow for the snacks?",
    duckPromptMood: "excited",
    choices: [
      {
        id: "7a",
        text: "Vaathu has the master plan; Panda is strictly here for the 7-Eleven snacks 🏪",
        pandaExpression: "happy",
        duckReaction: "I provide navigation and vibes, you carry the iced tea and mochi! The perfect duo! 🎒🧋",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 7, softness: 8, teasing: 6 }
      },
      {
        id: "7b",
        text: "Neither plans! We get lost in 10 minutes and end up stargazing on the car hood 🌌",
        pandaExpression: "blushing",
        duckReaction: "Honestly? Getting lost with Panda is my favorite destination anyway. 🥹✨",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 8, softness: 10, teasing: 4 }
      },
      {
        id: "7c",
        text: "Panda is the designated driver; Vaathu is screaming song lyrics out the window 🎶",
        pandaExpression: "laughing",
        duckReaction: "Quacking off-key to pop songs at 1 AM is essential road trip therapy! 🎤🦆",
        duckExpression: "excited",
        scores: { cute: 9, chaos: 9, softness: 7, teasing: 8 }
      },
      {
        id: "7d",
        text: "We talked about going out for an hour then decided to stay in our pajamas 🛌",
        pandaExpression: "embarrassed",
        duckReaction: "Peak relationship milestone: pajama date nights beat outside world 10/10! 🛋️❤️",
        duckExpression: "happy",
        scores: { cute: 9, chaos: 5, softness: 9, teasing: 5 }
      }
    ]
  },
  {
    id: 8,
    questionNumber: 8,
    duckQuestion: "Okay Panda… final question. Who is secretly more obsessed with the other? 👀❤️",
    duckPromptMood: "blushing",
    choices: [
      {
        id: "8a",
        text: "Me! I look at you and wonder how I got so incredibly lucky 🐼💖",
        pandaExpression: "blushing",
        duckReaction: "MY HEART JUST MELTED INTO A PUDDLE! Panda you can't say that to me!! 😭❤️❤️❤️",
        duckExpression: "blushing",
        scores: { cute: 10, chaos: 2, softness: 10, teasing: 2 }
      },
      {
        id: "8b",
        text: "Vaathu! Your camera roll is 90% unhinged candid pictures of me sleeping 📸",
        pandaExpression: "laughing",
        duckReaction: "THEY ARE VALUABLE HISTORICAL ARCHIVES! ...and maybe you look really cute okay?! 😳🦆",
        duckExpression: "embarrassed",
        scores: { cute: 9, chaos: 8, softness: 8, teasing: 9 }
      },
      {
        id: "8c",
        text: "It's a tie. We are both hopelessly, helplessly down bad for each other 🥰",
        pandaExpression: "excited",
        duckReaction: "Two goofy souls completely obsessed with each other forever! Case closed! 💍✨",
        duckExpression: "excited",
        scores: { cute: 10, chaos: 6, softness: 10, teasing: 5 }
      },
      {
        id: "8d",
        text: "I plead the fifth! My lawyer (a stuffed bamboo plush) advised me not to answer 🎋",
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
      duckMessage: "Panda, you make life unhinged in the most wonderful way possible. I wouldn't trade our goofy midnight adventures and food thievery for anything in the world! ❤️"
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
