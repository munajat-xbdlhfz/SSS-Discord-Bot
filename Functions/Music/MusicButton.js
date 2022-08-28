const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")

async function musicButton() {
    const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("music-pause").setStyle(ButtonStyle.Success).setEmoji("⏯"),
        new ButtonBuilder().setCustomId("music-skip").setStyle(ButtonStyle.Primary).setEmoji("⏭"),
        new ButtonBuilder().setCustomId("music-repeat").setStyle(ButtonStyle.Primary).setEmoji("🔁"),
        new ButtonBuilder().setCustomId("music-shuffle").setStyle(ButtonStyle.Primary).setEmoji("🔀"),
        new ButtonBuilder().setCustomId("music-stop").setStyle(ButtonStyle.Danger).setEmoji("⏹"),
    )

    return button
}

module.exports = { musicButton }