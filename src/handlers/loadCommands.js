const fs = require('fs');

module.exports = client => {
    console.log('Loading commands...');
    let loadedCommands = 0, totalCommands = 0;

    fs.readdirSync('./src/commands/').forEach(category => {
        console.log(`  \x1b[33mLoading ${category} commands...\x1b[0m`);
        let categoryCommands = [];

        fs.readdirSync(`./src/commands/${category}`).forEach((file, i, files) => {
            const cmd = require(`../commands/${category}/${file}`);
            totalCommands++;

            if(cmd.name) {
                client.commands.set(cmd.name, cmd);

                if(cmd.aliases) {
                    cmd.aliases.forEach(alias => {
                        client.aliases.set(alias, cmd.name);
                    });
                }
                console.log(`\x1b[32m    => ${file} loaded!\x1b[0m`);
                categoryCommands.push(cmd.name);
                loadedCommands++;
            } else {
                // TODO Invalid command file
                console.log(`\x1b[31m    => ${file} not loaded!\x1b[0m`);
            }

            if(files.length >= i)
                client.categories.set(category, categoryCommands);
        });
    });

    console.log(`[${loadedCommands}/${totalCommands}] Commands successful loaded!`);
}