const { twitterPost } = require("../../Functions/TwitterPost")
const Twitter = require("twitter")

require("dotenv").config();

module.exports.name = "twitterEvent"

const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
})

twitter.stream('statuses/filter', { follow: '2301111102' }, async function(stream) {
    await stream.on("data", function(tweet) {
        try {
            if (!tweet.retweeted_status & !tweet.in_reply_to_user_id)
                return twitterPost(tweet)
        } catch (error) {
            console.log(`An error occured on stream.on: 'data'\n${error}`)
        }
    })

    await stream.on('error', function(error) {
        console.log(`An error occured on stream.on: 'error'`);
        throw error;
    });
})