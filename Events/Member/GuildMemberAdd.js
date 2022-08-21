const { 
    Client, 
    CommandInteraction, 
    ChatInputCommandInteraction,  
    EmbedBuilder,
    AttachmentBuilder, 
    GuildMember,
    WebhookClient
} = require("discord.js")
const Canvas = require("canvas")
require("dotenv")

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {ChatInputCommandInteraction} intearction 
     * @param {Client} client 
     */
    async execute(intearction, client) {
        const { user, guild } = intearction

        // TEST SENDING CONSOLE.LOG 1
        console.log("EXECUTE 1")

        const webhook = new WebhookClient({ url: process.env.WELCOME_WEBHOOK_URL });

        Canvas.registerFont('./Fonts/HYWenHei.ttf', { family: 'HYWenHei', style: 'Heavy', weight: 'Bold' })
        const canvas = Canvas.createCanvas(960, 540);
        let fontSize = 50;
        const ctx = canvas.getContext("2d");

        // TEST SENDING CONSOLE.LOG 2
        console.log("EXECUTE 2")

        // Load Image Background
        const background = await Canvas.loadImage("./Structures/Images/welcome.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.shadowColor = "BLACK";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "#9B59B6";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Print Welcome Text
        ctx.font = "70px HYWenHei";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("WELCOME", canvas.width / 2, canvas.height / 1.22);

        // Print Usertag Text
        do {
            ctx.font = `${fontSize -= 10}px HYWenHei`;
        } while (ctx.measureText(`${user.tag}`).width > canvas.width);
        ctx.fillText(user.tag.toUpperCase(), canvas.width / 2, canvas.height / 1.1);

        // Set Profile Picture
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: "png" }));

        let x = canvas.width / 2 - 100
        let y = canvas.height / 2 - 100
        ctx.beginPath();
        ctx.arc(x + 100, y + 100, 100, 0, Math.PI * 2, true);
        ctx.lineWidth = 15;
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, x, y, 200, 200);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome.png' });

        // TEST SENDING CONSOLE.LOG 3
        console.log("EXECUTE 3")

        // Set Welcome Embed
        const welcome = new EmbedBuilder()
        .setColor("Aqua")
        .setAuthor({ name: `WELCOME TO ${guild.name.toUpperCase()}`, iconURL: user.displayAvatarURL({ format: "png" }) })
        .setDescription(
            `Selamat datang ${user} di **${guild.name}** Discord Server!\n`+
            `Pastikan untuk memeriksa channel yang di tandai di bawah!\n`+
            `**Let's Hunt Together & Happy Hunting!**`
        )
        .addFields([
            { name: `📖 Rules`, value: `<#${process.env.RULES_CHANNEL_ID}>`, inline: true },
            { name: `🎮 Get Roles`, value: `<#${process.env.ROLES_CHANNEL_ID}>`, inline: true },
            { name: `🤝 Greetings`, value: `<#${process.env.GREETINGS_CHANNEL_ID}>`, inline: true },
        ])
        .setImage(`attachment://welcome.png`)
        .setTimestamp()
        .setFooter({ text: `Member #${guild.memberCount}`, iconURL: guild.iconURL() });

        // TEST SENDING CONSOLE.LOG 4
        console.log("EXECUTE 4")

        await webhook.send({
            content: `Welcome ${user} **(${user.tag})**,`, 
            embeds: [welcome], 
            files: [attachment]
        }).catch((err) => console.log(err));
    }
}