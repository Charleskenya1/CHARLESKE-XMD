const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUo1UEVlWjJ5U0IrNFVHY1B0MzZaUWVrVThuTUJVYWU1cUVFT1oxYm5WUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL1p4UWNMUmdXc1pmQzF1LzIyc3pUNjgrZWlETzhMeEQxa2hPMjM5RlRRdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1TE13TjJlLzZXdXNZL3IwRkdpQ0pyVVFJUDFLUW5vYnVVOUlZdklZK0VvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIYWlud3lZYzdtVWxLVHFsbkZPeXJqdlpIZ1Z6L2ZUK2hpenJBV3VWVjBzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFCeE9XSVZ0cE56UjhzU3E0bFNWMTdkZ1NmMmhnTzdkYXpZTTJBbllHVTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhFTXA0cHF1bnBUWEM4K0FuT0prNEV2RExQcUdHOHNWMU4zSmNMRkZkdzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0JiaU9uSTZvVldwODdZWVdTQWc1WGZYT0owWjVZZlJ5TFltWm9KWmIwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGxlaHF6dHRrR1A3NWVXWDhVcWZlRkdELzM2dFo1Y20vcFFtZmU1Rm9RUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJzclRpWlhpVDB4R0t0bmZlSlZnWGpmdXFXOWYxdHd6RUxVOXpyMHBPS3Y2eW9mWWR5VWF5cnVyYWhOR3VzWGhpL28vU0hBeHNsV21oMHdSN2FxR0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzQsImFkdlNlY3JldEtleSI6ImVTaVVMeFl0KzQ0L0F6T0dlSnA5M1FxckF0eWdGblFhWW55MjY4M1RtNlk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjc2OTU2NzMzMTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOUMzRTE2RTkzMDI1NDRFRDlFMjBDQ0YyNUUwRkJENDkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDQ3MjEwNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjI3Njk1NjczMzEwOjU1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ikh1YkNtYWluaWEiLCJsaWQiOiI1MDA4ODE5MzgyMjkzMDo1NUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tlSnp1UUhFSUdyMk1JR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjFPQ29qemZPTEt4MkFTSlhDWjNtZi9YR0ppaTVaY3pnSFU1MnoyaVZPQ1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjJyRDZNcnFJanFtRzZzd0MwOXhTY05EUXcyL3U3Q1ZDTS95WVRIVERkcW5BZ2tJcituK09ZZCswVHJPcUZEY09HVGJnTUJSVkFUZ2ExWURSUW8yZENnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvK1pRNy9vYXN4aEExZXF2UzBnL2tzMmx5RThSVnJrZGRFd1dDcUZJT0U0cG5WeHlnWXg4eURDVE1aU2M4b2dEalQ0MTNWQTBPQmpqT0pwaDVhUE9EUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3Njk1NjczMzEwOjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRUZ3FJODN6aXlzZGdFaVZ3bWQ1bi8xeGlZb3VXWE00QjFPZHM5b2xUZ20ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDQ3MjA3OSwibGFzdFByb3BIYXNoIjoiM1I5WjM5IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOMW8ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27695673310",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
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
