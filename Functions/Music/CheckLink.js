const validUrl = require("valid-url")

const isYoutubeLink = (link) => {
    if (validUrl.isUri(link)){
        if (link.includes("youtube.com") || link.includes("youtu.be"))
            return true
    }

    return false
}

module.exports = { isYoutubeLink }