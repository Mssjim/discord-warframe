const fs = require('fs');

module.exports = client => {
    fs.readdirSync('./commands/').forEach(category => {
        console.log(`Loading ${category} commands...`);
        fs.readdirSync(`./commands/${category}`).forEach(file => {

            const cmd = require(`../commands/${category}/${file}`)

            if(cmd.name) {
                client.commands.set(cmd.name, cmd);

                if(cmd.aliases) {
                    cmd.aliases.forEach(alias => {
                        client.aliases.set(alias, cmd.name);
                    });
                }
                console.log(`    => ${file} loaded!`);
            } else {
                // TODO Invalid command file
                console.log(`    => ${file} not loaded!`);
            }
        });
    });
}