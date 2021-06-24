const { MessageEmbed } = require("discord.js");
const { fetcher, etaTime } = require("../../functions");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const pagination = require("discord.js-pagination");

module.exports = { // TODO Show the rewards and missions of each event
    name: 'events',
    aliases: ['event', 'eventos', 'evento'],
    description: 'Shows active events on Warframe',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/events');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        let pages = [];

        data.forEach(d => {
            const eta = etaTime(new Date(d.expiry));
            let fields = [];

            if (d.maximumScore && d.currentScore) {
                fields.push({ name: 'Progress', value: `${(100 * d.currentScore) / d.maximumScore}%` });
            }

            fields.push({ name: 'Remain Time', value: eta });

            pages.push(
                new MessageEmbed()
                .setTitle(d.description)
                .addFields(fields)
                .setColor(colors.primary)
                //.setThumbnail()
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        });

        if(pages.length > 1) {
            pagination(msg, pages, ['◀️', '▶️']);
        } else if(pages.length == 1) {
            msg.channel.send(msg.author.toString(), pages[0]);
        } else {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} There is no event available.`)
        }
    }
}