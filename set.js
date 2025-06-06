const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR09uNlN3ODN4YlAweGxSM0tPR2s1TTdQdFZXVnpmT2srTHo1cFN0Q0xtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMHliaXQ1NkYrdy9iNmRUYlJvVEYxNG53bC9EcjZMcWtKNlpzTjBLbWFnRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTDBHWHlzSy9JUHdacThGVzZKZzNRVHJTcmZlK2JzTjV6eHo1V2RicVZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJONGdudVZRbGtPcWR2LytGZmd5S1hXTmUxazlZZUxsWmdkNmpRMXlQempBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRMMkNGZysrQko0K2hJdVhaWkJkSnU0eWRTNHdoSDVvazJMYnJ4L2lBM1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijl5RmtSWnhxNkN5VEVFTFcwTFFhTXVtM3ZKQk1ZM21aeVhiS1VYSXAxRkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFBKbXJiYjZrcmg5NDFRVDcyVnliY01VSklPc0hwOGkxTzFIUG93WjBtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmFxaDRHT2MrSkRhR21LRG9XTmdsNkZLemlEb3B1UG9MNzlZRS9PR09DMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImduekVYV3pqZURvc1B2cG00YXRFR0o0S3hTeVRwVnRJZzNtV09oNmNEMjNNa1BzWlAwZlBReCtsVXNPY29GUE94amkxcFE0K0l0cXpvQU1wNnR6Q0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTAsImFkdlNlY3JldEtleSI6ImR0czlhVTFxTkpCdEJoVjEzenNYKzNrZXJuRXR2Y0QyUHdpa3VsVGpCRE09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xYbzliOEhFTVg1aXNJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjV4MWcyR0FlSEhOWHo5Uk9URnFpL1dqa1NnUjF1ZmJ3U3FuV0xDdWlwMGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNuMDFIanVNajBnclErMWZ0NUsyUUxScTN5QkZ4blh0TjRuNU5QZ09BUjNMRm9zWWZIdTJnemNhRlh2Wk9YL3lzdmhhY0ZoUnRkSVFwTUprL0REUGpBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIzQmNhVmM2UlkrbVZqUFFMTnloTWdQSTJ4WUh0d052ZjBaQ1VzUVVtZUFpbTM4SWRnbkhoOUVNTXk0WTVDdkNsaVdrUjVQbmpTRXBZMldlMmNOTCtBZz09In0sIm1lIjp7ImlkIjoiMjMzNTUzMzk4MTM5OjM0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1yIEt3YWR3byIsImxpZCI6IjUyNTMxOTEyNzk4Mzc4OjM0QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NTMzOTgxMzk6MzRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZWNkWU5oZ0hoeHpWOC9VVGt4YW92MW81RW9FZGJuMjhFcXAxaXdyb3FkSiJ9fV0sInBsYXRmb3JtIjoic21iaSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5MjA0MTc5LCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ0VCIn0=',
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
    ETAT : process.env.PRESENCE || '2',
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
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
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
