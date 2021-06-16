const { MessageEmbed } = require("discord.js");
const fecther = require("../../resources/fecther");

module.exports = {
    name: 'sortie',
    aliases: ['sorties', 'raid', 'incursion', 'incursions', 'incursão', 'incursao'],
    description: 'Get the list of sorties missions',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fecther('https://api.warframestat.us/pc/sortie');
        
        if(!data) {
            msg.channel.send(`${client.emojos.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        let thumbnail = client.images.sorties.bosses[data.boss.toLowerCase()];
        if(!thumbnail) thumbnail = client.images.sorties.bosses["default"];

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
            .setColor(client.colors.primary)
            .setThumbnail(thumbnail)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            
        msg.channel.send(msg.author.toString(), embed);
    }
}