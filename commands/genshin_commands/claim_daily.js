const { claimDaily } = require('../../functions/claim')

module.exports = {
    name: "claim_daily",
    description: "Claim daily primogems",
    async execute (message, args, emoji) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const claim = await claimDaily(guildId, userId, emoji)
        message.reply(claim)
    }
}