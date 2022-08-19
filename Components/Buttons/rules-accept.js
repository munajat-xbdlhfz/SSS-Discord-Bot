module.exports = {
    data: {
        name: "rules-accept"
    },
    async execute(interaction, client) {
        const { member } = interaction

        if (member.roles.cache.some(role => role.id === "1004392826534109205")) {
            return interaction.reply({
                content: "You already have accepted the rules or have role <@&1004392826534109205>.",
                ephemeral: true
            })
        }

        member.roles.add("1004392826534109205")
        
        return interaction.reply({
            content: "You have accepted the rules, now you have role <@&1004392826534109205>.",
            ephemeral: true
        })
    }
}