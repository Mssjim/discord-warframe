const { MessageEmbed } = require("discord.js");
const { fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");
const pagination = require("discord.js-pagination");

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
        const dataItem = await fetcher(`https://api.warframestat.us/weapons/search/${args.join("%20")}`)
        d = dataItem[0];
        if (dataItem.length < 1) {
            msg.reply("Weapon not found 2if")
            return;
        }
        if (d.category == "Secondary" || d.category == "Melee" || d.category == "Primary") {
            const embedP = new MessageEmbed()
                .setTitle(args.join("-").toUpperCase())
                .addField("Name: ", d.name)
                .addField("Total damage: ", d.totalDamage)
                .addField("Type: ", d.type)
                .setThumbnail(d.wikiaThumbnail)
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            const embedS = new MessageEmbed()
                .setTitle(args.join("-").toUpperCase())
                .addField("Name: ", d.name)
                .addField("Total damage: ", d.totalDamage)
                .addField("Type: ", d.type)
                .setThumbnail(d.wikiaThumbnail)
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            pagination(msg, [embedP, embedS])
        }   
    }
}