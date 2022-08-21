const { 
    SlashCommandBuilder, 
    CommandInteraction,
    AttachmentBuilder
 } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
require("dotenv").config();

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("emit")
        .setDescription("Emit guild member add")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const canvas = Canvas.createCanvas(960, 540);
        const context = canvas.getContext("2d");

        const background = await Canvas.loadImage('./Structures/Images/welcome.png');

        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

        await interaction.reply({
            files: [attachment]
        });
    }
}