const { printCharacters } = require('../../functions/genshin')

module.exports = {
    name: 'check_characters',
    description: 'check user characters',
    maxArgs: 1,
    args: true,
    dmAllow: true,
    expectedArgs: "[Target user's @]",
    async execute (message, args, Discord) {
        const target = message.mentions.users.first() || message.author
        const sender = message.author
        const guildId = message.guild.id
        const userId = target.id
        const getCharacter = await printCharacters(guildId, userId)

        if (message.mentions.users.first()) {
            if (!getCharacter) {
                return message.channel.send(`<@${sender.id}>, that user don't have any character`)
            }
        } else {
            if (!getCharacter) {
                return message.channel.send(`<@${sender.id}>, you don't have any character`)
            }
        }

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .setAuthor(`${target.username} Characters`, `${target.displayAvatarURL()}`)
        .setDescription(getCharacter)

        mention = `<@${sender.id}>\n`
        return message.channel.send(mention, newEmbed)
    }
}