const { addPrimogems } = require('../../functions/economy')

module.exports = {
    name: 'give_primogems',
    description: 'give user primogems',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<The target's @> <primogems amount>",
    permissionError: `You don't have permission to use this command.`,
    permission: 'ADMINISTRATOR, DEVELOPER',
    async execute (message, args, emoji) {
        const mention = message.mentions.users.first()
        
        // Check if user is administrator or dev
        if (message.member.roles.cache.has(process.env.ADMIN_ID) || message.author.id ===  process.env.DEV_ID) {
            // Check if mention user
            if (!mention) {
                message.reply('please tag a user to add primogems.')
                return
            }

            // Check if value of primogems is a number
            const primogems = args[1]
            if (isNaN(primogems)) {
                message.reply('please add a valid number of primogems.')
                return
            }

            const guildId = message.guild.id
            const userId = mention.id
            const newPrimogems = await addPrimogems(guildId, userId, primogems)
            const primogemEmoji = emoji("800621901906706512")
            message.reply(`you have given <@${userId}> **${primogems}**${primogemEmoji}. They now have **${newPrimogems}**${primogemEmoji}`)
        } else {
            message.reply(`you don't have permission to use this command.`)
        }
    }
}