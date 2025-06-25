const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZTQ0lCM0JIZm5EOWFyc3B3eERIZEN0T2YrNVNCeUg2SUJCWW9vcjVuVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRkxaRmV5U3FKZm44TVk3OXNLRzBWdkRZTitlU0ZpT2Fuc0hrYVQva3VnST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTDcxVUNZUktTSnQrbXRZY01IazJncTN0M0ZYQ2NEK3kxM1pBSWVyTUVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTjNtbkp1TjU3K21sMHVwWmtSRFlVdThqOW5mMUp0S0ZrN3ArdWtZK2hVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlCS2VvZGZFYlJqQzRra2o4UzdkeDNpaHJhRU9uT2NGOVV2R3A0Zm1YR1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBXV1cxNG1XVGc4c2gzSmdubGhDUXE1TDJwNzBTMkVkZ1M3N01lM3dCU2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0FRclpYZldhaWo0cWluellreTh2cjZrRng3UDNpVjdzZUsyc2pVd2RYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZnk3L0tpTVpYMHdRWjVQUDlyY1NRZy9OajlKbTVRQ0RrYlRlVVoybEEwcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjE3S3VYV3FmNUtVU3JoTVBKTlc1L0JSUWtGY09Xb3RXY2tiUWlsL21tQllPSmJFaXVPcHJjTzJpL25jc2toREMxUUplaEx3eGdTRk90c3ZsZTRHNENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI2LCJhZHZTZWNyZXRLZXkiOiJYQU53QUFMLzkzRlN5TXBYWVo5L3B1ZXRONFFhYUZxeEI1aW1OcDZTSWZvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNKV2R5NEVERUxYRjdzSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJHNjhjQkttNGJ5bndJS1FScld1d2VrZkN5M0cwd2U2aEFRZTBHVTFxZ1dZPSIsImFjY291bnRTaWduYXR1cmUiOiJMaFdyQ2k0NURNSlVlQzFQTlRVY20zcS9DWlk3TG1MWGRsbXVmSEoxV3FQWHFMTW1DR0pJUE9EVjVSa2RMWVJCeitBbllpUGh5b3FOQkUxSStvZXFqUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZnZmM09QWmJzNHVCYjZ4Z0c2TVFKblBVRnlsMDRteXIvOWlIS3F6MGFUWmFMaWc2UVJPcWd3Z21SOXRDUFZzK2U4cGdiLy9VWjRnTWg3Uy9OZGVGQXc9PSJ9LCJtZSI6eyJpZCI6IjIzMzU1MzM5ODEzOTozNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJOYW5hIGt3YWR3byIsImxpZCI6IjUyNTMxOTEyNzk4Mzc4OjM2QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NTMzOTgxMzk6MzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUnV2SEFTcHVHOHA4Q0NrRWExcnNIcEh3c3R4dE1IdW9RRUh0QmxOYW9GbSJ9fV0sInBsYXRmb3JtIjoic21iaSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwODM1OTA3LCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSmhsIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "NANA KWADWO®",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233553398139",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
