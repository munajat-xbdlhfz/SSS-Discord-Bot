const { EmbedBuilder, WebhookClient } = require("discord.js")

require("dotenv").config();

function twitterPost(tweet) {
    try {
        let media, text;

        if (!tweet.extended_tweet) {
            media = tweet.entities.media;
            text = tweet.text;
        } else {
            media = tweet.extended_tweet.entities.media;
            text = tweet.extended_tweet.full_text;
        }

        const webhook = new WebhookClient({ url: process.env.TWEET_WEBHOOK_URL });

        var post = new EmbedBuilder()
            .setColor("Blue")
            .setAuthor({
                name: `${tweet.user.name} (@${tweet.user.screen_name})`, 
                iconURL: `${tweet.user.profile_image_url}`, 
                url: `https://twitter.com/${tweet.user.screen_name}`
            })
            .setDescription(`${text}`)
            .setTimestamp()
            .setURL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
            .setFooter({ text: `Twitter`, iconURL: `https://abs.twimg.com/favicons/twitter.ico` })


            if (!!media) for (var j = 0; j < media.length; j++) post.setImage(media[j].media_url)

            return webhook.send({embeds: [post]}).catch((err) => console.log(err));
    } catch (error) {
        return console.log(`an error occured on posting twitter notification\n${error}`)
    }
}

module.exports = { twitterPost }