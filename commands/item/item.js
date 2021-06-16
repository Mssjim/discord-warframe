const { MessageEmbed } = require("discord.js");
const fecther = require("../../resources/fecther");

module.exports = {
    name: 'item',
    aliases: ['item', 'info'],
    description: 'Show info for item.',
    category: 'item',

    run: async (client, msg, args) => {
        if (args[0] == undefined) {
            msg.reply("caiu no if")
        }
        else {
            const dataItem = await fecther(`https://api.warframestat.us/items/search/${args.join("%20")}`)
            if (dataItem.length < 1) {
                msg.reply("Item não encontrado")
                return;
            }
            d = dataItem[0];
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
                .setColor(client.colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed)
        }

    }
}
        