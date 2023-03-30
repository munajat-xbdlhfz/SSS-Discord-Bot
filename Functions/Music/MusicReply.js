const { EmbedBuilder } = require("discord.js")
const { musicButton } = require("./MusicButton")
const { playEmbed, queueEmbed } = require("./MusicEmbed")
const musicSchema = require("../../Structures/Schemas/MusicChannel")

async function setMusicReply(client, player, track) {
    try {
        let data = await musicSchema.findOne({ GuildID: player.options.guild })

        if (!data) return;

        const queue = await queueEmbed(player)
        const play = await playEmbed(client, player, track)
        const button = await musicButton()

        return client.channels.cache.get(data.ChannelID).messages.fetch(data.EmbedID).then(msg => {
            msg.edit({
                embeds: [queue, play],
                components: [button]
            })
        });
    } catch (e) {
        console.log(e)
    }
}

async function setReplyError(client, player, options) {
    try {
        let data = await musicSchema.findOne({ GuildID: player.options.guild })

        if (!data) return;

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Something when wrong while playing the track: **${options}**`)

        return client.channels.cache.get(data.ChannelID).send({
            embeds: [embed]
        }).then(msg => {
            setTimeout(() => msg.delete(), 3000)
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = { 
    setMusicReply,
    setReplyError,
}