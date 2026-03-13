const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE', 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline' 
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن. بانتظار أوامرك يا draminak!`);
        
        // نظام Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                const actions = ['jump', 'sneak'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 1000);
            }
        }, 30000);
    });

    // نظام الأوامر المخصص لـ draminak
    bot.on('chat', (username, message) => {
        // اسمك في اللعبة هو المفتاح
        const myMaster = 'draminak'; 

        if (username === myMaster) {
            if (message === '!getmace') {
                bot.chat('✨ جاري إرسال الـ Mace الأسطوري إليك يا draminak...');
                // أمر الـ Mace مع أقوى التطويرات (Wind Burst III, Density V, Breach IV)
                const maceCmd = `/give ${username} mace[enchantments={levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}] 1`;
                bot.chat(maceCmd);
            } 
            
            else if (message === '!getwind') {
                bot.chat('🌪️ استلم شحنات الرياح لتطير بالميس!');
                bot.chat(`/give ${username} wind_charge 64`);
            }
        }
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ انفصال (${reason}). إعادة اتصال خلال 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log(`❌ خطأ: ${err.message}`);
    });
}

createBot();const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE', 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline' 
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن. بانتظار أوامرك يا draminak!`);
        
        // نظام Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                const actions = ['jump', 'sneak'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 1000);
            }
        }, 30000);
    });

    // نظام الأوامر المخصص لـ draminak
    bot.on('chat', (username, message) => {
        // اسمك في اللعبة هو المفتاح
        const myMaster = 'draminak'; 

        if (username === myMaster) {
            if (message === '!getmace') {
                bot.chat('✨ جاري إرسال الـ Mace الأسطوري إليك يا draminak...');
                // أمر الـ Mace مع أقوى التطويرات (Wind Burst III, Density V, Breach IV)
                const maceCmd = `/give ${username} mace[enchantments={levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}] 1`;
                bot.chat(maceCmd);
            } 
            
            else if (message === '!getwind') {
                bot.chat('🌪️ استلم شحنات الرياح لتطير بالميس!');
                bot.chat(`/give ${username} wind_charge 64`);
            }
        }
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ انفصال (${reason}). إعادة اتصال خلال 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log(`❌ خطأ: ${err.message}`);
    });
}

createBot();const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE', 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline' 
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن. بانتظار أوامرك يا draminak!`);
        
        // نظام Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                const actions = ['jump', 'sneak'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 1000);
            }
        }, 30000);
    });

    // نظام الأوامر المخصص لـ draminak
    bot.on('chat', (username, message) => {
        // اسمك في اللعبة هو المفتاح
        const myMaster = 'draminak'; 

        if (username === myMaster) {
            if (message === '!getmace') {
                bot.chat('✨ جاري إرسال الـ Mace الأسطوري إليك يا draminak...');
                // أمر الـ Mace مع أقوى التطويرات (Wind Burst III, Density V, Breach IV)
                const maceCmd = `/give ${username} mace[enchantments={levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}] 1`;
                bot.chat(maceCmd);
            } 
            
            else if (message === '!getwind') {
                bot.chat('🌪️ استلم شحنات الرياح لتطير بالميس!');
                bot.chat(`/give ${username} wind_charge 64`);
            }
        }
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ انفصال (${reason}). إعادة اتصال خلال 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log(`❌ خطأ: ${err.message}`);
    });
}

createBot();const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE', 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline' 
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن. بانتظار أوامرك يا draminak!`);
        
        // نظام Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                const actions = ['jump', 'sneak'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 1000);
            }
        }, 30000);
    });

    // نظام الأوامر المخصص لـ draminak
    bot.on('chat', (username, message) => {
        // اسمك في اللعبة هو المفتاح
        const myMaster = 'draminak'; 

        if (username === myMaster) {
            if (message === '!getmace') {
                bot.chat('✨ جاري إرسال الـ Mace الأسطوري إليك يا draminak...');
                // أمر الـ Mace مع أقوى التطويرات (Wind Burst III, Density V, Breach IV)
                const maceCmd = `/give ${username} mace[enchantments={levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}] 1`;
                bot.chat(maceCmd);
            } 
            
            else if (message === '!getwind') {
                bot.chat('🌪️ استلم شحنات الرياح لتطير بالميس!');
                bot.chat(`/give ${username} wind_charge 64`);
            }
        }
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ انفصال (${reason}). إعادة اتصال خلال 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log(`❌ خطأ: ${err.message}`);
    });
}

createBot();const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE', 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline' 
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن. بانتظار أوامرك يا draminak!`);
        
        // نظام Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                const actions = ['jump', 'sneak'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 1000);
            }
        }, 30000);
    });

    // نظام الأوامر المخصص لـ draminak
    bot.on('chat', (username, message) => {
        // اسمك في اللعبة هو المفتاح
        const myMaster = 'draminak'; 

        if (username === myMaster) {
            if (message === '!getmace') {
                bot.chat('✨ جاري إرسال الـ Mace الأسطوري إليك يا draminak...');
                // أمر الـ Mace مع أقوى التطويرات (Wind Burst III, Density V, Breach IV)
                const maceCmd = `/give ${username} mace[enchantments={levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}] 1`;
                bot.chat(maceCmd);
            } 
            
            else if (message === '!getwind') {
                bot.chat('🌪️ استلم شحنات الرياح لتطير بالميس!');
                bot.chat(`/give ${username} wind_charge 64`);
            }
        }
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ انفصال (${reason}). إعادة اتصال خلال 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log(`❌ خطأ: ${err.message}`);
    });
}

createBot();const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE', 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline' 
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن. بانتظار أوامرك يا draminak!`);
        
        // نظام Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                const actions = ['jump', 'sneak'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 1000);
            }
        }, 30000);
    });

    // نظام الأوامر المخصص لـ draminak
    bot.on('chat', (username, message) => {
        // اسمك في اللعبة هو المفتاح
        const myMaster = 'draminak'; 

        if (username === myMaster) {
            if (message === '!getmace') {
                bot.chat('✨ جاري إرسال الـ Mace الأسطوري إليك يا draminak...');
                // أمر الـ Mace مع أقوى التطويرات (Wind Burst III, Density V, Breach IV)
                const maceCmd = `/give ${username} mace[enchantments={levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}] 1`;
                bot.chat(maceCmd);
            } 
            
            else if (message === '!getwind') {
                bot.chat('🌪️ استلم شحنات الرياح لتطير بالميس!');
                bot.chat(`/give ${username} wind_charge 64`);
            }
        }
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ انفصال (${reason}). إعادة اتصال خلال 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log(`❌ خطأ: ${err.message}`);
    });
}

createBot();