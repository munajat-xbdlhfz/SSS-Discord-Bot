const mongo = require('../mongo')
const inventorySchema = require('../schemas/inventory-schema')
const profileSchema = require('../schemas/profile-schema')
const constants = require('../constants')
const fs = require('fs')

// Standard Wish Banner
const standardWish = (pitty5Star, pitty4Star) => {
    if (pitty5Star >= 90) {
        return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)], 5];
    }
    if (pitty4Star >= 10) {
        return Math.random() > 0.5
            ? [constants.generalBanner4StarCharacters[Math.floor(Math.random() * constants.generalBanner4StarCharacters.length)], 4]
            : [constants.generalBanner4StarWeapons[Math.floor(Math.random() * constants.generalBanner4StarWeapons.length)], 4];
    }

    const value = Math.random();
    if (value < 0.006) {
        return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)], 5];
    }
    if (value < 0.057) {
        return Math.random() > 0.5
            ? [constants.generalBanner4StarCharacters[Math.floor(Math.random() * constants.generalBanner4StarCharacters.length)], 4]
            : [constants.generalBanner4StarWeapons[Math.floor(Math.random() * constants.generalBanner4StarWeapons.length)], 4];
    }
    return [constants.weapons3Star[Math.floor(Math.random() * constants.weapons3Star.length)], 3];
}

// Save reward into database
const assignItem = async (guildId, userId, rwrd, rrty) => {
    if (constants.weapons3Star.includes(rwrd)) {
        const stardust3Star = 15
        return stardust3Star
    }

    return await mongo().then(async (mongoose) => {
        try {
            const userData = {guildId, userId}
            let stardust4Star = 30
            let stardust4StarC6 = 75
            let stardust5Star = 150
            let newCharWeapon = 0

            if (constants.characters.includes(rwrd)) {
                const checkReward = {guildId, userId, characters: { $elemMatch: { name: rwrd }}}
                const result = await inventorySchema.findOne(checkReward)

                if (result) {
                    let ctr
                    for (ctr = 0; ctr < result.characters.length; ctr += 1) {
                        if (result.characters[ctr].name === rwrd) {
                            if (result.characters[ctr].constelation < 6) {
                                const conste = result.characters[ctr].constelation + 1
                                const update = await inventorySchema.updateOne(checkReward, {
                                    $set: { "characters.$.constelation": conste }
                                })

                                if (rrty == 5) {
                                    return stardust5Star
                                } else if (rrty == 4) {
                                    return stardust4Star
                                }
                            } else {
                                if (rrty == 5) {
                                    return stardust5Star
                                } else if (rrty == 4) {
                                    return stardust4StarC6
                                }
                            }
                        } 
                    }
                } else {
                    const pushData = {$push: {
                        characters: [{
                            name: rwrd,
                            rarity: rrty,
                            constelation: 0
                        }]
                    }}
                    
                    const update = await inventorySchema.findOneAndUpdate(userData, pushData, {
                        upsert: true,
                        new: true
                    })
                    return newCharWeapon
                }
            } else if (constants.weapons.includes(rwrd)) {
                const checkReward = {guildId, userId, weapons: { $elemMatch: { name: rwrd }}}
                const result = await inventorySchema.findOne(checkReward)

                if (result) {
                    let ctr
                    for (ctr = 0; ctr < result.weapons.length; ctr += 1) {
                        if (result.weapons[ctr].name === rwrd) {
                            const total = result.weapons[ctr].total + 1
                            const update = await inventorySchema.updateOne(checkReward, {
                                $set: { "weapons.$.total": total }
                            })
                            
                            if (rrty == 5) {
                                return stardust5Star
                            } else if (rrty == 4) {
                                return stardust4Star
                            }
                        }
                    }
                } else {
                    const pushData = {$push: {
                        weapons: [{
                            name: rwrd,
                            rarity: rrty,
                            total: 1
                        }]
                    }}

                    const update = await inventorySchema.findOneAndUpdate(userData, pushData, {
                        upsert: true,
                        new: true
                    })
                    return newCharWeapon
                }
            }
        } catch (err) { console.log(err) }
    })
}

// Print user characters
const printCharacters = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            let output = ''
            let characters5Star = ''
            let characters4Star = ''
            const userData = {guildId, userId}
            const getCharacter = await inventorySchema.findOne(userData)
            let ctr
            for (ctr = 0; ctr < getCharacter.characters.length; ctr += 1) {
                if (getCharacter.characters[ctr].rarity === 5) {
                    characters5Star += `- ${getCharacter.characters[ctr].name} C${getCharacter.characters[ctr].constelation}\n`
                } else if (getCharacter.characters[ctr].rarity === 4) {
                    characters4Star += `- ${getCharacter.characters[ctr].name} C${getCharacter.characters[ctr].constelation}\n`
                }
            }

            if (characters5Star !== '') {
                output += '`???????????????`\n'
                output += '```fix\n'
                output += characters5Star
                output += '```\n'
            }

            if (characters4Star !== '') {
                output += '`????????????`\n'
                output += '```diff\n'
                output += characters4Star
                output += '```\n'
            }

            return output
        } catch (err) { console.log(err) } 
    })
}

// Print user weapons
const printWeapons = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            let output = ''
            let weapons5Star = ''
            let weapons4Star = ''
            const userData = {guildId, userId}
            const getCharacter = await inventorySchema.findOne(userData)
            let ctr
            for (ctr = 0; ctr < getCharacter.weapons.length; ctr += 1) {
                if (getCharacter.weapons[ctr].rarity === 5) {
                    weapons5Star += `- ${getCharacter.weapons[ctr].total}x ${getCharacter.weapons[ctr].name}\n`
                } else if (getCharacter.weapons[ctr].rarity === 4) {
                    weapons4Star += `- ${getCharacter.weapons[ctr].total}x ${getCharacter.weapons[ctr].name}\n`
                }
            }

            if (weapons5Star !== '') {
                output += '`???????????????`\n'
                output += '```fix\n'
                output += weapons5Star
                output += '```\n'
            }

            if (weapons4Star !== '') {
                output += '`????????????`\n'
                output += '```diff\n'
                output += weapons4Star
                output += '```\n'
            }

            return output
        } catch (err) { console.log(err) } 
    })
}

// Check Characters Elements
const checkCharactersElements = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            let pyro = 0
            let electro = 0
            let cryo = 0
            let hydro = 0
            let anemo = 0
            let geo = 0
            let dendro = 0
            const userData = {guildId, userId}
            const getCharacter = await inventorySchema.findOne(userData)
            const characterConstants = JSON.parse(fs.readFileSync('constants/characters.json', 'utf8'))
            let ctr
            for (ctr = 0; ctr < getCharacter.characters.length; ctr += 1) {
                const chr = characterConstants[getCharacter.characters[ctr].name]
                if (chr.element === 'pyro') {
                    pyro += 1
                } else if (chr.element === 'electro') {
                    electro += 1
                } else if (chr.element === 'cryo') {
                    cryo += 1
                } else if (chr.element === 'hydro') {
                    hydro += 1
                } else if (chr.element === 'anemo') {
                    anemo += 1
                } else if (chr.element === 'geo') {
                    geo += 1
                } else if (chr.element === 'dendro') {
                    dendro += 1
                }
            }

            return {
                pyro,
                electro,
                cryo,
                hydro,
                anemo,
                geo,
                dendro,
            }
        } catch (err) { console.log(err) }
    })
}

// Set User Namecard
const setNamecard = async (guildId, userId, character) => {
    return await mongo().then(async (mongoose) => {
        try {
            const path = `./img/${character}.jpg`
            const userData = {guildId, userId}
            const change = {guildId, userId, namecard: character}
            const newUser = {guildId, userId, primogems: 0, pitty5Star: 0, pitty4Star: 0, namecard: "default"}
            const getCharacter = await inventorySchema.findOne(userData)

            // Check if user have inventories
            if (!getCharacter) {
                await new inventorySchema(userData).save()
                const user = await profileSchema.findOne(userData)
                // Check if user have profile
                if (!user) {
                    await new profileSchema(newUser).save()
                }

                return false
            }

            // If user set namecard to default
            if (character === "default") {
                const set = await profileSchema.findOneAndUpdate(userData, change, {
                    upsert: true,
                    new: true
                })
                return true
            }

            // Check if namecard are exist
            if (fs.existsSync(path)) {
                for (ctr = 0; ctr < getCharacter.characters.length; ctr += 1) {
                    const char = getCharacter.characters[ctr].name.toLowerCase()
                    if (char === character) {
                        const set = await profileSchema.findOneAndUpdate(userData, change, {
                            upsert: true,
                            new: true
                        })
                        return true
                    }
                }
            } else {
                return false
            }
 
        } catch (err) { console.log(err) }
    })
}

// Get User Namecard
const getNamecard = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const userData = {guildId, userId}
            const newNamecard = {guildId, userId, namecard: "default"}
            const get = await profileSchema.findOne(userData)
            if (!get.namecard) {
                const set = await profileSchema.findOneAndUpdate(userData, newNamecard, {
                    upsert: true,
                    new: true
                })

                return "default"
            }
            return get.namecard
        } catch (err) { console.log(err) }
    })
}

module.exports = {
    standardWish,
    assignItem,
    printCharacters,
    printWeapons,
    checkCharactersElements,
    setNamecard,
    getNamecard,
}