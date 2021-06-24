const { MessageEmbed } = require("discord.js");
const { fetcher, etaTime } = require("../../functions");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const images = require("../../resources/images.json");
const pagination = require("discord.js-pagination");

module.exports = {
    name: 'darvo',
    aliases: ['deal', 'dailydeals'],
    description: 'Shows the Darvo\'s daily offers',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/dailyDeals');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        let pages = [];

        data.forEach(d => {
            const eta = etaTime(new Date(d.expiry));
            pages.push(
                new MessageEmbed()
                .setTitle('Darvo Deal')
                .addField(d.item, `**${d.total-d.sold}** units remaining`)
                .addField('Price', `~~${d.originalPrice}~~ ${d.salePrice} ${emojis.platinum}`)
                .addField('Remain Time', eta)
                .setColor(colors.primary)
                .setThumbnail(images.darvo)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        });

        if(pages.length > 1) {
            pagination(msg, pages, ['◀️', '▶️']);
        } else if(pages.length == 1) {
            msg.channel.send(msg.author.toString(), pages[0]);
        } else {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} There is no offer available.`)
        }
    }
}