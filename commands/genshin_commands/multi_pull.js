const { standardWish, assignItem } = require('../../functions/genshin')
const constants = require('../../constants')
const { getPrimogems, gacha } = require('../../functions/economy')

module.exports = {
    name : "multi_pull",
    description: "Make a multi pull",
    args: true,
    dmAllow: true,
    async execute (message, args, Discord, emoji) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const dataUser = await getPrimogems(guildId, userId)
        
        try {
            if (dataUser.primogems >= 1600) {
                const reward = []
                let ctr
                let msg
                let stardust = 0

                for (ctr = 0; ctr < 10; ctr += 1) {
                    const [tempReward, rarity] = standardWish(dataUser.pitty5Star, dataUser.pitty4Star)
                    msg = '`'
                    for (let i = 0; i < rarity; i += 1) { msg += '⭐' }
                    msg += ` ${tempReward}\``
                    reward.push(msg)

                    pushReward = assignItem(guildId, userId, tempReward, rarity)
                    stardust += pushReward
                    if (constants.generalBanner4Star.includes(tempReward)) { dataUser.pitty4Star = 0 }
                    if (constants.generalBanner5Star.includes(tempReward)) { dataUser.pitty5Star = 0 }

                    dataUser.pitty4Star += 1
                    dataUser.pitty5Star += 1
                }

                const currentPrimogems = dataUser.primogems - 1600
                const currentStardust = dataUser.stardust + stardust
                const updateDataUser = {
                    primogems: currentPrimogems,
                    stardust: currentStardust,
                    pitty5Star: dataUser.pitty5Star,
                    pitty4Star: dataUser.pitty4Star
                }

                const pullGacha = await gacha(guildId, userId, updateDataUser)
                const stardustEmoji = emoji("800622078193565758")
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .addFields(
                    {
                        name: 'Wanderlust Invocation - Standard Wish',
                        value: reward.sort().reverse().join('\n')+
                                `\n\nExtra masterless stardust **${stardust}**${stardustEmoji}`
                    },
                )

                mention = `<@${sender.id}>\n`
                message.channel.send(mention, newEmbed)
            } else {
                message.channel.send(`<@${sender.id}>, not enough primogem!`)
            }

            return
        } catch (err) { console.log(err) } 

        return
    }
}