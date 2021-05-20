const Canvas = require('canvas');

module.exports = {
    name: 'welcome',
    description: "welcoming a new member!",
    async execute(guildMember, Discord) {
        // Welcoming maessage
        const welcometext = 
        `**WELCOME TO RISE OF MONSTER SLAYER (S.S.S)**\n`+
        `Selamat datang ${guildMember.toString()}, **${guildMember.user.tag}**\n\n`+
        "**`- How To Become SSS Slayer`**\n"+
        `Silahkan menuju <#${process.env.RULES_ID}> untuk melihat langkah-langkahnya.\n\n`+
        "**`- Get Roles`**\n"+
        `Ambil beberapa role di <#${process.env.ROLES_ID}> seasuai dengan apa yang kamu mainkan.\n\n`+
        "**`- Greetings`**\n"+
        `Perkenalkan diri di <#${process.env.GREETINGS_ID}> biar akrab dengan yang lain.\n\n`+
        `**Let's Hunt Together & Happy Hunting!**\n`

        const canvas = Canvas.createCanvas(960, 540)
        const ctx = canvas.getContext('2d')
        let x = 0
        let y = 0

        // Load image background
        const background = await Canvas.loadImage(`img/welcome/welcome.png`)
        ctx.drawImage(background, x, y, canvas.width, canvas.height)

        ctx.strokeStyle = '#000000'
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Print welcome text
        ctx.fillStyle = '#ffffff'
        ctx.font = '70px sans-serif'
        let text = 'WELCOME'
        x = canvas.width / 2 - ctx.measureText(text).width / 2
        y = canvas.height / 2 + 170
        ctx.fillText(text, x, y)
        ctx.strokeText(text, x, y)

        // Print user tag
        ctx. font = '50px sans-serif'
        text = `${guildMember.user.tag}`
        x = canvas.width / 2 - ctx.measureText(text).width / 2
        y = canvas.height / 2 + 210
        ctx.fillText(text, x, y)
        ctx.strokeText(text, x, y)
        
        // Set Profile Picture
        const avatar = await Canvas.loadImage(guildMember.user.displayAvatarURL({ format: 'jpg' }))
        x = canvas.width / 2 - 100
        y = canvas.height / 2 - 100
        ctx.beginPath()
        ctx.arc(x + 100 , y + 100, 100, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, x, y, 200, 200)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
        const channel = guildMember.guild.channels.cache.get(process.env.WELCOME_ID)
        channel.send(welcometext, attachment)
    }
}