const { MessageEmbed } = require("discord.js");
const { etaTime, fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const images = require("../../resources/images.json");
const pagination = require("discord.js-pagination");

module.exports = {
    name: 'conclave',
    aliases: ['pvp', 'teshin'],
    description: 'Display the currently Conclave challenges and timers',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/conclaveChallenges');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        let pages = [];
        let challengesTypes = {};

        challengesTypes.daily = data.filter(d => d.daily);
        challengesTypes.weekly = data.filter(d => !d.daily);

        Object.keys(challengesTypes).forEach(key => {
            if(!challengesTypes[key][0]) return;
            const tier = key.charAt(0).toUpperCase() + key.slice(1);
            const challenges = challengesTypes[key];
            let fields = [];

            challenges.forEach(challenge => {
                challenge.eta = etaTime(new Date(challenge.expiry));
                fields.push({
                    name: `${challenge.title} - ${challenge.eta}`,
                    value: `${challenge.description}`
                });
            });

            pages.push(
                new MessageEmbed()
                    .setTitle(`Conclave - ${tier}`)
                    .addFields(fields)
                    .setColor(colors.primary)
                    .setThumbnail(images.syndicates.conclave)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        });

        pagination(msg, pages, ['◀️', '▶️']);
    }
}