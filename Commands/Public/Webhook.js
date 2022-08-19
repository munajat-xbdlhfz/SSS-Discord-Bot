const { 
    SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, 
    ButtonStyle, ButtonInteraction, SelectMenuBuilder, PermissionFlagsBits 
} =  require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("webhook")
    .setDescription("Webhook commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand => 
        subcommand
            .setName("create")
            .setDescription("Create a webhook")
            .addStringOption(option => 
                option.setName("name").setDescription("The webhook's name").setRequired(true)    
            )
    )
    .addSubcommand(subcommand => 
        subcommand.setName("url").setDescription("Get a webhook's URL")
    ),
        /**
         * 
         * @param {ButtonInteraction} interaction 
         */
    async execute(interaction, client) {
        const { channel, options, guild } = interaction;

        const subCommands = options.getSubcommand();
        const webhookName = options.getString("name")

        const embed = new EmbedBuilder();
        const row = new ActionRowBuilder();
        const webhookMenu = new SelectMenuBuilder();

        switch (subCommands) {
            case "create": {
                channel.createWebhook({
                    name: webhookName,
                }).then(webhook => {
                    embed
                        .setTitle("Webhook Created")
                        .setColor("Aqua")
                        .setDescription(`||\`${webhook.url}\`||`)
                        .addFields([
                            {
                                name: `ℹ Usage`,
                                value: `You can use this webhook to send messages with Discohook just like normal, but since it was created by me, I can attach buttons to it afterwards.`,
                                inline: false,
                            },
                            {
                                name: `⚠ Keep this secret!`,
                                value: `Someone with this URL can send any message they want to <#${channel.id}>, including \`@everyone\` mentions.`,
                                inline: false,
                            },
                        ]);

                    row.addComponents(
                        new ButtonBuilder()
                            .setLabel(`Open in Discohook`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(`https://discohook.org/?data=eyJtZXNzYWdlcyI6W3siZGF0YSI6eyJjb250ZW50IjpudWxsLCJlbWJlZHMiOm51bGwsImF0dGFjaG1lbnRzIjpbXX19XX0`)
                    );

                    interaction.reply({ embeds: [embed], components: [row],  ephemeral: true });
                })
            }
            break;

            case "url": {
                guild.fetchWebhooks().then(hooks => {
                    webhookMenu
                        .setCustomId(`webhook-menu`)
                        .setPlaceholder(`Select a webhook name`)
                        .setMinValues(1)
                        .setMaxValues(1);

                    hooks.map(data => {
                        const channelInfo = client.channels.cache.get(data.channelId)

                        if (!data.owner.bot || data.owner.id == client.user.id)
                            webhookMenu.addOptions([{ 
                                label: `${data.name} (${channelInfo.name}) | ${data.owner.username}`, 
                                value: `${data.id}/${data.token}` 
                            }])
                    })
                    
                    row.addComponents(webhookMenu)

                    interaction.reply({ 
                        content: "Please select the webhook name you want to get webhook url.",
                        components: [row], 
                        ephemeral: true 
                    })
                })
            }
            break;
        }
    }
}