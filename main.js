require('dotenv').config();
const Discord = require('discord.js');
const settings = require('./settings.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.colors = require('./resources/colors.json');

console.log('================================');

// Handlers
require('./handlers/loadCommands.js')(client);

// Listeners
client.on('ready', () => {
    console.log('================================');
    console.log(`${client.user.tag} online!`);
})

client.on('message', msg => {
    const prefix = settings.prefix; // TODO Get guild prefix

    if(msg.author.bot || !msg.guild || !msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if(cmd.length <1) return;

    let command = client.commands.get(cmd);

    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, msg, args);

});

client.login(process.env.TOKEN);