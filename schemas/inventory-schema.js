const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const charactersSchema = mongoose.Schema({
    name: reqString,
    rarity: reqNumber,
    constelation: reqNumber
})

const weaponsSchema = mongoose.Schema({
    name: reqString,
    rarity: reqNumber,
    total: reqNumber
})

const inventorySchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    characters: [charactersSchema],
    weapons: [weaponsSchema]
})

module.exports = mongoose.model('inventory', inventorySchema)