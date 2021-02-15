const { getPrimogems, buyPrimogems } = require('../../functions/economy')

module.exports = {
    name: "buy_primogems",
    description: "Buy primogems with user's masterless stardust",
    args: true,
    async execute (message, args, Discord, emoji) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const dataUser = await getPrimogems(guildId, userId)
        const primogemEmoji = emoji("800621901906706512")

        try {
            const primogems = args[0]
            if (isNaN(primogems)) {
                message.reply('please add a valid number of primogems.')
                return
            }

            if (primogems == 160) {
                if (dataUser.stardust >= 75) { 
                    const currentPrimogems = await buyPrimogems(guildId, userId, 75)
                    message.reply(`successfully buyed **160**${primogemEmoji}, now you have **${currentPrimogems}**${primogemEmoji}`) 
                    return
                }
            } else if (primogems == 1600) {
                if (dataUser.stardust >= 750) { 
                    const currentPrimogems = await buyPrimogems(guildId, userId, 750)
                    message.reply(`successfully buyed **1600**${primogemEmoji}, now you have **${currentPrimogems}**${primogemEmoji}`)
                    return 
                }
            } else if (primogems == 16000) {
                if (dataUser.stardust >= 7500) { 
                    const currentPrimogems = await buyPrimogems(guildId, userId, 7500) 
                    message.reply(`successfully buyed **16000${primogemEmoji}**, now you have **${currentPrimogems}**${primogemEmoji}`)
                    return
                }
            } else {
                message.reply(`you can only buy **160**, **1600**, or **16000**${primogemEmoji}.`)
                return
            }

            message.reply(`not enough masterless starlight!`)
        } catch (err) { console.log(err) } 
    }
}