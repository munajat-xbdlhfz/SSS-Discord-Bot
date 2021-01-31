const { getPrimogems } = require('../../functions/economy')

module.exports = {
    name: 'check_primogems',
    description: 'check user primogems',
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    async execute (message, args, emoji) {
        const target = message.mentions.users.first() || message.author
        const guildId = message.guild.id
        const userId = target.id
        const primogemEmoji = emoji("800621901906706512")
        const dataUser = await getPrimogems(guildId, userId)

        if (message.mentions.users.first()) {
            message.reply(`that user have **${dataUser.primogems}**${primogemEmoji}`)
        } else {
            message.reply(`you have **${dataUser.primogems}**${primogemEmoji}`)
        }
    }
}