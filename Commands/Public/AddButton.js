const { ContextMenuCommandBuilder, ApplicationCommandType, SelectMenuBuilder, ActionRowBuilder, PermissionFlagsBits,  } = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Add Button")
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const { targetMessage, guild } = interaction

        const webhookId = targetMessage.webhookId
        const webhookAuthor = targetMessage.applicationId

        if (!webhookId || webhookId == client.user.id || webhookAuthor != client.user.id) {
            return interaction.reply({ 
                content: `Must use a message sent by a webhook that **${client.user.tag}** created.`,
                ephemeral: true,
            })
        }

        await guild.fetchWebhooks().then(hooks => {
            let webhooksArray = [];
            
            hooks.map(data => {
                if (data.id == webhookId) {
                    return webhooksArray.push(data.id, data.token)
                }
            })

            if (!webhooksArray) {
                return interaction.reply({ 
                    content: `Cannot edit messages because the webhook no longer exists.`,
                    ephemeral: true,
                })
            } else {
                const menu = new SelectMenuBuilder()
                    .setCustomId(`button-menu`)
                    .setPlaceholder(`Select a button type`)
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        { label: "🌐 Link", value: `link/${targetMessage.id}/${webhooksArray[0]}` },
                        { label: "📃 Rules", value: `rules/${targetMessage.id}/${webhooksArray[0]}` },
                    ]);
    
                interaction.reply({
                    content: "Please select the type of button you want to add to this message.",
                    components: [new ActionRowBuilder().addComponents(menu)],
                    ephemeral: true
                })
            }
        })
    }
}