const fs = require('fs');

module.exports = client => {
    console.log('\nLoading events...');
    fs.readdirSync(`./events/`).forEach(file => {
        try {
            const event = require(`../events/${file}`);
            event(client);
        } catch (error) {
            console.error(error);
            // TODO Catch block (load event error)
        }
    });

}