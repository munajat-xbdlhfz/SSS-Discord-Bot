const { giveAllPrimogems } = require('../../functions/economy')

module.exports = {
    name: 'give_primogems',
    description: 'give all user primogems',
    expectedArgs: "<primogems amount>",
    permissionError: `You don't have permission to use this command.`,
    permission: 'ADMINISTRATOR, DEVELOPER',
    async execute (message, args) {
        // Check if user is administrator or dev
        if (message.member.roles.cache.has(process.env.ADMIN_ID) || message.author.id ===  process.env.DEV_ID) {
            // Check if value of primogems is a number
            const primogems = args[0]
            if (isNaN(primogems)) {
                message.reply('please add a valid number of primogems.')
                return
            }

            const guildId = message.guild.id
            const newPrimogems = await giveAllPrimogems(guildId, primogems)
            message.reply(`you have given all user's ${primogems} ✦.`)
        } else {
            message.reply(`you don't have permission to use this command.`)
        }
    }
}