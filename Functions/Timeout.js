function timeout(interaction, client) {
    return interaction.editReply({
        content: `This message has timed out after 1 minutes.`,
        embeds: [],
        components: [],
        ephermal: true
    })
}

module.exports = { timeout }