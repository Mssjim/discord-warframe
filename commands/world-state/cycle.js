const { MessageEmbed } = require("discord.js");
const fecther = require("../../resources/fecther");

const earth = ['earth', 'terra', 'terre'];

module.exports = {

    name: 'cycle',
    aliases: ['ciclo', 'day', 'night', 'dia', 'noite'],
    description: 'Checks the cycle of Warframe',
    category: 'world-state',

    run: async(client, msg, args) => {
        if(earth.includes(args[0].toLowerCase())) {
            // Ciclo da Terra

            const data = await fecther('https://api.warframestat.us/pc/earthCycle')

            const emoji = data.isDay ? '☀' : '🌑';
            const timeString = data.isDay ? 'Nightfall' : 'Dawn';

            const embed = new MessageEmbed()
            .setTitle(':earth_americas: Earth Cycle')
            .addField(emoji, data.state)
            .addField(`Time for ${timeString}`, data.timeLeft)
            .setColor(client.colors.primary)
            .setImage('https://static.wikia.nocookie.net/warframe/images/1/1e/Earth.png')
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        
            msg.channel.send(embed)
        }
    }
}