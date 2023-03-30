const { EmbedBuilder } = require("discord.js")
const { setMusicReply } = require("../Music/MusicReply")
const musicSchema = require("../../Structures/Schemas/MusicChannel")

async function erelaPlayer(message, client, options) {
    let desc
    const { guild, member, channel } = message

    const player = client.manager.create({
        guild: guild.id,
        voiceChannel: member.voice.channel.id,
        textChannel: channel.id,
        selfDeafen: true,
    })

    switch (options) {
        case "play": {
            if (player.state !== "CONNECTED") 
                player.connect();

            try {
                const res = await client.manager.search(message.content, message.author)

                if (res.loadType === "LOAD_FAILED") {
                    if (!player.queue.current) 
                        player.destroy();
                    
                    desc = "An error has occured while trying to add this song."
                    return await messageReply(message, client, desc)
                }
    
                if (res.loadType === "NO_MATCHES") {
                    if (!player.queue.current) 
                        player.destroy();
                 
                    desc = "No results found."
                    return await messageReply(message, client, desc)
                }
    
                if (res.loadType === "PLAYLIST_LOADED") {
                    if (player.queue.current) {
                        player.queue.add(res.tracks);
        
                        if (!player.playing && !player.paused)
                            player.play();
        
                        setMusicReply(client, player, player.queue.current)
                    } else {
                        player.queue.add(res.tracks);
        
                        if (!player.playing && !player.paused)
                            player.play();
                    }
    
                    desc = `A playlist ${res.playlist.name} has been added to the queue.`
                    return await messageReply(message, client, desc)
                }
    
                if (res.loadType === "TRACK_LOADED" || res.loadType === "SEARCH_RESULT") {
                    if (player.queue.current) {
                        player.queue.add(res.tracks[0]);
        
                        if (!player.playing && !player.paused && !player.queue.size)
                            player.play();
                        
                        setMusicReply(client, player, player.queue.current)
                    } else {
                        player.queue.add(res.tracks[0]);
        
                        if (!player.playing && !player.paused && !player.queue.size)
                            player.play();
                    }
    
                    desc = `Added ${res.tracks[0].title} to the queue.`
                    return await messageReply(message, client, desc)
                }
            } catch (e) {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`There was an error while searching: **${message.content}**`)

                console.log(e.message)
                return message.reply({ 
                    embeds: [embed] 
                }).then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                })
            }
        }
        break;

        case "pause": {
            if (!player.playing && !player.paused) {
                return desc = "There is nothing playing right now."
            }

            if (!player.paused) {
                await player.pause(true);
                return desc = "Song has been paused."
            }
             
            if (player.paused) {
                await player.pause(false);
                return desc = "Song has been resumed."
            }
        }
        break;

        case "skip": {
            if (!player.playing) {
                return desc = "There is nothing playing right now."
            }
            
            await player.stop();
            return desc = "Song has been skipped."
        }
        break;

        case "repeat": {
            if (!player.playing) {
                return desc = "There is nothing playing right now."
            }

            if (!player.trackRepeat && !player.queueRepeat) {
                player.setTrackRepeat(true) 
                setMusicReply(client, player, player.queue.current)
                return desc = "Repeat mode has been enabled. (Song)"
            } 
            
            if (player.trackRepeat) {
                player.setTrackRepeat(false)
                player.setQueueRepeat(true)        
                setMusicReply(client, player, player.queue.current)
                return desc = "Repeat mode has been enabled. (Queue)"
            } 
            
            if (player.queueRepeat) {
                player.setQueueRepeat(false)
                setMusicReply(client, player, player.queue.current)
                return desc = "Repeat mode has been disabled."
            }
        }
        break;

        case "shuffle": {
            if (!player.playing) {
                return desc = "There is nothing playing right now."
            }

            if (!player.queue.length) {
                return desc = "There is nothing in the queue."
            }

            await player.queue.shuffle()
            setMusicReply(client, player, player.queue.current)
            return desc = "The queue has been shuffled."
        }
        break;

        case "stop": {
            if (!player.playing) {
                return desc = "There is nothing playing right now."
            }

            player.destroy()
            return desc = "Music has been stopped."
        }
        break;
    }
}

async function messageReply(message, client, desc) {
    try {
        let data = await musicSchema.findOne({ GuildID: message.guild.id })

        if (!data) return

        const embed = new EmbedBuilder()
            .setColor("Aqua")
            .setDescription(desc)

        client.channels.cache.get(data.ChannelID).send({
            embeds: [embed]
        }).then(msg => {
            setTimeout(() => msg.delete(), 3000)
        })
    } catch (e) {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`An error occured: ${e}`)

        console.log(e)
        return message.reply({ embeds: [embed] })
    }
}

module.exports = { erelaPlayer }