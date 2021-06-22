const { MessageEmbed } = require("discord.js");
const { fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const images = require("../../resources/images.json");

module.exports = {
    name: 'sortie',
    aliases: ['sorties', 'raid', 'incursion', 'incursions', 'incursão', 'incursao'],
    description: 'Shows sortie missions list',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/sortie');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        let thumbnail = images.sorties.bosses[data.boss.toLowerCase()];
        if(!thumbnail) thumbnail = images.sorties.bosses["default"];

        if(!images.sorties.bosses[data.boss.toLowerCase()]) // TODO Debug code
            console.log(`\x1b[31mResource image for [${data.boss.toLowerCase()}] not founded!\x1b[0m`)

        let fields = [];

        data.variants.forEach(mission => {
            fields.push({
                name:`${mission.missionType} - ${mission.node}`,
                value:`${mission.modifier}`
            });
        });
        
        const embed = new MessageEmbed()
            .setTitle(`Sortie`)
            .setDescription(`**Boss:** ${data.boss} [${data.faction}]\n**Remain Time: **${data.eta}`)
            .addFields(fields)
            .setColor(colors.primary)
            .setThumbnail(thumbnail)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            
        msg.channel.send(msg.author.toString(), embed);
    }
}