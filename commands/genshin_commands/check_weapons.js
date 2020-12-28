const { printWeapons } = require('../../functions/genshin')

module.exports = {
    name: 'check_weapons',
    description: 'check user weapons',
    args: true,
    dmAllow: true,
    async execute (message, args, Discord) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const getWeapons = await printWeapons(guildId, userId)

        if (getWeapons) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#0000FF')
            .setAuthor(`${message.author.username} Characters`, `${message.author.displayAvatarURL()}`)
            .setDescription(getWeapons)

            mention = `<@${sender.id}>\n`
            message.channel.send(mention, newEmbed)
        } else {
            message.channel.send(`<@${sender.id}>, you don't have any weapon`)
        }       
    }
}