const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } =  require("discord.js");
const { musicButton } = require("../../Functions/Music/MusicButton")
const { playEmbed, queueEmbed } = require("../../Functions/Music/MusicEmbed")
const musicSchema = require("../../Structures/Schemas/MusicChannel")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("Complete music system")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addSubcommand(subcommand =>
            subcommand.setName("setup").setDescription("Create music channel")
        ),
    async execute(interaction, client) {
        const { guild } = interaction
            
        try {
            musicSchema.findOne({ GuildID: guild.id }, async (err, data) => {
                if (err) throw err;

                if (data && guild.channels.cache.get(data.ChannelID))
                    return interaction.reply({
                        content: `Music channel already created in <#${data.ChannelID}>`,
                        ephemeral: true
                    })

                await guild.channels.create({ name: `music-request` }, {
                    type: "GUILD_TEXT",
                    permissionOverwrites: [{
                        id: guild.roles.everyone,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
                    }]
                }).then(async(channel) => {
                    const embed = new EmbedBuilder()
                        .setColor("Green")
                        .setDescription(`✅ Successfully created music channel: ${channel}`)

                    interaction.reply({ embeds: [embed] })

                    client.channels.cache.get(channel.id).send({
                        embeds: [queueEmbed(), playEmbed(client)],
                        components: [musicButton()]
                    }).then(async msg => {
                        await musicSchema.findOneAndUpdate(
                            { GuildID: guild.id }, 
                            { ChannelID: channel.id, EmbedID: msg.id }, 
                            { new: true, upsert:true }
                        );
                    })
                })
            })
        } catch (e) {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`An error occured: ${e}`)

            console.log(e)
            return message.reply({ embeds: [embed] })
        }
    }
}