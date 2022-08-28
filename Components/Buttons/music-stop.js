const { Client, EmbedBuilder } = require("discord.js")
const { erelaPlayer } = require("../../Functions/Erela/ErelaPlayer")

module.exports = {
    data: {
        name: `music-stop`
    },
    /**
     * 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild, member } = interaction;
        const voiceChannel = member.voice.channel
        
        if (!voiceChannel)
            return interaction.reply({
                content: "You must be in a voice channel to be able to use the music commands.", 
                ephemeral: true
            });

        if (guild.members.me.voice.channelId && voiceChannel.id !== guild.members.me.voice.channelId)
            return interaction.reply({
                content: `I'm already playing music in <#${guild.members.me.voice.channelId}>.`, 
                ephemeral: true
            });

        const desc = await erelaPlayer(interaction, client, "stop")

        const embed = new EmbedBuilder()
            .setColor("Aqua")
            .setDescription(desc)

        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}