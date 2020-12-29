const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqBool = {
    type: Boolean,
    default: false,
    required: true
}

const weeklyPrimogemsSchema = mongoose.Schema(
    {
        guildId: reqString,
        userId: reqString,
        claim: reqBool,
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('weekly-primogems', weeklyPrimogemsSchema)