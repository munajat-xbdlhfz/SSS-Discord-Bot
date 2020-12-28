const { printCharacters } = require('../../functions/genshin')

module.exports = {
    name: 'check_characters',
    description: 'check user characters',
    args: true,
    dmAllow: true,
    async execute (message, args, Discord) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const getCharacter = await printCharacters(guildId, userId)

        if (getCharacter) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#0000FF')
            .setAuthor(`${message.author.username} Characters`, `${message.author.displayAvatarURL()}`)
            .setDescription(getCharacter)

            mention = `<@${sender.id}>\n`
            message.channel.send(mention, newEmbed)
        } else {
            message.channel.send(`<@${sender.id}>, you don't have any character`)
        }
    }
}