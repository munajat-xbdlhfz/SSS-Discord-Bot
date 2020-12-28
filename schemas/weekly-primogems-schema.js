const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const weeklyPrimogemsSchema = mongoose.Schema(
    {
        guildId: reqString,
        userId: reqString
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('weekly-primogems', weeklyPrimogemsSchema)