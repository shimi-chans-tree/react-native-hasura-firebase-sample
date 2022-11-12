import "dotenv/config";

module.exports = {
  name: "MyApp",
  version: "1.0.0",
  extra: {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    endPoint: process.env.HASURA_ENDPOINT,
  },
  packagerOpts: {
    sourceExts: ["cjs"],
  },
};
