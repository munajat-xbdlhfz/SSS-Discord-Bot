const { printWeapons } = require('../../functions/genshin')

module.exports = {
    name: 'check_weapons',
    description: 'check user weapons',
    maxArgs: 1,
    args: true,
    dmAllow: true,
    expectedArgs: "[Target user's @]",
    async execute (message, args, Discord) {
        const target = message.mentions.users.first() || message.author
        const sender = message.author
        const guildId = message.guild.id
        const userId = target.id
        const getWeapons = await printWeapons(guildId, userId)

        if (message.mentions.users.first()) {
            if (!getWeapons) {
                return message.channel.send(`<@${sender.id}>, that user don't have any weapons`)
            }
        } else {
            if (!getWeapons) {
                return message.channel.send(`<@${sender.id}>, you don't have any weapons`)
            }
        }

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .setAuthor(`${target.username} Weapons`, `${target.displayAvatarURL()}`)
        .setDescription(getWeapons)

        mention = `<@${sender.id}>\n`
        return message.channel.send(mention, newEmbed)     
    }
}