const { MessageEmbed } = require("discord.js");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const pagination = require("discord.js-pagination");
const { titleCase } = require("../../functions");

module.exports = {
    name: 'help',
    aliases: ['h', 'ajuda', '?'],
    description: 'Show all the bot commands',
    category: 'core',

    run: async(client, msg, args) => {
        const pages = [];

        Array.from(client.categories.keys()).forEach(category => {
            if(!client.categories.get(category)[0]) return;
            const commands = client.categories.get(category);
            category = titleCase(category);
            let fields = [];

            commands.forEach(command => {
                command = client.commands.get(command);
                fields.push({
                    name: `\`${client.prefix}${command.name}\``,
                    value: `${command.description}`
                });
            });

            pages.push(
                new MessageEmbed()
                    .setTitle(`${emojis.warframe} Help`)
                    .setDescription(`**${category} Commands**`)
                    .addFields(fields)
                    .setColor(colors.primary)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        });

        pagination(msg, pages, ['◀️', '▶️']);
    }
}