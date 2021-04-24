module.exports = {
    name: 'welcome',
    description: "welcoming a new member!",
    execute(guildMember, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .addFields(
            {
                name: 'WELCOME TO OUR DISCORD SERVER!', 
                value: `Selamat datang ${guildMember.toString()} \n`+
                        `Selamat bergabung di SSS Discord Server \n`+
                        `Silahkan membaca <#${process.env.RULES_ID}> terlebih dahulu \n`+
                        `Dan jangan lupa untuk mengisi <#${process.env.GREETINGS_ID}> biar akrab`
            },
        )
        .setThumbnail(guildMember.user.displayAvatarURL())
        .setImage("https://cdn.discordapp.com/attachments/732668771231334501/798533259063066644/Welcome_SSS.png")
        // .setTimestamp()
        .setFooter("Let's hunt together & Happy Hunting!");

        if (guildMember.guild.id != process.env.GUILD_ID) {
            return
        }

        const channel = guildMember.guild.channels.cache.get(process.env.WELCOME_ID)
        channel.send(newEmbed)
    }
}