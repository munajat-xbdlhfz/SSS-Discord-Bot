const { claimWeekly } = require('../../functions/claim')

module.exports = {
    name: "claim_weekly",
    description: "Claim weekly primogems",
    async execute (message, args, emoji) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const claim = await claimWeekly(guildId, userId, emoji)
        message.reply(claim)
    }
}