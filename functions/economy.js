const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')
const inventorySchema = require('../schemas/inventory-schema')

const addPrimogems = async (guildId, userId, primogems) => {
    return await mongo().then(async (mongoose) => {
        try {
            const userData = {guildId, userId}
            const addPrimogems = {guildId, userId, $inc: { primogems }}
            const result = await profileSchema.findOneAndUpdate(userData, addPrimogems, {
                upsert: true,
                new: true
            })

            return result.primogems
        } catch (err) { console.log(err) } 
    })
}

const giveAllPrimogems = async (guildId, primogems) => {
    return await mongo().then(async (mongoose) => {
        try {
            const addPrimogems = {guildId, $inc: { primogems }}
            const result = await profileSchema.updateMany({ guildId }, addPrimogems, {
                upsert: true,
                new: true
            })
        } catch (err) { console.log(err) }
    })
}

const getPrimogems = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            let primogems = 0
            let stardust = 0
            let pitty5Star = 0
            let pitty4Star = 0
            let namecard = "default"
            const userData = {guildId, userId}
            const newUser = {guildId, userId, primogems, stardust, pitty5Star, pitty4Star, namecard}
            const result = await profileSchema.findOne(userData)

            if (result) {
                primogems = result.primogems
                stardust = result.stardust
                pitty5Star = result.pitty5Star
                pitty4Star = result.pitty4Star
            } else {
                // Insert new user
                await new profileSchema(newUser).save()
                await new inventorySchema(userData).save()
            }

            return {
                primogems,
                stardust,
                pitty5Star,
                pitty4Star
            }
        } catch (err) { console.log(err) } 
    })
}

const buyPrimogems = async (guildId, userId, strdst) => {
    return await mongo().then(async (mongoose) => {
        try {
            const mulll = strdst / 75
            const primogems = 160 * mulll
            const userData = {guildId, userId}
            const buyPrimogems = {guildId, userId, $inc: { primogems , stardust: -(strdst)}}
            const result = await profileSchema.findOneAndUpdate(userData, buyPrimogems, {
                upsert: true,
                new: true
            })

            return result.primogems
        } catch (err) { console.log(err) }
    })
}

const gacha = async (guildId, userId, dataUser) => {
    return await mongo().then(async (mongoose) => {
        try {
            const primogems = dataUser.primogems
            const stardust = dataUser.stardust
            const pitty5Star = dataUser.pitty5Star
            const pitty4Star = dataUser.pitty4Star
            const userData = {guildId, userId}
            const gacha = {guildId, userId, primogems, stardust, pitty5Star, pitty4Star}
            const result = await profileSchema.findOneAndUpdate(userData, gacha, {
                upsert: true,
                new: true
            })

            return result.primogems
        } catch (err) { console.log(err) } 
    })
}

module.exports = {
    addPrimogems,
    getPrimogems,
    gacha,
    giveAllPrimogems,
    buyPrimogems,
}