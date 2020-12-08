// require('dotenv').config();

const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "-";

const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log(`S.S.S-BOT is online!`);
});

// Send embedded greetings for new visiotr on welcoming-page channel
client.on("guildMemberAdd", guildMember => {
    guildMember.guild.channels.cache.get(process.env.WELCOME_ID).send(client.commands.get('welcome').execute(guildMember, Discord));
});

// Send embedded goodbye for members that leave the server on goodbye-page channel
client.on("guildMemberRemove", guildMember => {
    guildMember.guild.channels.cache.get(process.env.GOODBYE_ID).send(client.commands.get('goodbye').execute(guildMember, Discord));
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    // bot command
    const loli = [
        "CALL 911, WE HAVE PEDOPHILE!!",
        "Please dont, loli is not legal bro",
        "Come on, MILF is better than loli",
        "Ty!!!! GACHA!!!"
    ] 

    if (command === "loli") {
        const index = Math.floor(Math.random() * loli.length);
        message.channel.send(loli[index]);
    }
});

client.login(process.env.BOT_TOKEN);