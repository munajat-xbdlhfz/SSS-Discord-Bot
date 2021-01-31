const Discord = require("discord.js");
const mongo = require('./mongo');
const commandList = require('./commands/index')
const client = new Discord.Client();

// Login discord bot
client.login(process.env.BOT_TOKEN)

// Set bot prefix
const prefix = "$"

// Get emoji function
function emoji(id) {
    return client.emojis.cache.get(id).toString()
}

// Get command from commands file
const commands = {
    ...commandList.general_commands,
    ...commandList.genshin_commands,
}

client.once("ready", async () => {
    console.log(`S.S.S-BOT is online!`)
    await mongo().then(mongoose => {
        try {
            console.log("connected to mongo!")
        } finally {
            mongoose.connection.close()
        }
    })

    client.user.setPresence({
        activity: {
            name: `${prefix}help`,
        }
    })
});

// Send embedded greetings for new visitor on welcoming-page channel
client.on("guildMemberAdd", guildMember => {
    commands.welcome.execute(guildMember, Discord)
});

// Send embedded goodbye for members that leave the server on goodbye-page channel
client.on("guildMemberRemove", guildMember => {
    commands.goodbye.execute(guildMember, Discord)
});

// Message bot commands
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const getCommand = args.shift().toLocaleLowerCase();

    switch(getCommand != null) {
        case (getCommand === "multipull" || getCommand === "mp") : {
            commands.multi_pull.execute(message, args, Discord, emoji)
            return
        }

        case (getCommand === "singlepull" || getCommand === "sp") : {
            commands.single_pull.execute(message, args, Discord, emoji)
            return;
        }

        case (getCommand === "primogems") : {
            commands.check_primogems.execute(message, args, emoji)
            return;
        }

        case (getCommand === "mycharacters" || getCommand === "mc") : {
            commands.check_characters.execute(message, args, Discord)
            return;
        }

        case (getCommand === "myweapons" || getCommand === "mw") : {
            commands.check_weapons.execute(message, args, Discord)
            return;
        }

        case (getCommand === "profile") : {
            commands.check_profile.execute(message, args, Discord)
            return;
        }

        case (getCommand === "setnamecard") : {
            commands.set_namecard.execute(message, args)
            return;
        }

        case (getCommand === "daily") : {
            commands.claim_daily.execute(message, args, emoji)
            return;
        }

        case (getCommand === "weekly") : {
            commands.claim_weekly.execute(message, args, emoji)
            return;
        }

        case (getCommand === "give") : {
            commands.give_primogems.execute(message, args, emoji)
            return;
        }

        case (getCommand === "giveall") : {
            commands.give_all_primogems.execute(message, args, emoji)
            return;
        }

        case (getCommand === "shop") : {
            commands.shop.execute(message, args, Discord, emoji)
            return;
        }
        
        case (getCommand === "buy") : {
            commands.buy_primogems.execute(message, args, Discord, emoji)
            return;
        }
        
        case (getCommand === "message") : {
            commands.message.execute(message, args)
            return;
        }

        case (getCommand === "help") : {
            commands.help.execute(message, args, Discord, emoji)
            return;
        }

        case (getCommand === "clear") : {
            commands.clear.execute(message, args, Discord)
            return;
        }
    }
});
