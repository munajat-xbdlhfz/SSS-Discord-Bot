const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')
const dailyPrimogemsSchema = require('../schemas/daily-primogems-schema')
const weeklyPrimogemsSchema = require('../schemas/weekly-primogems-schema')
const inventorySchema = require('../schemas/inventory-schema')
const ms = require('parse-ms')
const cron = require('node-cron')

// RESET DAILY CLAIM AT 3:00 AM
cron.schedule('0 3 * * 0-6', async () => {
    return await mongo().then(async (mongoose) => {
        try {
            const time = {userId:"TIME_RESET"}
            // SET NEW DAILY TIME
            await dailyPrimogemsSchema.findOneAndUpdate(time, time, {
                upsert: true
            })

            // RESET CLAIM ALL USER
            await dailyPrimogemsSchema.updateMany({claim: true}, {claim: false}, {
                upsert: true
            })  
        } catch (err) { console.log(err) }
    })
}, {
    scheduled: true,
    timezone: "Asia/Jakarta"
})

// RESET WEEKLY CLAIM ON MONDAY AT 3:00 AM
cron.schedule('0 3 * * Monday', async () => {
    return await mongo().then(async (mongoose) => {
        try {
            const time = {userId:"TIME_RESET"}
            // SET NEW WEEKLY TIME
            await weeklyPrimogemsSchema.findOneAndUpdate(time, time, {
                upsert: true
            })

            // RESET CLAIM ALL USER
            await weeklyPrimogemsSchema.updateMany({claim: true}, {claim: false}, {
                upsert: true
            })  
        } catch (err) { console.log(err) }
    })
}, {
    scheduled: true,
    timezone: "Asia/Jakarta"
})

const claimDaily = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            let msg
            const timeout = 86400000
            const primogems = 1600
            const userData = {guildId, userId}
            const updateData = {guildId, userId, claim: true}
            const resetTime = {userId:"TIME_RESET"}
            const claim = {guildId, userId, $inc: { primogems }}
            const newUser = {guildId, userId, primogems, pitty5Star: 0, pitty4Star: 0, namecard: "default"}
            
            const result = await dailyPrimogemsSchema.findOne(userData)
            const resetClaim = await dailyPrimogemsSchema.findOne(resetTime)

            if (result) {
                // check if user already claim daily primogem
                if (result.claim === true) {
                    const then = new Date(resetClaim.updatedAt).getTime()
                    const now = new Date().getTime()
                    
                    const time = ms(timeout - (now - then))
                    minutes = time.minutes + 1
                    if (minutes === 60) {
                        msg = `you've already claim your daily primogems. Come back in **${time.hours+1}h 0m.**`
                    } else {
                        msg = `you've already claim your daily primogems. Come back in **${time.hours}h ${time.minutes+1}m.**`
                    }
                   
                    return msg
                }
            }
            
            await dailyPrimogemsSchema.findOneAndUpdate(userData, updateData, {
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
            const updateData = {guildId, userId, claim: true}
            const resetTime = {userId:"TIME_RESET"}
            const claim = {guildId, userId, $inc: { primogems }}
            const newUser = {guildId, userId, primogems, pitty5Star: 0, pitty4Star: 0, namecard: "default"}
            
            const result = await weeklyPrimogemsSchema.findOne(userData)
            const resetClaim = await weeklyPrimogemsSchema.findOne(resetTime)

            if (result) {
                // check if user already claim weekly primogem
                if (result.claim === true) {
                    const then = new Date(resetClaim.updatedAt).getTime()
                    const now = new Date().getTime()
                    
                    const time = ms(timeout - (now - then))
                    hours = time.hours + 1
                    minutes = time.minutes + 1
                    if (hours === 24 && minutes === 60) {
                        msg = `you've already claim your weekly primogems. Come back in **${time.days+1}d 0h 0m.**`
                    } else if (minutes === 60) {
                        msg = `you've already claim your weekly primogems. Come back in **${time.days}d ${time.hours+1}h 0m.**`
                    } else {
                        msg = `you've already claim your weekly primogems. Come back in **${time.days}d ${time.hours}h ${time.minutes+1}m.**`
                    }
                   
                    return msg
                }
            }
            
            await weeklyPrimogemsSchema.findOneAndUpdate(userData, updateData, {
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