const { MessageEmbed } = require("discord.js");
const { fetcher, etaTime } = require("../../functions");
const colors = require("../../resources/colors.json");
const emojis = require("../../resources/emojis.json");
const images = require("../../resources/images.json");

module.exports = { // TODO Add the items of baro when he arrives
    name: 'baro',
    aliases: ['voidtrader', 'kiteer', 'negociante'],
    description: 'Get the status of Void Trader',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/voidTrader');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        const eta = etaTime(new Date(data.activation));
        const description = data.active ? "*The wait is over, Tenno. Baro Ki'Teer has arrived*" : '';
        
        const embed = new MessageEmbed()
            .setTitle(`Void Trader`)
            .setDescription(description)
            .addField('Location', data.location)
            .addField('Time until arrival', eta)
            .setColor(colors.primary)
            .setThumbnail(images.baro)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            
        msg.channel.send(msg.author.toString(), embed);
    }
}