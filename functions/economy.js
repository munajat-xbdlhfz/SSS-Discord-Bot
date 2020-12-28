const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')
const inventorySchema = require('../schemas/inventory-schema')

const primogemsCache = {}

const addPrimogems = async (guildId, userId, primogems) => {
    return await mongo().then(async (mongoose) => {
        try {
            const userData = {guildId, userId}
            const addPrimogems = {guildId, userId, $inc: { primogems }}
            const result = await profileSchema.findOneAndUpdate(userData, addPrimogems, {
                upsert: true,
                new: true
            })

            primogemsCache[`${guildId}-${userId}`] = {
                primogems: result.primogems,
                pitty5Star: result.pitty5Star,
                pitty4Star: result.pitty4Star
            }

            return result.primogems
        } finally {
            mongoose.connection.close()
        }
    })
}

const getPrimogems = async (guildId, userId) => {
    const cachedValue = primogemsCache[`${guildId}-${userId}`]
    if (cachedValue) {
        let primogems = cachedValue.primogems
        let pitty5Star = cachedValue.pitty5Star
        let pitty4Star = cachedValue.pitty4Star
        
        return {
            primogems,
            pitty5Star,
            pitty4Star
        }
    }
    
    return await mongo().then(async (mongoose) => {
        try {
            let primogems = 0
            let pitty5Star = 0
            let pitty4Star = 0
            const userData = {guildId, userId}
            const newUser = {guildId, userId, primogems, pitty5Star, pitty4Star}
            const result = await profileSchema.findOne(userData)

            if (result) {
                primogems = result.primogems
                pitty5Star = result.pitty5Star
                pitty4Star = result.pitty4Star
            } else {
                // Insert new user
                await new profileSchema(newUser).save()
                await new inventorySchema(userData).save()
            }

            primogemsCache[`${guildId}-${userId}`] = {
                primogems: primogems,
                pitty5Star: pitty5Star,
                pitty4Star: pitty4Star
            }

            return {
                primogems,
                pitty5Star,
                pitty4Star
            }
        } finally {
            mongoose.connection.close()
        }
    })
}

const gacha = async (guildId, userId, dataUser) => {
    return await mongo().then(async (mongoose) => {
        try {
            const primogems = dataUser.primogems
            const pitty5Star = dataUser.pitty5Star
            const pitty4Star = dataUser.pitty4Star
            const userData = {guildId, userId}
            const gacha = {guildId, userId, primogems, pitty5Star, pitty4Star}
            const result = await profileSchema.findOneAndUpdate(userData, gacha, {
                upsert: true,
                new: true
            })

            primogemsCache[`${guildId}-${userId}`] = {
                primogems: result.primogems,
                pitty5Star: result.pitty5Star,
                pitty4Star: result.pitty4Star
            }

            return result.primogems
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports = {
    addPrimogems,
    getPrimogems,
    gacha,
}