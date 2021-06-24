const { MessageEmbed } = require("discord.js");
const { fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");
const pagination = require("discord.js-pagination");

module.exports = {
    name: 'warframe',
    aliases: ['champion', 'character'],
    description: 'Show info for warframe.',
    category: 'item',

    run: async (client, msg, args) => {
        if (!args[0]) {
            msg.reply("Please, inform the Warframe.");
            return; // TODO missing args for item search
        }
        const dataItem = await fetcher(`https://api.warframestat.us/warframes/search/${args.join("%20")}`)
        d = dataItem[0];
        if (dataItem.length < 1) {
            msg.reply("Warframe not found")
            return;
        }
        if (d.category == 'Warframes') {
            const embed = new MessageEmbed()
                .setTitle("Search: " + args.join("-").toUpperCase())
                .addField("Name: ", d.name)
                .addField("Description: ", d.description)
                .setThumbnail(d.wikiaThumbnail)
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())

            const embed2 = new MessageEmbed()
                .setTitle(d.name)
                .addField("Health: ", d.health)
                .addField("Shield: ", d.shield)
                .addField("Armor: ", d.armor)
                .addField("Stamina: ", d.stamina)
                .addField("Power: ", d.power)
                .setThumbnail(d.wikiaThumbnail)
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())

            const embed3 = new MessageEmbed()
                .setTitle(d.name + " Abilities")
                .setThumbnail(d.wikiaThumbnail)
                .setColor(colors.primary)
                .setTimestamp()
            for (let i = 0; i < d.abilities.length; i++) {
                embed3.addField(d.abilities[i].name, d.abilities[i].description)
            }

            pagination(msg, [embed, embed2, embed3])
        }
        else {
            msg.reply("Warframe not found.")
        }
    }
}