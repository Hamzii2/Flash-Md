const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0tidi9tbkN0ZmJ6SmIyR3FnNW9OREhYOGJSWVpSNFQ4NFRJWnJjTWcwVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiam9aSVRCT2J2RVZJZHZPTzhwdzlPTjRJeW1VWXBIaDczb3N1eG9FSFNYQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1T1JHZVZ6azU0Nm12Yk9RSkJjSXdtcldqeTB0TVJUbS9FVkNFVnVqdTA0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2a1dqNE5yVXNhbWZwVnVKYjJuMCtLNW45TDJFUW1xSU13bFZ4RTlvc0Q0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhGVS9RMUFIa2J4V0hYM1JnRUdqQTNsalNFZDM5U2JBNS9uUUg2b08wbFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVqcytUSStRMEJPcWRmcFVWM0JGYUpxRThPRmQ2Z0dvTXduUG56UWdDeGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU5WS2FsekVoV1RMMndvVjZHcWc1U0JuU0tTQXV6b2xEUWJob2ZaNEhVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmQ3YjRQUjJHdmFaamc0OXMvbC96cmJnY2JJb0JsVkRuQkt2VzhSV3pGbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBmR1E4dXE4NW95ODVQckN2a3JCVThxSG5CVjlKK3BsN1ZUV2xvWVlqK3RUVUc0R0w0V3BYV1FSUnEvL3VHOTNuV25vUERiamFUVDkxK09jMDJJbWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiJ4aURNNHlPUTB3WnVmbkl3ZGUwaXJ2TEY0QWoxV2tyRENrN21sUkkzdEh3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxd2dsYy02RVJ4eTlBVEhRbHJEcmVBIiwicGhvbmVJZCI6IjM4MzU2NDNlLWUwMTUtNGViNi1iODE3LTc4M2JlMmQxODZkZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQcW8yc2R3WW5oSE9abVEraE5aYUdWamRpU0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYitxVkpqckdLNjRWeFlPYW9neEtNLyt6bk9nPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhQVlhGWEQyIiwibWUiOnsiaWQiOiIyMzQ5MTY3NDQ4NzM5OjE0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMdmJwUUlRL3UrNHVRWVlCQ0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCdFJkZHpRMkt5UngvWHNpRjBySVJ3TG83QlpxMVJyWFVIZGVGM1I4LzF3PSIsImFjY291bnRTaWduYXR1cmUiOiJvbVpTMWZjRHhuK0ZqcXVwVHA1Q0FkYXRkUTdraHp3Y2FETzFHMDZCbXo5YW5uMXhHdEgzVVpWajBqWTFOMU9XVGtGaWpmVFZYaWIvTHVZelRBYjBqQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVVJLTHlwNFdlTzg5SHNKRWE0c2VSejlGVWNUT1A1dFJUSit6Mjg4bm1aNC9qenllWmFOU2l5TnY2clkwM253Ny9vcUZ0ekU0QUZKd0Y4UEtkL3dvZ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTY3NDQ4NzM5OjE0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFiVVhYYzBOaXNrY2YxN0loZEt5RWNDNk93V2F0VWExMUIzWGhkMGZQOWMifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzEwODIyNTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTG9LIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Gift MD",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2349167448739",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
