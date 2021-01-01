module.exports = {
    name: 'message',
    description: 'send message from bot',
    permission: 'ADMINISTRATOR, DEVELOPER',
    async execute (message, args) {
        if (message.member.roles.cache.has(process.env.ADMIN_ID) || message.author.id ===  process.env.DEV_ID)  {
            // Delete admin or dev message
            await message.channel.messages.fetch({limit: 1}).then(messages => {
                message.channel.bulkDelete(messages);
            })

            let msgArgs = args.slice(0).join(" ")
            return message.channel.send(msgArgs)
        }
    }
}