module.exports = {
    name: 'help',
    description: 'explain user about bot command',
    execute (message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .setAuthor("S.S.S", "https://cdn.discordapp.com/attachments/732668771231334501/785610049925152799/sSs_Logo_White.png")
        .setDescription(
            `✦ **Genshin Impact**\n`+
            `Gacha and collect genshin impact characters and weapons.\n\n`+

            `__**CLAIM PRIMOGEMS**__\n`+
            `Claim daily will reset every day at 3:00AM (GMT+7), and claim weekly will reset on Monday at 3:00AM (GMT+7)\n`+
            `**$daily**: Claim your daily primogems (1600 primogems a day)\n`+
            `**$weekly**: Claim your weekly primogems (16000 primogems a week)\n\n`+

            `__**CHECK INVENTORY**__\n`+
            `**$mycharacters**: Inventory of your characters.\n`+
            `**$mycharacters @User**: Inventory of mentioned user characters.\n`+
            `**$myweapons**: Inventory of your weapons.\n`+
            `**$myweapons @User**: Inventory of mentioned user weapons.\n\n`+

            `__**MAKE A WISH (GACHA)**__\n`+
            `**$singlepull**: Gacha 1x.\n`+
            `**$multipull**: Gacha 10x.\n\n`+

            `__**UTILITY**__\n`+
            `**$primogems**: Check the remaining primogems.\n`+
            `**$primogems @User**: Check the remaining primogems of mentioned user.\n`+
            `**$give @User <Primogems>**: (admin) Give primogems to mentioned user.\n`+
            `**$giveall <Primogems>**: (admin) Give primogems to all user.\n\n`+

            `__**OPTIONS/FILTER LIST:**__\n`+
            `List of flags (options/filters):\n`+
            `**sp** (singlepull), **mp** (multipull), **mc** (mycharacters), **mw** (myweapons)\n`
        )

        message.author.send(newEmbed)
        message.react("✅")
    }
}