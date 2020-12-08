module.exports = {
    name: 'goodbye',
    description: "say goodbye to our member",
    execute(guildMember, Discord) {
        // Random text for saying goodbye
        const goodbye = [
            `It seems <@${guildMember.user.id}> has left us...`,
            `Goodbye <@${guildMember.user.id}>, see yaa!!`,
            `Goodbye to our comrades <@${guildMember.user.id}>`,
            `<@${guildMember.user.id}>, why you left? we will miss you...`,
            `<@${guildMember.user.id}> just left the server`
        ]
        
        const index = Math.floor(Math.random() * goodbye.length);
        return goodbye[index];
    }
}