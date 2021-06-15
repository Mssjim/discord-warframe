const fs = require('fs');

module.exports = client => {
    console.log('Loading commands...');
    let loadedCommands = 0, totalCommands = 0;

    fs.readdirSync('./commands/').forEach(category => {
        fs.readdirSync(`./commands/${category}`).forEach(file => {
        console.log(`  \x1b[33mLoading ${category} commands...\x1b[0m`);

            const cmd = require(`../commands/${category}/${file}`)
            totalCommands++;

            if(cmd.name) {
                client.commands.set(cmd.name, cmd);

                if(cmd.aliases) {
                    cmd.aliases.forEach(alias => {
                        client.aliases.set(alias, cmd.name);
                    });
                }
                console.log(`\x1b[32m    => ${file} loaded!\x1b[0m`);
                loadedCommands++;
            } else {
                // TODO Invalid command file
                console.log(`\x1b[31m    => ${file} not loaded!\x1b[0m`);
            }
        });
    });

    console.log(`[${loadedCommands}/${totalCommands}] Commands successful loaded!`);
}