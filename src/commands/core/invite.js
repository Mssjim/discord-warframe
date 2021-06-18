const { MessageEmbed } = require("discord.js");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const { invite } = require("../../settings.json");

module.exports = {
    name: 'invite',
    aliases: ['convite', 'convidar', 'add', 'adicionar'],
    description: 'Get the link to invite me to your server',
    category: 'core',

    run: async(client, msg, args) => {

        const embed = new MessageEmbed()
            .setTitle(`${emojis.warframe} Invite`)
            .setDescription(`**[Click Here to Invite Me!](${invite})**`)
            .setColor(colors.primary)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        
        msg.channel.send(msg.author.toString(), embed);
    }
}