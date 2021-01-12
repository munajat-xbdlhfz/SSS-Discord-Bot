const { checkCharactersElements } = require('../../functions/genshin')
const { getPrimogems} = require('../../functions/economy')
const fs = require('fs')
const Canvas = require('canvas');

module.exports = {
    name : "check_profile",
    description: "Check user profile",
    args: true,
    dmAllow: true,
    async execute (message, args, Discord) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const element = await checkCharactersElements(guildId, userId)
        const dataUser = await getPrimogems(guildId, userId)
        Canvas.registerFont('fonts/HYWenHei.ttf', { family: 'HYWenHei', style: 'Heavy', weight: 'Normal' });
        try {
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');

            const background = await Canvas.loadImage('img/playerinfo.jpg');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Print name
            ctx.font = '27px HYWenHei';
            ctx.fillStyle = 'rgb(236, 229, 216)';
            ctx.fillText(sender.username, 282, 59);

            // Print Pity
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${dataUser.pitty5Star}`, 610, 100);

            // Print Primogems
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${dataUser.primogems}`, 610, 138);

            // Print Anemo
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${element.anemo}`, 345, 185);

            // Print Dendro
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${element.dendro}`, 515, 185);

            // Print Geo
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${element.geo}`, 685, 185);

            // Print Pyro
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${element.pyro}`, 345, 230);

            // Print Hydro
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${element.hydro}`, 460, 230);

            // Print Electro
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${element.electro}`, 575, 230);

            // Print Cryo
            ctx.textAlign = 'end';
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px HYWenHei';
            ctx.fillText(`${element.cryo}`, 685, 230);

            // Set Profile Picture
            ctx.beginPath();
            ctx.arc(127, 127, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 27, 27, 200, 200);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'my-profile-image.png');
            message.channel.send(`Here is your profile, ${message.member}!`, attachment);
        } catch (err) { console.log(err) } 

        return
    }
}