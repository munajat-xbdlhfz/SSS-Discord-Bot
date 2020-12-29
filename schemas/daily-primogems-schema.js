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

const dailyPrimogemsSchema = mongoose.Schema(
    {
        guildId: reqString,
        userId: reqString,
        claim: reqBool,
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('daily-primogems', dailyPrimogemsSchema)