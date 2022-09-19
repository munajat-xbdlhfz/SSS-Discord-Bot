const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel, Voice } = Partials;
require("dotenv").config();

const { loadEvents } = require("./Structures/Handlers/EventHandlers");
const { loadCommands } = require("./Structures/Handlers/CommandHandlers");
const { loadComponents } = require("./Structures/Handlers/ComponentHandlers");
const { loadErela } = require("./Functions/Erela/ErelaManager");

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildVoiceStates],
    partials: [User, Message, GuildMember, ThreadMember, Channel, Voice],
});

client.manager = loadErela(client);
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

client.on("raw", d => client.manager.updateVoiceState(d));

client.login(process.env.BOT_TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
    loadComponents(client);
}).catch((err) => console.log(err));

// Run lavalink on cmd
// java -jar Lavalink.jar