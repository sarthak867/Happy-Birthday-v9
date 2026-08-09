// =================================================================
// 💖 DIGITAL CARD CONFIGURATION - PERSONALIZED FOR MUSKAN 💖
// GirlFriend: Muskan | DOB: 11-August-2006
// =================================================================

const CARD_CONFIG = {
  // 1. General Info
  recipientName: "Muskan", // Her name
  senderName: "Your Love", // Your name
  titleText: "Happy Birthday Muskan ❤️",
  specialDate: "2006-08-11", // DOB: 11 August 2006

  // 2. Audio Settings
  music: {
    enabled: true,
    autoplayOnEnvelopeClick: true,
    songTitle: "Full Senyum Sayang 🎵",
    src: "./assets/fullsenyum.mp3"
  },

  // 3. Opening Envelope Message
  envelope: {
    senderTag: "For My Darling Muskan ✨",
    subtitle: "Open this with a smile — every word is written just for you, Muskan. 💌",
    sticker: "./assets/pandacoklat.gif"
  },

  // 4. Swipeable Wish Cards Stack
  wishCards: [
    {
      sticker: "./assets/hearthappy.gif",
      heading: "Happy Birthday, My Muskan 🎂✨",
      text: "Happy birthday to the girl who fills my life with sunshine. May your day be as beautiful, warm, and joyful as your smile. I love you endlessly."
    },
    {
      sticker: "./assets/bunga2.gif",
      heading: "You Are My Everything 🥰",
      text: "Thank you for being the kind, loving, and fearless soul that you are. Being with you turns ordinary moments into precious memories."
    },
    {
      sticker: "./assets/terlope2.gif",
      heading: "Always By Your Side 💫",
      text: "Through every high and low, I promise to stand beside you, hold your hand, and be your safe place. Your dreams are mine too."
    },
    {
      sticker: "./assets/gemoy.gif",
      heading: "Keep Shining, Baby 🌟",
      text: "Your smile lights up my world. May this year bring you new adventures, sweet surprises, and all the happiness you deserve."
    },
    {
      sticker: "./assets/pandamuter.gif",
      heading: "Sweet Wishes & Big Hugs 🤗",
      text: "Wishing you love, laughter, success, and magical moments. Here's to many more birthdays together — today and always."
    },
    {
      sticker: "./assets/ciumin.gif",
      heading: "Dream Big, Muskan 💖",
      text: "I believe in you and your beautiful heart. Chase every dream — I’ll be cheering for you every step of the way."
    },
    {
      sticker: "./assets/muah.gif",
      heading: "My Forever Favorite ✨",
      text: "No words can capture how much you mean to me. You are my favorite today, tomorrow, and always. Happy birthday, my love."
    },
    {
      sticker: "./assets/emawh.gif",
      heading: "Endless Love 💕",
      text: "Once again, happiest birthday to you, Muskan. May our days be filled with laughter, love, and countless little joys. I love you more than words."
    }
  ],

  // 5. Polaroid Memory Cards Gallery (Mapped to Muskan's 6 Photos)
  polaroids: [
    {
      image: "./assets/image 1.jpeg",
      caption: "Muskan's Beautiful Smile 💕",
      date: "11 August 2006"
    },
    {
      image: "./assets/image 2.jpeg",
      caption: "Precious Moments ✨",
      date: "Forever & Always"
    },
    {
      image: "./assets/image 3.jpeg",
      caption: "Pure Happiness 🌸",
      date: "Special Birthday"
    },
    {
      image: "./assets/image 4.jpeg",
      caption: "My Favorite Person 🐼❤️",
      date: "Sweet Memories"
    },
    {
      image: "./assets/image 5.jpeg",
      caption: "Unforgettable Days 💫",
      date: "Always & Forever"
    },
    {
      image: "./assets/image 6.jpeg",
      caption: "Love You Always Muskan 🫰💖",
      date: "Happy Birthday"
    }
  ],

  // 6. "Reasons Why I Love You" Highlights
  reasons: [
    { icon: "✨", title: "Muskan's Kindness", desc: "The way you care for everyone around you makes my heart melt." },
    { icon: "🌟", title: "Your Cute Smile", desc: "Your laugh can instantly turn my darkest days into sunshine." },
    { icon: "🧸", title: "Your Warm Hugs", desc: "Being with you feels like home, safe and comforting." },
    { icon: "💫", title: "Our Future Dreams", desc: "Growing together with you Muskan and making unforgettable memories every day." }
  ],

  // 7. Secret Scratch Coupon / Surprise Box
  coupon: {
    heading: "Muskan's Secret Love Coupon 🎁",
    subheading: "Scratch with your finger to reveal a little surprise just for you!",
    hiddenMessage: "🎉 REWARD: Unlimited Hugs & Kisses 💌💖",
    scratchColor: "#ff758c"
  },

  // 8. Color Theme Customization
  theme: {
    primaryColor: "#ff4b72",
    secondaryColor: "#ff85a2",
    accentColor: "#ffd1dc"
  }
};
