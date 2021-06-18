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

module.exports.getSimillarCommands = (commands, cmd) => {
    const errorRules = [1, 1, 1, 1, 1, 2, 2, 3]; // Max accepted errors [array index = word length]
    const adjacents = {
        a: ['q', 'w', 's', 'z'],
        b: ['v', 'g', 'h', 'n'],
        c: ['x', 'd', 'f', 'v'],
        d: ['s', 'w', 'e', 'r', 'f', 'c', 'x'],
        e: ['w', '3', '4', 'r', 'f', 'd', 's'],
        f: ['d', 'e', 'r', 't', 'g', 'v', 'c'],
        g: ['f', 'r', 't', 'y', 'h', 'b', 'v'],
        h: ['g', 't', 'y', 'u', 'j', 'n', 'b'],
        i: ['u', '8', '9', 'o', 'l', 'k', 'j'],
        j: ['h', 'y', 'u', 'i', 'k', 'm', 'n'],
        k: ['j', 'u', 'i', 'o', 'l', 'm'],
        l: ['k', 'i', 'o', 'p', 'n'],
        m: ['n', 'j', 'k'],
        n: ['b', 'h', 'j', 'm', 'i', 'o', 'p'],
        o: ['i', '9', '0', 'p', 'n', 'l', 'k'],
        p: ['o', '9', '0', 'n', 'l'],
        q: ['1', '2', 'w', 's', 'a'],
        r: ['e', '4', '5', 't', 'g', 'f', 'd'],
        s: ['a', 'q', 'w', 'e', 'd', 'x', 'z'],
        t: ['r', '5', '6', 'y', 'h', 'g', 'f', 'r'],
        u: ['y', '7', '8', 'i', 'k', 'j', 'h'],
        v: ['c', 'f', 'g', 'b'],
        w: ['q', '2', '3', 'e', 'd', 's', 'a'],
        x: ['z', 's', 'd', 'c'],
        y: ['t', '6', '7', 'u', 'j', 'h', 'g'],
        z: ['a', 's', 'x'],
        0: ['9', 'p', 'o'],
        1: ['2', 'q'],
        2: ['1', '3', 'w', 'q'],
        3: ['2', '4', 'e', 'w'],
        4: ['3', '5', 'r', 'e'],
        5: ['4', '6', 't', 'r'],
        6: ['5', '7', 'y', 't'],
        7: ['6', '8', 'u', 'y'],
        8: ['7', '9', 'i', 'u'],
        9: ['8', '0', 'o', 'i'],
    };
    
    const normalize = string => { // TODO Maybe need to remove repeat chars
        return string
            .normalize('NFD') // To separe acents from chars
            .replace(/[\u0300-\u036f]/g, '');
    };

    const shiftLetters = (cmd, i) => { // Shift '[i]' and [i+1] char positions
        return cmd.substring(0, i) + cmd[i+1] + cmd[i] + cmd.substring(i+2, cmd.length);
    };
    
    const compare = (cmd1, cmd2) => {
        for(let i = 0; i < cmd1.length; i++) // Check if 'cmd1' has a missing char
            if(cmd1 == cmd2.slice(0, i) + cmd2.slice(i+1)) return true;

        for(let i = 0; i < cmd1.length; i++) // Check if 'cmd2' has a missing char
            if(cmd2 == cmd1.slice(0, i) + cmd1.slice(i+1)) return true;
        
        const maxLen = Math.max(cmd1.length, cmd2.length);
        const maxErrors = errorRules[maxLen] || errorRules[errorRules.length-1];

        let errors = 0;
        for(let i = 0; i < maxLen; i++) {
            const adj = adjacents[cmd1[i]] || [];
            if (cmd1[i] != cmd2[i]) {
                errors++;
                if(!adj.includes(cmd2[i])) return false;
                if(errors > maxErrors) return false;
            }
        }
        return true;
    };

    let simillarCommands = []; // Simillar Commands

    commands.forEach(command => {
        const cmd1 = normalize(command);
        const cmd2 = normalize(cmd);

        for(let i = 0; i < cmd2.length; i++) {
            if(i == 0) {
                if(compare(cmd1, cmd2)) {
                    simillarCommands.push(command);
                    break;
                }
            } else {
                if(compare(cmd1, shiftLetters(cmd2, i-1))) {
                    simillarCommands.push(command);
                    break;
                }
            }
        }
    });

    return simillarCommands;
}