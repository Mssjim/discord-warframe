const fs = require('fs');

module.exports = client => {
    console.log('\nLoading events...');
    let loadedEvents = 0, totalEvents = 0;

    fs.readdirSync(`./src/events/`).forEach(file => {
        totalEvents++;
        try {
            const event = require(`../events/${file}`);
            event(client);
            console.log(`\x1b[32m    => ${file} loaded!\x1b[0m`);
            loadedEvents++;
        } catch (error) {
            console.error(error);
            // TODO Catch block (load event error)
            console.log(`\x1b[31m    => ${file} not loaded!\x1b[0m`);
        }
    });

    console.log(`[${loadedEvents}/${totalEvents}] Events successful loaded!`);
}