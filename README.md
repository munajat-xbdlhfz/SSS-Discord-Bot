# SSS-Discord-Bot

## Install dependencies
```
npm install discord.js
npm install dotenv
npm install mongoose
npm install ms
npm install node-cron
npm install parse-ms
npm install canvas
```

If you want to try this bot on your own discord, you must create your own bot.

## Link about how to create Discord Bot
- https://youtu.be/j_sD9udZnCk start at 8:50 (by CodeLyon)

## Link about how to install MongoDB
- https://youtu.be/FwMwO8pXfq0 (by ProgrammingKnowledge)

## .env file
```
MONGO_PATH = mongodb://localhost:27017/<database name>
BOT_TOKEN = <your discord server ID>
ADMIN_ID = <admin roles ID>
DEV_ID = <your ID>
WELCOME_ID = <welcome channel ID>
GOODBYE_ID = <goodbye channel ID>
GREETINGS_ID = <greetings channel ID>
RULES_ID = <rules channeld ID>
```

## Welcoming Page
![alt text](https://cdn.discordapp.com/attachments/784676159795232801/795774742476619847/Screenshot_61.png)

If you want to change the welcoming text, go to commands, general_commands, welcome.js, change text on name and value inside the .addFields

## Note about Genshin Impact daily and weekly claim
Daily and weekly always reset on 3:00 AM (GMT +7). If you want to change the daily and weekly reset, go to functions folder, claim.js.

## Example change daily at 01:00 PM GMT +7
```js
cron.schedule('0 13 * * 0-6', async () => {
    return await mongo().then(async (mongoose) => {
        try {
            const time = {userId:"TIME_RESET"}
            // SET NEW DAILY TIME
            await dailyPrimogemsSchema.findOneAndUpdate(time, time, {
                upsert: true
            })

            // RESET CLAIM ALL USER
            await dailyPrimogemsSchema.updateMany({claim: true}, {claim: false}, {
                upsert: true
            })  
        } catch (err) { console.log(err) }
    })
}, {
    scheduled: true,
    timezone: "Asia/Jakarta"
})
```
