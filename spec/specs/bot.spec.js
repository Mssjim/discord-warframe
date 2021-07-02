describe('Bot', () => { // TODO Checks commands and events stuff
    beforeAll(async() => {
        console.log('\nBot Specs');
        await client.login(process.env.TOKEN);
    });

    const { Client } = require('discord.js');
    const client = new Client();
    require('dotenv').config();

    describe('client', () => {
        it('can login', () => {
            console.log('OKAY');
            console.log(client.user.tag);
        });
    });
});