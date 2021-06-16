const { MessageEmbed } = require("discord.js");
const fecther = require("../../resources/fecther");
const pagination = require("discord.js-pagination");

module.exports = {
    name: 'fissures',
    aliases: ['fissure', 'relics', 'relic'],
    description: 'Get the list of all Void Fissure missions',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fecther('https://api.warframestat.us/pc/fissures');

        if(!data) {
            msg.channel.send(`${client.emojos.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        const pages = [];
        const eras = {
            lith: [],
            meso: [],
            neo: [],
            axi: [],
            requiem: [],
        };

        data.forEach(fissure => eras[fissure.tier.toLowerCase()].push(fissure));

        Object.keys(eras).forEach(eraKey => {
            if(!eras[eraKey][0]) return;
            const tier = eras[eraKey][0].tier;
            const fissures = eras[eraKey];
            let fields = [];

            fissures.forEach(fissure => {
                fields.push({
                    name: `${fissure.missionType} [${fissure.eta}]`,
                    value: `${fissure.node} [${fissure.enemy}]` // TODO Enemy emoji
                });
            });

            pages.push(
                new MessageEmbed()
                    .setTitle(`${tier} Fissures`)
                    .addFields(fields)
                    .setColor(client.colors.primary)
                    .setThumbnail(client.images.relics[tier.toLowerCase()])
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        });

        pagination(msg, pages, ['◀️', '▶️']);
    }
}