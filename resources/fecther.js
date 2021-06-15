

module.exports = async(url) => {
    return await new Promise(resolve => {
        require('request')({
            uri: url
        }, (err, res) => {
            if (!err && JSON.parse(res.body) && res.statusCode == 200) {
                resolve(JSON.parse(res.body));
            } else {
                resolve();
            }
        });
    });
}