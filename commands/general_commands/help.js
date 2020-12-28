module.exports = {
    name: 'help',
    description: 'explain user about bot command',
    execute (message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .setAuthor("S.S.S", "https://cdn.discordapp.com/attachments/732668771231334501/785610049925152799/sSs_Logo_White.png")
        .setDescription(
            `
            ✦ **Genshin Impact**
            Gacha and collect genshin impact characters and weapons.
            
            __**CLAIM PRIMOGEMS**__
            **$daily**: Claim your daily primogems (1600 primogems a day)
            **$weekly**: Claim your weekly primogems (16000 primogems a week)

            __**CHECK INVENTORY**__
            **$mycharacter**: Inventory of your characters.
            **$myweapons**: Inventory of your weapons.

            __**MAKE A WISH (GACHA)**__
            **$singlepull**: Gacha 1x.
            **$multipull**: Gacha 10x.

            __**UTILITY**__
            **$primogem**: Check  the remaining primogems.
            **$give @User <Primogems>**: (admin) Gift primogems to user.

            __**OPTIONS/FILTER LIST:**__
            List of flags (options/filters):
            **sp** (singlepull), **mp** (multipull)
            `
        )

        message.author.send(newEmbed)
        message.react("✅")
    }
}