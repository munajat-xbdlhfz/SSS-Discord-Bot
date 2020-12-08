// require('dotenv').config();

module.exports = {
    name: 'welcome',
    description: "welcoming a new member!",
    execute(guildMember, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .addFields(
            {
                name: 'WELCOME TO OUR DISCORD SERVER!', 
                value: `Selamat datang <@${guildMember.user.id}> \n`+
                        `Selamat bergabung di SSS Discord Server \n`+
                        `Silahkan membaca <#${process.env.RULES_ID}> terlebih dahulu \n`+
                        `Dan jangan lupa untuk mengisi <#${process.env.GREETINGS_ID}> biar akrab`
            },
        )
        .setThumbnail(guildMember.user.displayAvatarURL())
        .setImage("https://cdn.discordapp.com/attachments/732668771231334501/785608609760936017/people.jpg")
        // .setTimestamp()
        .setFooter("Let's hunt together & Happy Hunting!");

        return newEmbed;
    }
}