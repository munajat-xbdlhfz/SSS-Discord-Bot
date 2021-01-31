const { getPrimogems } = require('../../functions/economy')

module.exports = {
    name: "shop",
    description: "Send embed about shoping primogems",
    args: true,
    dmAllow: true,
    async execute (message, args, Discord, emoji) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const dataUser = await getPrimogems(guildId, userId)
        const stardustEmoji = emoji("800622078193565758")
        const primogemEmoji = emoji("800621901906706512")

        try {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#0000FF')
            .setAuthor("Paimon's Bargains", "https://cdn.discordapp.com/attachments/784676159795232801/805043269837914162/paimon.png")
            .setDescription(
                `**${sender.username}**, you have **${dataUser.stardust}**${stardustEmoji}\n\n`+

                `Exchange your masterless stardust into primogems:\n`+
                `**160**${primogemEmoji}: **75**${stardustEmoji}\n`+
                `**1600**${primogemEmoji}: **750**${stardustEmoji}\n`+
                `**16000**${primogemEmoji}: **7500**${stardustEmoji}\n\n`+

                `Buy primogems with: **$buy 160, $buy 1600, $buy 16000**\n\n`+

                `How to get masterless stardust:\n`+
                `Use $multipull($mp) or $singlepull($sp) to get extra masterless stardust\n`+
                `- 3 star weapon: **15**${stardustEmoji}\n`+
                `- 4 star weapon: **30**${stardustEmoji}\n`+
                `- 4 star character: **30**${stardustEmoji}\n`+
                `- 4 star character C6: **75**${stardustEmoji}\n`+
                `- 5 star weapon: **150**${stardustEmoji}\n`+
                `- 5 star character: **150**${stardustEmoji}\n`+
                `If you get new 4 star character or 5 star character, you don't get extra masterless stardust`
            )

            mention = message.member
            return message.channel.send(mention, newEmbed)
        } catch (err) { console.log(err) } 
    }
}