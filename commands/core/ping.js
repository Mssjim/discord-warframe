const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    aliases: ['pingo', 'checkms'],
    description: 'Checks response time of Bot',
    category: 'core',

    run: async(client, msg, args) => {
        const pingMsg = await msg.channel.send(':ping_pong: Pinging...');

        const embed = new MessageEmbed()
            .setTitle(':ping_pong: Pong!')
            .setDescription(`${client.ws.ping} ms`)
            .setColor(client.colors.primary)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        
        pingMsg.edit('', embed);
    }
}