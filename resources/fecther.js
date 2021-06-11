module.exports = async(url) => {
    return await new Promise((resolve, reject) => {
        require('request')({
            uri: url
        }, (err, res, body) => {
            if (!err) {
                var result = JSON.parse(body);
                if (result != null && result != undefined)
                    resolve(result)
                else
                    reject('Erro, apenas')
            }
        });
    });
}