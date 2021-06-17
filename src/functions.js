module.exports.etaTime = date => {
    let millis = date.getTime() - Date.now();

    if (typeof millis !== 'number') {
        throw new TypeError('millis should be a number');
    }
    const eta = [];
    let seconds = Math.abs(millis / 1000);

    const duration = {
        "day": 60*60*24,
        "hour": 60*60,
        "minute": 60
    }
    
    if (seconds >= duration.day) {
        eta.push(`${Math.floor(seconds / duration.day)}d`);
        seconds = Math.floor(seconds) % duration.day;
    }
    
    if (seconds >= duration.hour) {
        eta.push(`${Math.floor(seconds / duration.hour)}h`);
        seconds = Math.floor(seconds) % duration.hour;
    }
    
    if (seconds >= duration.minute) {
        eta.push(`${Math.floor(seconds / duration.minute)}m`);
        seconds = Math.floor(seconds) % duration.minute;
    }
    
    if (seconds >= 0) {
        eta.push(`${Math.floor(seconds)}s`);
    }
    return eta.join(' ');
}

module.exports.fetcher = async(url) => {
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