const { 
    Client, 
    ChatInputCommandInteraction,  
    EmbedBuilder,
    AttachmentBuilder, 
    WebhookClient,
    ButtonBuilder, 
    ButtonStyle,
    ActionRowBuilder
} = require("discord.js")
const Canvas =  require("@napi-rs/canvas");
require("dotenv").config();

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {ChatInputCommandInteraction} intearction 
     * @param {Client} client 
     */
    async execute(intearction, client) {
        const { user, guild } = intearction

        const webhook = new WebhookClient({ url: process.env.WELCOME_WEBHOOK_URL });

        let fontSize = 50;
        const canvas = Canvas.createCanvas(960, 540);
        const context = canvas.getContext("2d");
        const background = await Canvas.loadImage('./Structures/Images/welcome.png');
        Canvas.GlobalFonts.registerFromPath('./Fonts/HYWenHei.ttf')

        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Set Text Stroke
        context.shadowColor = "BLACK";
        context.shadowBlur = 10;
        context.strokeStyle = "#9B59B6";
        context.strokeRect(0, 0, canvas.width, canvas.height);

        // Print Welcome Text
        context.font = "70px HYWenHei";
        context.textAlign = "center";
        context.fillStyle = "#FFFFFF";
        context.fillText("WELCOME", canvas.width / 2, canvas.height / 1.22);

        // Print Usertag Text
        do {
            context.font = `${fontSize -= 10}px HYWenHei`;
        } while (context.measureText(`${user.tag}`).width > canvas.width);
        context.fillText(user.tag.toUpperCase(), canvas.width / 2, canvas.height / 1.1);

        // Set Profile Picture
        let x = canvas.width / 2 - 100
        let y = canvas.height / 2 - 100
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: "png" }));

        context.beginPath();
        context.arc(x + 100, y + 100, 100, 0, Math.PI * 2, true);
        context.lineWidth = 15;
        context.shadowBlur = 0;
        context.strokeStyle = '#FFFFFF';
        context.stroke();
        context.closePath();
        context.clip();
        context.drawImage(avatar, x, y, 200, 200);

        const buffer = canvas.toBuffer('image/png')
        const attachment = new AttachmentBuilder(buffer, { name: 'welcome.png' });

        // Proceed Button
        const proceedButton = new ButtonBuilder()
            .setLabel("Proceed")
            .setURL(process.env.RULES_LINK)
            .setStyle(ButtonStyle.Link)

        // Set Welcome Embed
        const welcome = new EmbedBuilder()
        .setColor("Aqua")
        .setAuthor({ name: `WELCOME TO ${guild.name.toUpperCase()}`, iconURL: guild.iconURL() })
        .setDescription(
            `Pastikan untuk mengklik button yang ada di bawah ini untuk membaca rules server **${guild.name.toUpperCase()}** dan mengambil role member!\n\n`+
            `**Let's Hunt Together & Happy Hunting!**`
        )
        .setImage(`attachment://welcome.png`)
        .setTimestamp()
        .setFooter({ text: `Member #${guild.memberCount}`});

        await webhook.send({
            content: `Welcome ${user} **(${user.tag})**,`, 
            embeds: [welcome], 
            files: [attachment],
            components: [new ActionRowBuilder().addComponents(proceedButton)]
        });
    }
}