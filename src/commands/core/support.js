const { MessageEmbed } = require("discord.js");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");

module.exports = {
    name: 'support',
    aliases: ['server', 'suporte'],
    description: 'Get the invite link to Support Server',
    category: 'core',

    run: async(client, msg, args) => {

        const embed = new MessageEmbed()
            .setTitle(`${emojis.discord} Support Server`)
            .setDescription(`**[Click Here to Join](${client.supportServer})**`)
            .setColor(colors.primary)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        
        msg.channel.send(msg.author.toString(), embed);
    }
}