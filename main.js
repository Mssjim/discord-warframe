require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.colors = require('./resources/colors.json');

// Handlers
fs.readdirSync('./handlers/').forEach(async(handler) => {
    await require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);