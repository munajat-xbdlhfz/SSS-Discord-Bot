const { standardWish, assignItem } = require('../../functions/genshin')
const constants = require('../../constants')
const { getPrimogems, gacha } = require('../../functions/economy')
const Discord = require("discord.js");

module.exports = {
    name : "single_pull",
    description: "Make a single pull",
    args: true,
    dmAllow: true,
    async execute (message, args) {
        const sender = message.author;
        const guildId = message.guild.id
        const userId = sender.id
        const dataUser = await getPrimogems(guildId, userId)

        try {
            if (dataUser.primogems >= 160) {
                const [reward, rarity] = standardWish(dataUser.pitty5Star, dataUser.pitty4Star)
                msg = '`'
                for (let i = 0; i < rarity; i += 1) { msg += '⭐' }
                msg += ` ${reward}\``

                pushReward = assignItem(guildId, userId, reward, rarity)
                if (constants.generalBanner4Star.includes(reward)) { dataUser.pitty4Star = 0 }
                if (constants.generalBanner5Star.includes(reward)) { dataUser.pitty5Star = 0 }
                dataUser.pitty4Star += 1
                dataUser.pitty5Star += 1

                const currentPrimogems = dataUser.primogems - 160
                const updateDataUser = {
                    primogems: currentPrimogems,
                    pitty5Star: dataUser.pitty5Star,
                    pitty4Star: dataUser.pitty4Star
                }

                const pullGacha = await gacha(guildId, userId, updateDataUser)
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .addFields(
                    {
                        name: 'Wanderlust Invocation - Standard Wish',
                        value: msg
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