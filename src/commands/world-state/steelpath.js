const { MessageEmbed } = require("discord.js");
const { fetcher } = require("../../functions");
const colors = require("../../resources/colors.json");
const images = require("../../resources/images.json");
const emojis = require("../../resources/emojis.json");

module.exports = { // TODO Show the reward item image
    name: 'steelpath',
    aliases: ['steel'],
    description: 'Show the currently Steel Path offering',
    category: 'world-state',

    run: async(client, msg, args) => {
        const data = await fetcher('https://api.warframestat.us/pc/steelPath');
        
        if(!data) {
            msg.channel.send(`${emojis.error} **|** ${msg.author.toString()} No response from Warframe API.`)
            return;
        }

        let description = data.currentReward ? '**Current Reward**\n' : 'There are no Steel Path offers';

        if(data.currentReward) {
            description = description.concat(
                `• ${data.currentReward.name} - ${data.currentReward.cost} ${emojis.steelessence}\n\n`+
                `**Weekly Rotation**\n`
            );
            
            for(const item of data.rotation) {
                description = description.concat(`• ${item.name} - ${item.cost} ${emojis.steelessence}\n`);
            }
        }

        const embed = new MessageEmbed()
            .setTitle('Steel Path')
            .setDescription(description)
            .setColor(colors.primary)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
        
        msg.channel.send(msg.author.toString(), embed);
    }
}