const { 
    ModalBuilder, TextInputBuilder, TextInputStyle,
    EmbedBuilder, ButtonBuilder, ButtonStyle,
    ActionRowBuilder, WebhookClient
} = require("discord.js")

const linkModal = require("../Buttons/link-modal")
const { timeout } = require("../../Functions/Timeout/ModalTimeout")
const { escapeMarkdown } = require("../../Functions/Markdown/EscapeMarkdown")

module.exports = {
    data: {
        name: "button-menu"
    },
    async execute(interaction, client) {
        const { values, guild } = interaction

        const options = values[0].split("/")
        const choice = options[0]
        const messageId = options[1]
        const webhookId = options[2]

        const buttonAdd = new ButtonBuilder()

        const embed = new EmbedBuilder()
            .setTitle(`${choice} Button Setup`)
            .setColor("Aqua")
            .setDescription("Please complete a custom label popup form.");

        const buttonModal = new ButtonBuilder()
            .setLabel("Set Custom Values")
            .setStyle(ButtonStyle.Secondary);

        switch (choice) {
            case "link": {
                await linkModal.execute(interaction, client)

                buttonModal.setCustomId("link-modal")

                await interaction.editReply({
                    content: "",
                    embeds: [embed],
                    components: [new ActionRowBuilder().addComponents(buttonModal)],
                    ephermal: true
                })

                const modalSubmit = await interaction.awaitModalSubmit({
                    time: 60000,
                    filter: i => i.user.id === interaction.user.id
                }).catch(() => {
                    return null
                })

                if (!modalSubmit) {
                    timeout(interaction, client)
                } else {
                    const labelInput = modalSubmit.fields.getTextInputValue("labelInput")
                    const linkInput = modalSubmit.fields.getTextInputValue("linkInput")

                    buttonAdd
                        .setLabel(labelInput)
                        .setURL(linkInput)
                        .setStyle(ButtonStyle.Link);

                    await guild.fetchWebhooks().then(hooks => {
                        hooks.map(data => {
                            if (data.id == webhookId)
                            return webhookToken = data.token
                        })
    
                        const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken })
      
                        webhookClient.editMessage(messageId, {
                            components: [new ActionRowBuilder().addComponents(buttonAdd)] 
                        })
                    })
                }
            }
            break;

            case "rules": {
                buttonAdd
                    .setCustomId(`rules-accept`)
                    .setLabel(`✔ Accept`)
                    .setStyle(ButtonStyle.Primary);

                await interaction.deferUpdate();
                await interaction.editReply({
                    content: "Success add rules button.",
                    embeds: [],
                    components: [],
                    ephermal: true
                })

                await guild.fetchWebhooks().then(hooks => {
                    hooks.map(data => {
                        if (data.id == webhookId)
                        return webhookToken = data.token
                    })
    
                    const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken })
      
                    webhookClient.editMessage(messageId, {
                        components: [new ActionRowBuilder().addComponents(buttonAdd)] 
                    })
                })
            }
            break;
        }
    }
}