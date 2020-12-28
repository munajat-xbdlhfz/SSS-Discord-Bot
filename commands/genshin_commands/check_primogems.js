const { getPrimogems } = require('../../functions/economy')

module.exports = {
    name: 'check_primogems',
    description: 'check user primogems',
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    async execute (message, args) {
        const target = message.mentions.users.first() || message.author
        const guildId = message.guild.id
        const userId = target.id
        const dataUser = await getPrimogems(guildId, userId)

        if (message.mentions.users.first()) {
            message.reply(`that user have ${dataUser.primogems} ✦`)
        } else {
            message.reply(`you have ${dataUser.primogems} ✦`)
        }
    }
}