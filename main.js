require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

// Code
console.log('Starting...');
console.log(`\x1b[36m====================================\x1b[0m`);

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();

client.supportServer = 'https://discord.gg/h38gTNyPXA';

// Handlers
fs.readdirSync('./src/handlers/').forEach(async(handler) => {
    await require(`./src/handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);