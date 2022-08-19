const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js")

module.exports = {
    data: {
        name: `webhook-menu`
    },
    async execute(interaction, client) {
        await interaction.deferUpdate();

        const { values } = interaction;

        const data = values[0].split("/");
        const webhookId = data[0];
        const webhookToken = data[1];
        
        const embed = new EmbedBuilder();
        const row = new ActionRowBuilder();
        
        await client.fetchWebhook(webhookId, webhookToken).then(webhook => {    

            embed
                .setTitle("Webhook URL")
                .setColor("Aqua")
                .setDescription(`||\`${webhook.url}\`||`)
                .addFields([
                    {
                        name: `⚠ Keep this secret!`,
                        value: `Someone with this URL can send any message they want to <#${webhook.channelId}>, including \`@everyone\` mentions.`,
                        inline: false,
                    },
                ]);

            if (webhook.applicationId == client.user.id) {
                embed.addFields([
                    {
                        name: `ℹ Usage`,
                        value: `You can use this webhook to send messages with Discohook just like normal, but since it was created by me, I can attach buttons to it afterwards.`,
                        inline: false,
                    },
                ]);
            }

            row.addComponents(
                new ButtonBuilder()
                    .setLabel(`Open in Discohook`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discohook.org/?data=eyJtZXNzYWdlcyI6W3siZGF0YSI6eyJjb250ZW50IjpudWxsLCJlbWJlZHMiOm51bGwsImF0dGFjaG1lbnRzIjpbXX19XX0`)
            );
            
            interaction.editReply({ 
                content: "",
                embeds: [embed], 
                components: [row] 
            });
        })
    }
}