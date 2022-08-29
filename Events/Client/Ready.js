const { Client, ActivityType } = require("discord.js")
require("dotenv").config();

const mongoose = require("mongoose");
const database = process.env.DATABASE_URL;

// function keepAlive() {
//     console.log("Heroku-SSS: running keepAlive.")
// }

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(`Client logged in as ${client.user.username}`);
        client.user.setActivity('S.S.S Server', { type: ActivityType.Watching });
        client.manager.init(client.user.id);

        if (!database) return;

        mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Client connected to database!");
        }).catch((err) => console.log(err));

        // console.log("I will visit myself every 20 minutes to prevent this bot from sleeping after 30 minutes of inactivity.")
        // setInterval(keepAlive, 20*60*1000)
    }
}