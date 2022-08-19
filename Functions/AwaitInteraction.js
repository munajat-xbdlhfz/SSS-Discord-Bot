async function modalSubmitted(interaction, client) {
    await interaction.awaitModalSubmit({
        time: 60000,
        filter: i => i.user.id === interaction.user.id
    }).catch(error => {
        return null
    })
}

async function selectSubmitted(interaction, client) {
    await interaction.awaitSelectMenu({
        time: 60000,
        filter: i => i.user.id === interaction.user.id
    }).catch(error => {
        return null
    })
}

module.exports = {
    modalSubmitted,
    selectSubmitted,
}