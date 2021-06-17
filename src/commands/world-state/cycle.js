const { MessageEmbed } = require("discord.js");
const { fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");

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
        if (earth.includes(args[0]?.toLowerCase())) {

            const data = await fetcher('https://api.warframestat.us/pc/earthCycle')

            const emoji = data.isDay ? '☀ Day!' : '🌑 Night!';
            const timeString = data.isDay ? 'Nightfall' : 'Dawn';

            const embed = new MessageEmbed()
                .setTitle(':earth_americas: Earth Cycle')
                .addField("Time is:", emoji)
                .addField(`Time for ${timeString}`, data.timeLeft)
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())

            msg.channel.send(embed)
        } //earth cycle
        if (cetus.includes(args[0]?.toLowerCase())) {

            const data = await fetcher('https://api.warframestat.us/pc/cetusCycle')
            const emoji = data.isDay ? '☀ Day!' : '🌑 Night!';
            const timeString = data.isDay ? 'Night' : 'Day';
            const embed = new MessageEmbed()
                .setTitle('🦎 Cetus Cycle')
                .addField("Time is:", emoji)
                .addField(`Time for ${timeString}`, data.timeLeft)
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed)
        } //cetus cycle
        if (vallis.includes(args[0]?.toLowerCase())) {

            const data = await fetcher('https://api.warframestat.us/pc/vallisCycle')
            const emoji = data.isDay ? '☀ Hot' : '❄ Cold';
            const timeString = data.isDay ? 'Cold' : 'Hot';
            const embed = new MessageEmbed()
                .setTitle('🦊 Vallis Cycle')
                .addField("Time is:", emoji)
                .addField(`Time for ${timeString}`, data.timeLeft)
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed)
        } //vallis cycle
        if (cambion.includes(args[0]?.toLowerCase())) {

            const data = await fetcher('https://api.warframestat.us/pc/cambionCycle')
            const emoji = data.isDay ? '☀' : '🌑';
            const timeString = data.isDay ? 'vome' : 'fass';
            const embed = new MessageEmbed()
                .setTitle('🦈 Cambion Cycle')
                .addField(emoji, data.active, true)
                .addField(`Time for ${timeString}`, data.expiry)
                .setColor(colors.primary)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed)
        } //cambion cycle
        if (args[0] == undefined) {
            const dataTerra = await fetcher('https://api.warframestat.us/pc/earthCycle')
            const dataCetus = await fetcher('https://api.warframestat.us/pc/cetusCycle')
            const dataVallis = await fetcher('https://api.warframestat.us/pc/vallisCycle')
            const dataCambion = await fetcher('https://api.warframestat.us/pc/cambionCycle')

            const embed = new MessageEmbed()
                .setTitle('Cycles:')
                .addField("**🌎Earth Cycle: **", dataTerra.timeLeft)
                .addField("**🕘Time: **", dataTerra.isDay ? '☀ Day!' : '🌑 Night!')
                .addField("**🦎Cetus Cycle: **", dataCetus.timeLeft)
                .addField("**🕘Time: **", dataCetus.isDay ? '☀ Day!' : '🌑 Night!')
                .addField("**🦊Vallis Cycle: **", dataVallis.timeLeft)
                .addField("**🕘Time: **", dataVallis.isDay ? '☀ Day!' : '🌑 Night!')
                .setColor(colors.primary)
                .setThumbnail('https://img.icons8.com/pastel-glyph/2x/clock--v2.png')
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            msg.channel.send(embed)
        } // all cycles
    }
}