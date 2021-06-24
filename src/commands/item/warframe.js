const { MessageEmbed } = require("discord.js");
const { fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");

module.exports = {
    name: 'warframe',
    aliases: ['bonecão', 'bonecasso'],
    description: 'Show info for warframe.',
    category: 'item',

    run: async (client, msg, args) => {
        if (!args[0]) {
            msg.reply("Please, inform the Warframe.");
            return; // TODO missing args for item search
        }
        const dataItem = await fetcher(`https://api.warframestat.us/items/search/${args.join("%20")}`)
        d = dataItem[0];
        if (dataItem.length < 1) {
            msg.reply("Warframe not found")
            return;
        }
        if (d.category == 'Warframes') {
            const embed = new MessageEmbed()
                .setTitle(args.join("-").toUpperCase())
                .addField("Name: ", d.name)
                .addField("Health: ", d.health)
                .addField("Shield: ", d.shield)
                .addField("Armor: ", d.armor)
                .addField("Stamina: ", d.stamina)
                .addField("Power: ", d.power)
                .addField("Description: ", d.description)
                .setThumbnail("https://logosmarcas.net/wp-content/uploads/2021/02/Warframe-Logo.png")
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed);
        }
        else {
            msg.reply("Warframe not found.")
        }
    }
}