const { MessageEmbed } = require("discord.js");
const { fetcher, etaTime } = require("../../functions");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const images = require("../../resources/images.json");
const pagination = require("discord.js-pagination");

module.exports = {
    name: 'invasions',
    aliases: ['invasion', 'invasao', 'invasoes'],
    description: 'Shows active invasions missions',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/invasions');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        let pages = [];
        let planets = data.map(d => d.node.match(/\((.*?)\)/)[1]); // TODO Search for an best way to get planets
        planets = planets.filter((planet, i) => planets.indexOf(planet) == i);

        planets.forEach(planet => {
            let description = "", invasion;
            data.forEach(d => {
                if(d.completed || !d.node.includes(planet)) return;
                invasion = d.desc;

                let rewards = `${d.attackerReward.asString} vs ${d.defenderReward.asString}`
                
                if(d.attackerReward.asString == "") rewards = d.defenderReward.asString;
                if(d.defenderReward.asString == "") rewards = d.attackerReward.asString;

                description = description.concat(
                    `**${d.node} - ${Math.trunc(d.completion)}%**\n` +
                    `**Factions:** ${d.attackingFaction} vs ${d.defendingFaction}\n` +
                    `**Rewards:** ${rewards}\n` +
                    `**Remain Time:** ${d.eta}\n\n`
                );
            });

            if(!invasion) return;

            pages.push(
                new MessageEmbed()
                .setTitle(`${planet} - ${invasion}`)
                .setDescription(description)
                .setColor(colors.primary)
                .setThumbnail(images.planets[planet.toLowerCase()])
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        });

        if(pages.length > 1) {
            pagination(msg, pages, ['◀️', '▶️']);
        } else if(pages.length == 1) {
            msg.channel.send(msg.author.toString(), pages[0]);
        } else {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} There is no invasion available.`)
        }
    }
}