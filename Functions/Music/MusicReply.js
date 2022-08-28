const { musicButton } = require("./MusicButton")
const { playEmbed, queueEmbed } = require("./MusicEmbed")
const musicSchema = require("../../Structures/Schemas/MusicChannel")

async function setMusicReply(client, player, track) {
    musicSchema.findOne({ GuildID: player.options.guild }, async (err, data) => {
        if (err) throw err;
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
    })
}

module.exports = { setMusicReply }