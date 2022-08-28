const { Client, CommandInteraction } = require("discord.js")
const { erelaPlayer } = require("../../Functions/Erela/ErelaPlayer")
const musicSchema = require("../../Structures/Schemas/MusicChannel")

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {CommandInteraction} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (message.author.bot) return;
        
        const { guild, member, channel } = message;
        const voiceChannel = member.voice.channel

        try {
            musicSchema.findOne({ GuildID: guild.id }, async (err, data) => {
                if (err) throw err;
                if (!data) return;
                if (channel.id !== data.ChannelID) return

                if (!voiceChannel) 
                    return message.reply({
                        content: "You must be in a voice channel to be able to use the music commands.", 
                        ephemeral: true
                    }).then(msg => {                
                        setTimeout(() => {
                            message.delete().catch(() => {})
                            msg.delete()
                        }, 3000)
                    });

                if (guild.members.me.voice.channelId && voiceChannel.id !== guild.members.me.voice.channelId)
                    return message.reply({
                        content: `I'm already playing music in <#${guild.members.me.voice.channelId}>.`, 
                        ephemeral: true
                    }).then(msg => {                
                        setTimeout(() => {
                            message.delete().catch(() => {})
                            msg.delete()
                        }, 3000)
                    });

                await erelaPlayer(message, client, "play")

                return message.delete().catch(() => {});
            })
        } catch(e) {
            console.log(e)
        }
    }
}