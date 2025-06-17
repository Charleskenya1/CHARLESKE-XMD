const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0hBazJkVGxsMWZCTXRFV0ZDcnViZ0lHWmdSUDllVjRQQ21YZnBPeFNGRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1hITDVRSVduTWp6aW5aWTdaaW9oSmZ4aXpSeHVlSUNJaFExbmlCUVl6RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0S1ZlcnBlaVNDWHVVTlBQdW41NGZiaG5hd3JzRXRtRHZtd0JTT2FJRFZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyOG1WV3pFNjdtS0JwUlErL0RHNVpZRE00RzNuWTgxK2VFU1pvRWllQkNzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZIS3BZYnhpaXlZSllMd0RjTFR4K2Jady8wK2JiQzZsYmFmSjFKaVNTMzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFVQVJISWFaSnozU3hKRUdBd2FMOHY0dXdFdlZobjRqU1ExUjVUTjdFaHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0dnMEJKNkJJNGRqaWt1eXRKS3lZZTY2aXZtaFZYbXh3TWVETGlpQ1lYMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWs2Q1BwcGFqNjdvVkdwYnNQRHd2bnc4SUJoWVFZbFdvcTNGd25yTnNIMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJhLzlrSVA3bGtnMGYzODNpRlJFdW5IVkF3TGVmenN1TVlGMS8yRWFSMUFPT0F0Nm9vOFlYaHNtNlN1SFY3ZFlVN3Z3cDRXclBtMndBMnJRZ0NtRWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg5LCJhZHZTZWNyZXRLZXkiOiJQZFd4NzVTU3RSQUdWRk1STjgrME1FRHpWdFc5ZTUzYTd2VEdDMHNaQmxRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzI2NjY3NjI1OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxRjA4Rjg2MTgzRDBGNTVFMjVCOEExNTFFOTM0OTg0MyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMTYyMzMxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiMjMzMjY2Njc2MjU4OjM1QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTgyNzUxMzYxNzk4MjU4OjM1QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1NJTFJEZ3RzWENCaGdDSUFBb0FBPT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWDUrTkpoaG41SkNyYzc0bkpPOTJON1R2eWhydFJpWldTckx1UitYVzl3ST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRW80TDFQUjMrakhJY0oxaGlZMVdEcTNKem9wSHNTK1JIUU91UHVvaFAxWTI4dWhkR3VTTldXNXMyRFMvNmtMUng5ekZxWTMvK1NWcWxhR2NXT3JEREE9PSIsImRldmljZVNpZ25hdHVyZSI6IjZRRGhTK25QZHQxSkFhbGFNeDhwcGdTM1hKUFlIU2dBcUc1QzVHcUNFeFM2U1hKUjhGRm1oNU1KMytobm4zU3YzQmo0YnB4T1FLbXF2ei9ZOUZwUGpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzMjY2Njc2MjU4OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlYrZmpTWVlaK1NRcTNPK0p5VHZkamUwNzhvYTdVWW1Wa3F5N2tmbDF2Y0MifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDE2MjI4NiwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEdDMifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®LUCCI",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233266676258",              
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
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
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
