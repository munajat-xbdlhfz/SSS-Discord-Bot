module.exports = {
    name: 'clear',
    description: "clear message!",
    async execute(message, args) {
        if (message.member.roles.cache.has(process.env.ADMIN_ID) || message.author.id ===  process.env.DEV_ID)  {
            if(!args[0]) return message.reply("please enter the amount of messages that you want to clear!");
            if(isNaN(args[0])) return message.reply("please enter a real number!");

            if(args[0] > 100) return message.reply("You cannot delete more than 100 messages!");
            if(args[0] < 1) return message.reply("You must delete atleast one message!");

            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                message.channel.bulkDelete(messages);
            })
        } else {
            message.reply(`you don't have permission to use this command.`)
        }
    }
}