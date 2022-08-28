let timeout;

function setLeaveTimeout(player) {
    timeout = setTimeout(() => {
        player.destroy()
    }, 2 * 60 * 1000)
}

function clearLeaveTimeout() {
    clearTimeout(timeout)
    timeout = undefined
}

module.exports = {
    setLeaveTimeout,
    clearLeaveTimeout
}