function musicDuration(track) {
    let time
    
    if (track.isStream)
        return time = "[LIVE]"

    var duration = track.duration / 1000
    var hours = Math.floor(duration / 3600);
    var minutes = Math.floor((duration / 60) % 60);
    var seconds = Math.floor(duration % 60);

    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds
    
    if (hours < 1) time = `[${minutes}:${seconds}]`
    else time = `[${hours}:${minutes}:${seconds}]`

    return time
}

module.exports = { musicDuration }