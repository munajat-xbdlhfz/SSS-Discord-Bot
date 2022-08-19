const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js")

module.exports = {
    data: {
        name: `link-modal`
    },
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId("link-input")
            .setTitle("Set Custom Values");

        const label = new TextInputBuilder()
            .setCustomId("labelInput")
            .setLabel("Label")
            .setPlaceholder("The text displayed on the button itself.")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const link = new TextInputBuilder()
            .setCustomId("linkInput")
            .setLabel("Link")
            .setPlaceholder("The link that the button will take users to when it is clicked.")
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const firstRow = new ActionRowBuilder().addComponents(label)
        const secondRow = new ActionRowBuilder().addComponents(link)

        modal.addComponents(firstRow, secondRow)

        await interaction.showModal(modal)
    }
}