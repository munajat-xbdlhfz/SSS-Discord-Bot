// require('dotenv').config();

module.exports = {
    name: 'welcome',
    description: "welcoming a new member!",
    execute(guildMember, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .setTitle('WELCOME TO OUR DISCORD SERVER!')
        .setDescription(
            `
            Selamat datang <@${guildMember.user.id}>
            Selamat bergabung di SSS Discord Server
            Silahkan membaca <#${process.env.RULES_ID}> terlebih dahulu
            Dan jangan lupa untuk mengisi <#${process.env.GREETINGS_ID}> biar akrab
            `)
        .setThumbnail(guildMember.user.displayAvatarURL())
        .setImage("https://cdn.discordapp.com/attachments/732668771231334501/785608609760936017/people.jpg")
        // .setTimestamp()
        .setFooter("Let's hunt together & Happy Hunting!");

        return newEmbed;
    }
}