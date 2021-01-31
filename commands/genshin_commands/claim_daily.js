const { claimDaily } = require('../../functions/claim')

module.exports = {
    name: "claim_daily",
    description: "Claim daily primogems",
    async execute (message, args, emoji) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const primogemEmoji = emoji("800621901906706512")
        const claim = await claimDaily(guildId, userId)
        const msg = `you have claimed **${primogems}**${primogemEmoji}`
        message.reply(msg)
    }
}