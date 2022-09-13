const { twitterPost } = require("../../Functions/Twitter/TwitterPost")
const Twit = require("twit")
require("dotenv").config()
const wait = require("node:timers/promises").setTimeout;

module.exports.name = "twitterEvent"

console.log("[Twitter] Node Twit connected.")

var twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
    timeout_ms: 60*1000
})

var stream = twitter.stream('statuses/filter', { follow: '306490355' })

stream.on('tweet', function(tweet) {
    try {
        if (!tweet.retweeted_status & !tweet.in_reply_to_user_id)
            return twitterPost(tweet)
    } catch (error) {
        console.log(`[Twitter] An error occured when sending a tweet (${error.message}).`)
    }
})

stream.on('error', async function (error) {
    console.log(`[Twitter] An error occured on Node Twit (${error.message}).`)
})