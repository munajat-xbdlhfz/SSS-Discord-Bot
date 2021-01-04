# SSS-Discord-Bot

## Install node module
```
npm install discord.js
```

If you want to try this bot on your own discord, you must create your own bot.

## Link about how to create Discord Bot
- https://youtu.be/j_sD9udZnCk start at 8:50 (by CodeLyon)


After create your own Discord Bot, install MongoDB on your pc.

## Link about how to install MongoDB
- https://youtu.be/FwMwO8pXfq0 (by ProgrammingKnowledge)


Make sure to activate Developer Mode on your discord.

## Activate Developer Mode on Discord
```
Go to settings on discord -> Appearance -> then activate Developer Mode
```

## Create .env file
```
Create a new file with name .env
```

## MUST TO DO
1. Right click on your discord server, then click copy ID.
2. Type this on .env file:
```
MONGO_PATH = mongodb://localhost:27017/<your database name>
BOT_TOKEN = <paste your discord server ID>
```

3. Make sure you already create roles with name "ADMINISTRATOR" or "ADMIN" to separate the permissions on users.
4. Right click on roles name "ADMINISTRATOR" or "ADMIN", then click copy ID.
5. Type this on .env file:
```
ADMIN_ID = <paste admin roles ID>
```
6. Create 2 channel with name welcome and goodbye, this channel will notify if users are joining or leaving your discord server.
7. Right click on welcome channel and goddbye channel, then click copy ID.
8. Type this on .env file:
```
WELCOME_ID = <paste welcome channel ID>
GOODBYE_ID = <paste goodbye channel ID>
```

## EXAMPLE OF .env FILE
```
MONGO_PATH = mongodb://localhost:27017/sss-discord-bot
BOT_TOKEN = 1QaZ2WsX3EdC4RfV5.TgB6YhN.7UjM8Ik9oL0P
DEV_ID = 147258369326159487
WELCOME_ID = 664521867649875978
GOODBYE_ID = 785593545712205904
```

## Welcoming Page
! [Demo] (https://cdn.discordapp.com/attachments/784676159795232801/795766060167069767/Screenshot_59.png)

If you want to change the welcoming text, go to commands, general_commands, welcome.js
Change text on name and value inside the .addFields

## Note about genshin daily and weekly claim
Daily and weekly always reset on 3:00 AM (GMT +7). If you want to change the daily and weekly reset, go to functions folder, claim.js.
