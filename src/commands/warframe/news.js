const { MessageEmbed } = require("discord.js");
const { fetcher, etaTime } = require("../../functions");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const images = require("../../resources/images.json");
const pagination = require("discord.js-pagination");

module.exports = {
    name: 'news',
    aliases: ['noticias'],
    description: 'Shows Warframe News',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/news');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        let pages = [];

        data.forEach(d => {
            pages.push(
                new MessageEmbed()
                .setTitle('News')
                .setDescription(`**${d.message}**\n**[See More](${d.link})**`)
                .setImage(d.imageLink)
                .setColor(colors.primary)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        });

        if(pages.length > 1) {
            pagination(msg, pages, ['◀️', '▶️']);
        } else if(pages.length == 1) {
            msg.channel.send(msg.author.toString(), pages[0]);
        } else {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} There is no new Warframe news.`)
        }
    }
}