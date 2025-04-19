const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUhRS1EwTTRqM0VQc1NaQjNkdCtIN0xPN2RxQVFCRTZEeHBUMm10aW9GQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1cyNTRzZXFzaTZ2MFhTc3g2VFNsS25UZkJNaFFSTCtvUllkeGdnbUVUWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSCtmSkNCWlRQYlkvRmJKb2pGL1B4WkkxVmF6S2puRlA3MUIwNy9BajBzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQXBEVlI2clVFRnF1VzRRY2NQejF4UjllVVlWSS92eUxlbDg5dSs4SGhjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNMdEZ5ek4xNFpIdllKNExJcUlOSmNTME1qVGtVbktEbzJaQklBTlA4VXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InF5NEw2bnV0RFZ3SHY5L1QyakovaS9UekYyUVpHcmFVWXArZEQ3aWJ3ems9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUZHelpuK1JTYzZZN2hON2pibUUzOHQvUk10S09EL0dpRDZYMkpwYmlrdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicEQ2VGdQcFc5ZzcxMG83NVljWXJqa08vN2t1QmdHMStYMkRSWmlsN29BTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldONUpKTUxVZTFZQzZjcjkxdkZrVjlLeDVaam1tcHprRzJSOTNIVHNpZnVKSHRvZS9iUldiT290akM1Z0dzMTVtMkFFNGtjclJqSzMzbjhvb1d4dWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTUsImFkdlNlY3JldEtleSI6IjZURTRNenFqR3NNK3kvUC9DMllaWXZyazNvZkZtakVHZFVydFJhR0VEN2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg5MDg1NTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijc1MjU4MjZBNTFGMzgzMEU4MTg0N0NGNTg0NDFENzdGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUwOTM5Mzd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTA4NTUzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NTgxOTY1NjEyREY0RjgyMENFMEQ3NzY3QkYyNjU4RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MDkzOTM3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODkwODU1MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEUwNEI3RTM0RjhENEFBMEFENTEyMjkzOEFDMDY0RjMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTA5Mzk0MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQU9XZDRPSUhTVnE1UEFXU1JRZFdhZyIsInBob25lSWQiOiI0YmJkODhjYS1iNGM3LTQ4ZmUtOWU3ZC0zZmY4OTQ1Y2U4M2IiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2JmZDlCcWV0QUZqc3hzMUlyTE1IRyszeVZzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZrOTN5T3Vhdml4QmxUYXdRYytOb1ZXakZFZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJFQUg5SkQ2VyIsIm1lIjp7ImlkIjoiMjYzNzg5MDg1NTMzOjUwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkLfwnZC44oSV8J2QtfCdmYrwnZGM4piGIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQV0tqWk1DRUtHS2tNQUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI1V1NQU2RqQ2wwcmk0TlJuWWxaUkZjait3bnFwR1doN3FTam9KSHNXRXlBPSIsImFjY291bnRTaWduYXR1cmUiOiIyWWk4TmVkT2xySEhMQlFRM2R0ZkNnK3AwRzNWWXF0WXNDazNZSDlTdWlBcFJhd1phdlNhVHh4UmpRUlMwTFo3anBtcUdUQkV5YzhzdUJjeDlEcHNEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNXBDdUNrVGtCWFJ4WWlWTkc2UmZzMHhxdVJSQk9sN1ZiYWVVaVlBWUpUK2V4b0hKeG5odnVOdVR0ayttd0RHbDRveDQ5cmc5YXUrS290ZGtuYXlpaWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODkwODU1MzM6NTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZVZrajBuWXdwZEs0dURVWjJKV1VSWEkvc0o2cVJsb2U2a282Q1I3RmhNZyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTA5MzkzNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFETkcifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌☆",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "𝐷𝐸ℕ𝐵𝙊𝑌☆",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
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

