require("dotenv").config();

module.exports = {
    data: {
        name: "rules-accept"
    },
    async execute(interaction, client) {
        const { member } = interaction

        if (member.roles.cache.some(role => role.id === process.env.SSS_SLAYER_ROLE_ID)) {
            return interaction.reply({
                content: `You already have accepted the rules or have role <@&${process.env.SSS_SLAYER_ROLE_ID}>.`,
                ephemeral: true
            })
        }

        member.roles.add(process.env.SSS_SLAYER_ROLE_ID)
        
        return interaction.reply({
            content: `You have accepted the rules, now you have role <@&${process.env.SSS_SLAYER_ROLE_ID}>.`,
            ephemeral: true
        })
    }
}