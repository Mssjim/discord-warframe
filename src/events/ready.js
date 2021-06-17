module.exports = client => {
    client.on('ready', () => {
        console.log(`\x1b[36m====================================\x1b[0m`);
        console.log(`${client.user.tag} Ready!`);
    });
}