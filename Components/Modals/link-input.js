const { EmbedBuilder } = require("discord.js")

const { escapeMarkdown } = require("../../Functions/EscapeMarkdown")

module.exports = {
    data: {
        name: "link-input"
    },
    async execute(interaction, client) {
        await interaction.deferUpdate();

        const label = interaction.fields.getTextInputValue("labelInput")
        const link = interaction.fields.getTextInputValue("linkInput")

        const embed = new EmbedBuilder()
            .setTitle(`Link Button Setup`)
            .setColor("Aqua")
            .setDescription(
                `**1.** Select Button Type: **Link**\n`+
                `**2.** Set Label: **${escapeMarkdown(label)}**\n`+
                `**3.** Set Link: ${link}\n`
            );

        await interaction.editReply({ 
            content: "",
            embeds: [embed], 
            components: [] 
        });
    }
}