const { standardWish, assignItem } = require('../../functions/genshin')
const constants = require('../../constants')
const { getPrimogems, gacha } = require('../../functions/economy')

module.exports = {
    name : "single_pull",
    description: "Make a single pull",
    args: true,
    dmAllow: true,
    async execute (message, args, Discord, emoji) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const dataUser = await getPrimogems(guildId, userId)

        try {
            if (dataUser.primogems >= 160) {
                let stardust = 0
                const [reward, rarity] = standardWish(dataUser.pitty5Star, dataUser.pitty4Star)
                msg = '`'
                for (let i = 0; i < rarity; i += 1) { msg += '⭐' }
                msg += ` ${reward}\``

                pushReward = await assignItem(guildId, userId, tempReward, rarity)
                stardust += pushReward
                if (constants.generalBanner4Star.includes(reward)) { dataUser.pitty4Star = 0 }
                if (constants.generalBanner5Star.includes(reward)) { dataUser.pitty5Star = 0 }

                dataUser.pitty4Star += 1
                dataUser.pitty5Star += 1

                const currentPrimogems = dataUser.primogems - 160
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
                        value: `${msg}\n\n`+
                                `Extra masterless stardust **${stardust}**${stardustEmoji}`
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