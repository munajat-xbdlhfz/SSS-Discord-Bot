const { setNamecard } = require('../../functions/genshin')

module.exports = {
    name: 'set_namecard',
    description: 'set namecard background on user profile',
    async execute (message, args) {
        try {
            const sender = message.author;
            const guildId = message.guild.id
            const userId = sender.id

            // Check if value is not empty
            const primogems = args[0]
            if (!primogems) {
                message.reply('please add a characters name or default.')
                return
            }

            const character = args.join(' ').toLowerCase()
            const set = await setNamecard(guildId, userId, character)

            if (set) {
                message.reply(`namecard changed to ${character}`)
            } else {
                message.reply("you don't have that character, or the namecard are not available")
            }

            
        } catch (err) { console.log(err) } 
    }
}