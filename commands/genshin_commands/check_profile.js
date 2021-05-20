const { checkCharactersElements, getNamecard } = require('../../functions/genshin')
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
        const dataUser = await getPrimogems(guildId, userId)
        const element = await checkCharactersElements(guildId, userId)
        const namecard = await getNamecard(guildId, userId)
        Canvas.registerFont('fonts/HYWenHei.ttf', { family: 'HYWenHei', style: 'Heavy', weight: 'Normal' });
        try {
            const canvas = Canvas.createCanvas(800, 400)
            const ctx = canvas.getContext('2d')

            const background = await Canvas.loadImage(`img/genshin/${namecard}.jpg`)
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

            ctx.strokeStyle = '#74037b'
            ctx.strokeRect(0, 0, canvas.width, canvas.height)

            // Print user name
            ctx.font = '32px HYWenHei'
            ctx.fillStyle = 'rgb(236, 229, 216)'
            ctx.fillText(sender.username, 285, 95)

            // Print user ID
            ctx.font = '15px HYWenHei'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`ID: ${message.author.id}`, 126, 272)

            // Print Pity
            ctx.font = '32px HYWenHei'
            ctx.fillStyle = 'rgb(236, 229, 216)'
            ctx.fillText(`Pity`, 320, 168)
            
            ctx.textAlign = 'end'
            ctx.fillText(`${dataUser.pitty5Star}`, 720, 168)

            // Print Primogems
            ctx.textAlign = 'end'
            ctx.fillStyle = '#ffffff'
            ctx.font = '24px HYWenHei'
            ctx.fillText(`${dataUser.primogems}`, 770, 222)

            // Print Masterless Stardust
            ctx.textAlign = 'end'
            ctx.fillStyle = '#ffffff'
            ctx.font = '24px HYWenHei'
            ctx.fillText(`${dataUser.stardust}`, 586, 222)

            // Print Pyro
            ctx.font = '20px HYWenHei'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Pyro`, 58, 373)
            ctx.fillText(`${element.pyro}`, 58, 397)

            // Print Hydro
            ctx.font = '20px HYWenHei'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Hydro`, 172, 373)
            ctx.fillText(`${element.hydro}`, 172, 397)

            // Print Anemo
            ctx.font = '20px HYWenHei'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Anemo`, 290, 373)
            ctx.fillText(`${element.anemo}`, 290, 397)

            // Print Electro
            ctx.font = '20px HYWenHei'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Electro`, 404, 373)
            ctx.fillText(`${element.electro}`, 404, 397)

            // Print Dendro
            ctx.font = '20px HYWenHei'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Dendro`, 517, 373)
            ctx.fillText(`${element.dendro}`, 517, 397)

            // Print Cryo
            ctx.font = '20px HYWenHei'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Cryo`, 631, 373)
            ctx.fillText(`${element.cryo}`, 631, 397)

            // Print Geo
            ctx.font = '20px HYWenHei'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Geo`, 741, 373)
            ctx.fillText(`${element.geo}`, 741, 397)

            // Set Profile Picture
            ctx.beginPath();
            ctx.arc(124, 131, 98, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 24, 31, 200, 200);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'my-profile-image.png');
            message.channel.send(`Here is your profile, ${message.member}!`, attachment);
        } catch (err) { console.log(err) } 

        return
    }
}