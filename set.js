const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0U5V2lUSnpHL2RVRzkxNWRTeGxtdWEzTGcwVUo0eG1QbUhvcnJuWmkxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmhSNnNsc3gvZXJEanRYK2c3eWorazI2T2JHZ1F5cit1T3E4REc5c3Z5OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQkUrNXFiNDNXY1lNbkdLOTZLdzNxdDFBUkVTWkNhNm1LNFdBUy8rUFdZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxOXIyUS9YczJaMHVqUVRFKy9nUW10YU00cGpWVDdyMjArVTNoMHRoQkRRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVDTllhL1FBUWw1RklYeHdaK0laTUNOV0dmaUp2d0VQU0dFRE9qbm9DbGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlvZ1BJQWU1K3Q4NFJzVXJNZzlZODFBNWlyQ0ZKWVMyd2ZRU1E1SkdveUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUV5aVpoMFZCcHBMOVRnZkdTNnd6VzFycGJ6cTNrTzRhWWlsWndkV09tMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXJkUkwvVHdhS0hYQ2kycjBTbXFrUG0wc2ZFZ1A3c1dtZXJCUFN2UU5nND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt3ZTdqWUJUUmk4R3YxK1AzMFBQdDRqb0k5TThoYStoOTJlT0JqTm1LUjFLa0R0MVRRWUhRVjNRZGtQNEFWOFJwRkJQQVkxZzVFV0tONjY5YUV0V2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTUsImFkdlNlY3JldEtleSI6ImpEUFRPaS9ibjdIRzRiajVHQ2dhOWhnUm9FcmFDeGVqTmJySmlsREVmdGs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzEyMjU0MjY3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZFNjE0Q0Y1RTcxRjBGNEE3MEY0OTNCOEQ1MTVEN0JGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIwODIyODN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjEyM0xPVFVTIiwibWUiOnsiaWQiOiIyNTU3MTIyNTQyNjc6NjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTVdMLiBNQUpFTlpJIiwibGlkIjoiMjM1NTc1MDEzNTYwNDc0OjY5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSTZCaU9VR0VLN091c01HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiM0xWMGRQTzg4SkNrN0I2ZUJ6VlowU3dFVjY2MHdWY2I1WWc4K1ZjMkVTUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiN0tjaVh3TGQxOVFIcXoxZUhpNlBvdWFuNitDdWVDcXFUeXVyQnhiSGpjSEhvTnVycGxiN3A0YU9iN1daeUdqR0ZFWXZ4R001OCtEYzRXUnIvcGpiQlE9PSIsImRldmljZVNpZ25hdHVyZSI6Im5ncVNzNXUzM1dsY3VTbEhWYmZQK01mVXVWRHFiOG5kOFk4RHlVQ0JwTHU0N05FMStkU2I4TnFGNEsvRVBkeG9BL3NsdDNrWStGSGNlSTJZV2NLaWpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzEyMjU0MjY3OjY5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmR5MWRIVHp2UENRcE93ZW5nYzFXZEVzQkZldXRNRlhHK1dJUFBsWE5oRWsifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MjA4MjIzNywibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo5NyJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "MAJENZI",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255712254267",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'no',
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
