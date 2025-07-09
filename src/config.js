import dotenv from "dotenv";
dotenv.config();

const config = {

  mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://Kriss:Boluwatife99@cluster0.gnwpzxk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  mongoOptions: {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },

  botName: process.env.BOT_NAME || "ZERO TWO",
  ownerNumber: process.env.OWNER_NUMBERS ? process.env.OWNER_NUMBERS.split(",") : ['201030693604'],
  ownerName: process.env.OWNER_NAME || "light",
  prefix: process.env.PREFIX || ".",

  sessionId: process.env.SESSION_ID || "light@q152",
  auth: "qr",
  PORT: process.env.PORT || 3000,

  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY || "8bc2f9d5ae85d87a5daa6cbdfb60092f",
  apiBaseUrl: process.env.API_BASE_URL || "https://aeonsan.xyz/api",

  ownerGithubUrl: "https://github.com/-",
  githubUrl: "https://github.com/--",

  defaultCooldown: 2000,
  allowSelfCommand: true,
  cooldownBypassForOwner: true,

};

export default config;
