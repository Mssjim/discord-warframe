const { MessageEmbed } = require("discord.js");
const colors = require("../../resources/colors.json");
const { supportServer, owners } = require("../../settings.json");

module.exports = {
    name: 'info',
    aliases: ['bot'],
    description: 'Shows information about Warframe Bot',
    category: 'core',

    run: async(client, msg, args) => {
        let ownersString = '';
        for(const ownerId of owners) {
            const owner = await client.users.fetch(ownerId);
            ownersString = ownersString.concat(`\`${owner.tag}\` `);
        }

    	const description = `• My prefix for this server is \`${client.prefix}\``+
            `\n• Type \`${client.prefix}help\` to see my commands`+
            `\n• Invite me to your server with \`${client.prefix}invite\``+
            `\n• Owners ${ownersString}`+
            `\n\n**Join on my Support Server**`+
            `\n${supportServer}`;

        const embed = new MessageEmbed()
            .setDescription(description)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(colors.primary)

        msg.channel.send(msg.author.toString(), embed);
    }
}