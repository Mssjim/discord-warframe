const settings = require('../settings.json');
const { getSimillarCommands } = require('../functions');
const { MessageEmbed } = require('discord.js');
const colors = require('../resources/colors.json');
const emojis = require('../resources/emojis.json');

async function run(cmd, client, msg, args) {
    if(cmd.length <1) return;
    
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
        command.run(client, msg, args);
        // TODO Log system
    } else {
        const commands = Array.from(client.commands.keys());
        const aliases = Array.from(client.aliases.keys());

        let simillarCommands = getSimillarCommands(commands, cmd);
        if(simillarCommands.length == 0)
            simillarCommands = getSimillarCommands(aliases, cmd);
        
        if(simillarCommands[0]) {
            const embed = new MessageEmbed()
                .setTitle(`Invalid Command!`)
                .setDescription(`${emojis.question} **|** Did you mean **${simillarCommands[0]}**?`)
                .setColor(colors.primary)

            const msgEmbed = await msg.channel.send(msg.author.toString(), embed);
            msgEmbed.react(emojis.check)
            msgEmbed.react(emojis.error);

            const filter = (reaction, user) => {
                if(reaction.emoji.name != 'check' && reaction.emoji.name != 'error') return false;
                return(user.id == msg.author.id)
            }
	
            msgEmbed.createReactionCollector(filter, { max: 1 })
                .on('collect', (reaction) => {
                    if(reaction.emoji.name == "check")
                        run(simillarCommands[0], client, msg, args);
                    msgEmbed.delete();
                });
        }
    }
}

module.exports = client => {
    client.on('message', msg => {
        const prefix = settings.prefix; // TODO Get guild prefix
        client.lang = settings.lang; // TODO Get guild lang

        if(msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}>`)) {

            const description = `• My prefix for this server is \`${prefix}\``+
            `\n• Type \`${prefix}help\` to see my commands`+
            `\n• Invite me to your server with \`${prefix}invite\``+
            `\n\n**Join on my Support Server**`+
            `\n${client.invite}`;

            const embed = new MessageEmbed()
                .setDescription(description)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(colors.primary)

            msg.channel.send(msg.author.toString(), embed);
        }
    
        if(msg.author.bot || !msg.guild || !msg.content.startsWith(prefix)) return;
    
        const args = msg.content.slice(prefix.length).trim().split(' ');
        const cmd = args.shift().toLowerCase();
    
        run(cmd, client, msg, args);
    });
}