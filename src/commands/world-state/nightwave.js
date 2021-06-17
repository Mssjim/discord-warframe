const { MessageEmbed } = require("discord.js");
const { etaTime, fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const images = require("../../resources/images.json");
const pagination = require("discord.js-pagination");

module.exports = {
    name: 'nightwave',
    aliases: ['nw'],
    description: 'Display the currently nightwave challenges and timers',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/nightwave');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        data.eta = etaTime(new Date(data.expiry));
        data.seasonString = `${Math.floor((data.season+1) / 2)}${(data.season+1) % 2 === 1 ? ' Intermission' : ''}`;
        let pages = [];
        let challengesTypes = {
            "daily": [],
            "weekly": [],
            "elite": []
        }

        data.activeChallenges.forEach(challenge => {
            if(challenge.isDaily)
                challengesTypes["daily"].push(challenge);
            else if(challenge.isElite)
                challengesTypes["elite"].push(challenge);
            else
                challengesTypes["weekly"].push(challenge);
        });

        Object.keys(challengesTypes).forEach(key => {
            if(!challengesTypes[key][0]) return;
            const tier = key.charAt(0).toUpperCase() + key.slice(1);
            const challenges = challengesTypes[key];
            let fields = [];

            challenges.forEach(challenge => {
                challenge.eta = etaTime(new Date(challenge.expiry));
                fields.push({
                    name: `${challenge.title} - ${challenge.eta}`,
                    value: `${challenge.desc}`
                });
            });

            pages.push(
                new MessageEmbed()
                    .setTitle(`Nightwave - **Season:** ${data.seasonString} **Phase:** ${data.phase + 1}`)
                    .setDescription(`**${tier} Challenges**\n\n`)
                    .addFields(fields)
                    .addField('\u200B', `**Season Remain Time:** ${data.eta}`)
                    .setColor(colors.primary)
                    .setThumbnail(images.syndicates.nightwave)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        });

        pagination(msg, pages, ['◀️', '▶️']);
    }
}