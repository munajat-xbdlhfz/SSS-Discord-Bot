const { Manager } = require("erela.js")
const { setMusicReply, setReplyError } = require("../Music/MusicReply") 
const { setLeaveTimeout, clearLeaveTimeout } = require("../Timeout/MusicTimeout")
const Spotify = require("erela.js-spotify")
const wait = require("node:timers/promises").setTimeout;
require("dotenv").config();

function loadErela(client) {
    const erelaHost = process.env.ERELA_HOST
    const erelaPassword = process.env.ERELA_PASSWORD
    const erelaPort = parseInt(process.env.ERELA_PORT)
    const erelaSecure = process.env.ERELA_SECURE === "true"

    const clientID = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    return new Manager({
        nodes: [{
            host: erelaHost,
            password: erelaPassword,
            port: erelaPort,
            secure: erelaSecure
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
    .on("playerMove", async (player, oldChannel, newChannel) => {
        if (!newChannel) {
            return player.destroy();
        } else {
            player.voiceChannel = newChannel;
            await wait(1000);
            player.pause(false);
        }
    })
    .on("trackError", (player) => {
        setReplyError(client, player, "track error")
    })
    .on("trackStuck", (player) => {
        setReplyError(client, player, "track stuck")
    })
}

module.exports = { loadErela }