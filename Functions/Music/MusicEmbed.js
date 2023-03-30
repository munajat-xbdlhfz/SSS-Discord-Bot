const { EmbedBuilder } = require("discord.js")
const { musicDuration } = require("./MusicTimeConvert")
const { escapeMarkdown } = require("../Markdown/EscapeMarkdown")
const probe = require("probe-image-size")

async function getSize(link) {
    try {
        await probe(link)
        return "maxresdefault"
    } catch(e) {
        return "hqdefault"
    }
}

async function playEmbed(client, player, track) {
    let volume, loop

    const embed = new EmbedBuilder()
    .setColor("Aqua")

    if (!player || !player.queue.current || player.state === "DISCONNECTED") {
        embed.setTitle("No song playing currently")
        embed.setFooter({ text: `${client.user.username}` })
        embed.setImage("https://cdn.discordapp.com/attachments/955726672328536096/1090996896144822354/headset.jpeg")
    } else {
        volume = player.volume
        if (!player.trackRepeat && !player.queueRepeat)
            loop = "Off"
        if (player.trackRepeat)
            loop = "Song"
        if (player.queueRepeat)
            loop = "Queue"

        embed.setTitle(`${escapeMarkdown(track.title)} - ${musicDuration(track)}`)
        embed.setFooter({ text: `${client.user.username} | Volume: ${volume}% | Loop: ${loop}` })
        if (!track.thumbnail) {
            embed.setImage("https://cdn.discordapp.com/attachments/955726672328536096/1090996896144822354/headset.jpeg")
        }
        else {
            const img = await getSize(track.displayThumbnail("maxresdefault"))

            if (img === "maxresdefault") 
                embed.setImage(track.displayThumbnail("maxresdefault"))
            else 
                embed.setImage(track.displayThumbnail("hqdefault"))
        }
    }

    return embed
}

async function queueEmbed(player) {
    let maxLength, over
    let list = ""
    var number = 0

    const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle("Queue List:")

    if (!player || player.queue.length < 1 || player.state === "DISCONNECTED")
        embed.setDescription("Join a voice channel and queue songs by name or url in here.")
    else {
        if (player.queue.length > 20) {
            maxLength = 20
            over = `And **${player.queue.length - maxLength}** more...`
        } else {
            maxLength = player.queue.length
            over = ``
        }

        player.queue.slice(0, maxLength).reverse().map((track) => {
            if (track.title)
                list = list + `\n**${maxLength - number}**. ${escapeMarkdown(track.title)} - ${musicDuration(track)}`
            number++
        })

        embed.setDescription(over + list)
    }

    return embed 
}

module.exports = {
    playEmbed,
    queueEmbed,
}