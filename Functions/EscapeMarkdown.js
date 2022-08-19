function escapeMarkdown(text) {
    var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1')
    var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1')
    return escaped
}

module.exports = { escapeMarkdown }