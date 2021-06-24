const { MessageEmbed } = require("discord.js");
const { fetcher, etaTime } = require("../../functions");
const colors = require("../../resources/colors.json");
const images = require("../../resources/images.json");
const emojis = require("../../resources/emojis.json");

module.exports = { // TODO Show the rewards and missions of each event
    name: 'simaris',
    aliases: ['irmis', 'synthesis', 'sintese'],
    description: 'Show the active synthesis target of Cephalon Simaris',
    category: 'world-state',

    run: async(client, msg, args) => { // TODO Get target enemy image
        const data = await fetcher('https://api.warframestat.us/pc/simaris');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        const description = data.isTargetActive ? `**Target:** ${data.target}` : `No active target`;

        const embed = new MessageEmbed()
            .setTitle('Cephalon Simaris')
            .setDescription(description)
            .setColor(colors.primary)
            .setThumbnail(images.syndicates.simaris)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
        
        msg.channel.send(msg.author.toString(), embed);
    }
}