const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')
const dailyPrimogemsSchema = require('../schemas/daily-primogems-schema')
const weeklyPrimogemsSchema = require('../schemas/weekly-primogems-schema')
const inventorySchema = require('../schemas/inventory-schema')
const ms = require('parse-ms')

const claimDaily = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            let msg
            const timeout = 86400000
            const primogems = 1600
            const userData = {guildId, userId}
            const claim = {guildId, userId, $inc: { primogems }}
            const newUser = {guildId, userId, primogems, pitty5Star: 0, pitty4Star: 0}
            const result = await dailyPrimogemsSchema.findOne(userData)

            if (result) {
                // check if user already claim daily primogem
                const then = new Date(result.updatedAt).getTime()
                const now = new Date().getTime()
                if (timeout - (now - then) > 0) {
                    const time = ms(timeout - (now - then))
                    msg = `you've already claim your daily primogems. Come back in **${time.hours}h ${time.minutes}m.**`
                    return msg
                }
            }
            
            await dailyPrimogemsSchema.findOneAndUpdate(userData, userData, {
                upsert: true
            })

            const give = await profileSchema.findOne(userData)
            if (give) {
                // Give daily peimogems
                const daily = await profileSchema.findOneAndUpdate(userData, claim, {
                    upsert: true,
                    new: true
                })
            } else {
                // Inserting new user
                await new profileSchema(newUser).save()
                await new inventorySchema(userData).save()
            }

            msg = `you have claimed ${primogems} ✦`
            return msg
        } catch (err) { console.log(err) } 
    })
}

const claimWeekly = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            let msg
            const timeout = 86400000 * 7
            const primogems = 16000
            const userData = {guildId, userId}
            const claim = {guildId, userId, $inc: { primogems }}
            const newUser = {guildId, userId, primogems, pitty5Star: 0, pitty4Star: 0}
            const result = await weeklyPrimogemsSchema.findOne(userData)

            if (result) {
                // check if user already claim weekly primogem
                const then = new Date(result.updatedAt).getTime()
                const now = new Date().getTime()
                if (timeout - (now - then) > 0) {
                    const time = ms(timeout - (now - then))
                    msg = `you've already claim your weekly primogems. Come back in **${time.days}d ${time.hours}h ${time.minutes}m.**`
                    return msg
                }
            }
            
            await weeklyPrimogemsSchema.findOneAndUpdate(userData, userData, {
                upsert: true
            })

            const give = await profileSchema.findOne(userData)
            if (give) {
                // Give weekly peimogems
                const daily = await profileSchema.findOneAndUpdate(userData, claim, {
                    upsert: true,
                    new: true
                })
            } else {
                // Inserting new user
                await new profileSchema(newUser).save()
                await new inventorySchema(userData).save()
            }

            msg = `you have claimed ${primogems} ✦`
            return msg
        } catch (err) { console.log(err) } 
    })
}

module.exports = {
    claimDaily,
    claimWeekly
}