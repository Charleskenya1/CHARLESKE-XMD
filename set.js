const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0EwMDJVVnYyYmNrYVI2RVZKemQyejJCU3p6OXNBazlJcTZGamVSVGpHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoienhJNTFrYStOeHE3ampHdUlQRFV5RG9TenBwYURmSVR3WWkyQVlQSG13UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDT3o5dUpkSnljZW9maUpjSnoxcGpXU1gwNStSVWprb1hWbFNRT3loalZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkSStqK2FhbjVPZnowVFlOdmxFYlRJbzh5U1VEL1c0cHZQNmh2RE1RM1dvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFBVzNOenBRZVVuK1poODU3bEhHejgxbDBEYURwWmd0bUFEQ2gwWnI5RkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhqckRhZVBhSC9QcmdmRGJkOW5kTHRZT0kwSXNETWtNb1RETWhsT1hoRzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0hxWGNhb0w4Q25EbjFOT2l1L2hzRnNYZ2xqaUJwZUpSRFZEdCtIZm5Wdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkNkRnpSbGVKV09xbnhVMzNKeWZrNmhTeExFYzlWRktUMWg5KzdnaXlrOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRwMk9EVUZ6TkJSZmlGc0U2SWtER3pjZmVqL3NsSEVHWGdPZmViNUtsdlpUMzdSSXEwS0ZpUFRXMFNIVWJ5KzFoTFYzVVdFY3FVVjQzQ3p4bFRUakNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjcsImFkdlNlY3JldEtleSI6ImlKT1I0WWMvdElvazM5c3FmSjJ1bGxieGZyamJNUGhvUS9nWFdNZVE0Z1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0MTEyMjIyOTMwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkJDM0VERTI2MTI1REY0NjhCQTcyNTBFM0YxOTE0NjM4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc2MDc4ODF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pXejRzVURFTGJDcWNFR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlMyQ0U2aWd5UTVGSmd6TDN5NDZsdkU0Yjc4RGRHSlY5Q2FKNTdTd1Y5U0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBsMFlHYW5ZT3JiUWVVa255NVJTR3lyRmErK0M1anhYcDNJcXNpVXpuaHdiVzFORmxSbVdOdHlqd1I3YTJEMkJlNlFtWGtKV1FiZU45a3ZaSE1HMEN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0L2lkQjBNZ2Q0Vnc5MDQxRDJRVmNLMjRBY0RjaDVJOTFnbCtXUE5pb3lMazViN2lpN1hwbnh4OVRJNkNBZGQ0TEFwR01vTHhZUEZjOGFPdUo3WUhCUT09In0sIm1lIjp7ImlkIjoiMjU0MTEyMjIyOTMwOjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTGF2aWEiLCJsaWQiOiI2OTQ5NzkzOTcyMzk5OjdAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDExMjIyMjkzMDo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlV0Z2hPb29Na09SU1lNeTk4dU9wYnhPRysvQTNSaVZmUW1pZWUwc0ZmVWkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzYwNzg3NiwibGFzdFByb3BIYXNoIjoiM1I5WjM5IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDNjIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Charles ke",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Charles ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
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

