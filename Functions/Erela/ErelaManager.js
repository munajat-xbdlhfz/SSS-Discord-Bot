const { Manager } = require("erela.js")
const { setMusicReply } = require("../Music/MusicReply") 
const { setLeaveTimeout, clearLeaveTimeout } = require("../Timeout/MusicTimeout")
const Spotify = require("erela.js-spotify")
require("dotenv").config();

function loadErela(client) {
    const clientID = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    return new Manager({
        nodes: [{
            host: process.env.ERELA_HOST,
            password: process.env.ERELA_PASSWORD,
            port: 80,
        }],
        plugins: [
            new Spotify({
              clientID,
              clientSecret
            })
        ],
        autoPlay: true,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    })
    .on("nodeConnect", node => {
        console.log(`Node "${node.options.identifier}" connected.`)
    })
    .on("nodeError", (node, error) => {
        console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
    })
    .on("trackStart", (player, track) => {
        setMusicReply(client, player, track)
        clearLeaveTimeout()
    })
    .on("queueEnd", player => {
        setMusicReply(client, player)
        setLeaveTimeout(player)
    })
    .on("playerDestroy", player => {
        setMusicReply(client, player)
    })
    .on("playerMove", (player, oldChannel, newChannel) => {
        player.options.voiceChannel = newChannel
        player.setVoiceChannel(newChannel)

        console.log(player)
    })
}

module.exports = { loadErela }