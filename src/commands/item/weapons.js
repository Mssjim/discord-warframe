const { MessageEmbed } = require("discord.js");
const { fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");

module.exports = {
    name: 'weapon',
    aliases: ['gun', 'weapon'],
    description: 'Show info for weapon.',
    category: 'item',

    run: async (client, msg, args) => {
        if (!args[0]) {
            msg.reply("Please, inform the Weapon 1if");
            return; // TODO missing args for item search
        }
        const dataItem = await fetcher(`https://api.warframestat.us/items/search/${args.join("%20")}`)
        d = dataItem[1];
        if (dataItem.length < 1) {
            msg.reply("Weapon not found 2if")
            return;
        }
        if (d.type == 'Pistol') {
            const embed = new MessageEmbed()
                .setTitle(args.join("-").toUpperCase())
                .addField("Name: ", d.name)
                .addField("Total damage: ", d.totalDamage)
                .addField("Categoy: ", d.productCategory)
                .setThumbnail("https://logosmarcas.net/wp-content/uploads/2021/02/Warframe-Logo.png")
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed);
        }
        if (d.type == "Dual Daggers") {
            const embed = new MessageEmbed()
                .setTitle(args.join("-").toUpperCase())
                .addField("Name: ", d.name)
                .addField("Total damage: ", d.totalDamage)
                .addField("Categoy: ", d.productCategory)
                .setThumbnail("https://logosmarcas.net/wp-content/uploads/2021/02/Warframe-Logo.png")
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed);
        }
        else {
            msg.reply("Weapon not found. 3if")
            console.log(d.type)
        }
    }
}