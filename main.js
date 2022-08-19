const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const { loadEvents } = require("./Structures/Handlers/EventHandlers");
const { loadCommands } = require("./Structures/Handlers/CommandHandlers");
const { loadComponents } = require("./Structures/Handlers/ComponentHandlers");
// const { loadAntiCrash } = require("./Structures/Handlers/AntiCrash");

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

require("dotenv").config();

client.login(process.env.BOT_TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
    loadComponents(client);
    // loadAntiCrash(client);
}).catch((err) => console.log(err));