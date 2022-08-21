const { Client, ChatInputCommandInteraction, EmbedBuilder, WebhookClient } = require("discord.js")
require("dotenv").config();

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { user, guild } = interaction

        const webhook = new WebhookClient({ url: process.env.GOODBYE_WEBHOOK_URL });

        const goodbye = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL() })
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`**${interaction.displayName}** has left the community.`)
            .addFields([
                { name: `Server Member Since`, value: `📅 <t:${parseInt(interaction.joinedTimestamp / 1000)}:F>` },
                { name: `Latest Member Count`, value: `👥 **${guild.memberCount}** members in server.` },
            ])
            .setFooter({ text: `ID: ${user.id}` });

        webhook.send({ embeds: [goodbye] });
    }
}