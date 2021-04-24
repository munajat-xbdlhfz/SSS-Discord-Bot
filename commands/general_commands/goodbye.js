module.exports = {
    name: 'goodbye',
    description: "say goodbye to our member",
    execute(guildMember, Discord) {
        // Random text for saying goodbye
        const goodbye = [
            `It seems **${guildMember.user.username}** has left us...`,
            `Goodbye **${guildMember.user.username}**, see yaa!!`,
            `Goodbye to our comrades **${guildMember.user.username}**`,
            `**${guildMember.user.username}**, why you left? we will miss you...`,
            `**${guildMember.user.username}** just left the server`
        ]
        
        const index = Math.floor(Math.random() * goodbye.length);

        if (guildMember.guild.id != process.env.GUILD_ID) {
            return
        }
        
        const channel = guildMember.guild.channels.cache.get(process.env.GOODBYE_ID)
        channel.send(goodbye[index])
    }
}