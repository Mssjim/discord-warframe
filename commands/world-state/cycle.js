const { MessageEmbed } = require("discord.js");
const fecther = require("../../resources/fecther");

const earth = ['earth', 'terra', 'ea', 'te'];
const cetus = ['cetus', 'ce',];
const vallis = ['vallis','va',];
const cambion = ['cambion', 'ca',];
module.exports = {

    name: 'cycle',
    aliases: ['ciclo', 'day', 'night', 'dia', 'noite'],
    description: 'Checks the cycle of Warframe',
    category: 'world-state',

    run: async (client, msg, args) => {
        if (earth.includes(args[0].toLowerCase())) {
            // Ciclo da Terra

            const data = await fecther('https://api.warframestat.us/pc/earthCycle')

            const emoji = data.isDay ? '☀' : '🌑';
            const timeString = data.isDay ? 'Nightfall' : 'Dawn';

            const embed = new MessageEmbed()
                .setTitle(':earth_americas: Earth Cycle')
                .addField(emoji, data.state)
                .addField(`Time for ${timeString}`, data.timeLeft)
                .setColor(client.colors.primary)
                .setThumbnail('https://static.wikia.nocookie.net/warframe/images/1/1e/Earth.png')
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())

            msg.channel.send(embed)
        } //ciclo Terra
        if (cetus.includes(args[0].toLowerCase())) {
            // Ciclo de Cetus

            const data = await fecther('https://api.warframestat.us/pc/cetusCycle')
            const emoji = data.isDay ? '☀' : '🌑';
            const timeString = data.isDay ? 'Night' : 'Day';
            const embed = new MessageEmbed()
                .setTitle('🦎 Cetus Cycle')
                .addField(emoji, data.state, true)
                .addField(`Time for ${timeString}`, data.timeLeft)
                .setColor(client.colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed)
        } //ciclo Cetus
        if (vallis.includes(args[0].toLowerCase())) {
            // Ciclo de vallis

            const data = await fecther('https://api.warframestat.us/pc/vallisCycle')
            const emoji = data.isDay ? '☀' : '🌑';
            const timeString = data.isDay ? 'Cold' : 'Hot';
            const embed = new MessageEmbed()
                .setTitle('🦊 Vallis Cycle')
                .addField(emoji, data.state, true)
                .addField(`Time for ${timeString}`, data.timeLeft)
                .setColor(client.colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed)
        } //ciclo Vallis
        if (cambion.includes(args[0].toLowerCase())) {
            // Ciclo de cambion

            const data = await fecther('https://api.warframestat.us/pc/cambionCycle')
            const emoji = data.isDay ? '☀' : '🌑';
            const timeString = data.isDay ? 'vome' : 'fass';
            const embed = new MessageEmbed()
                .setTitle('🦈 Cambion Cycle')
                .addField(emoji, data.active, true)
                .addField(`Time for ${timeString}`, data.expiry)
                .setColor(client.colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed)
        } //ciclo Cambion
    }
}