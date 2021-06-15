const settings = require('../settings.json');

module.exports = client => {
    client.on('message', msg => {
        const prefix = settings.prefix; // TODO Get guild prefix
        client.lang = settings.lang; // TODO Get guild lang
    
        if(msg.author.bot || !msg.guild || !msg.content.startsWith(prefix)) return;
    
        const args = msg.content.slice(prefix.length).trim().split(' ');
        const cmd = args.shift().toLowerCase();
    
        if(cmd.length <1) return;
    
        let command = client.commands.get(cmd);
        if(!command) command = client.commands.get(client.aliases.get(cmd));
        if(command) {
            command.run(client, msg, args);
            // TODO Log system
        } else {
            // TODO Not found command else clause
        }
    });
}