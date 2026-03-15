const mineflayer = require('mineflayer');

const serverConfig = {
    host: process.env.SERVER_IP,
    port: parseInt(process.env.SERVER_PORT) || 25565,
    version: false 
};

const botNames = ['NEBULA_AFK_1', 'NEBULA_AFK_2', 'NEBULA_AFK_3'];

function createBot(name) {
    const bot = mineflayer.createBot({
        ...serverConfig,
        username: name,
        hideErrors: true
    });

    function startAFK() {
        const interval = setInterval(() => {
            if (bot.entity) {
                bot.look(Math.random() * Math.PI * 2, 0);
            }
        }, 30000);
        bot.once('end', () => clearInterval(interval));
    }

    bot.on('spawn', () => {
        console.log(`[✔] ${name} spawned. Setting survival mode in 5s...`);
        
        // تأخير 5 ثواني لضمان استقرار البوت في السيرفر قبل إرسال الأمر
        setTimeout(() => {
            bot.chat('/gamemode survival');
            console.log(`[⚡] ${name}: Executed /gamemode survival`);
        }, 5000);
        
        startAFK();
    });

    // لضمان بقائهم في السيرفايفل وعدم مقاومتهم للماء
    bot.on('physicTick', () => {
        bot.setControlState('jump', false);
        bot.setControlState('forward', false);
        bot.setControlState('back', false);
        bot.setControlState('left', false);
        bot.setControlState('right', false);
        bot.setControlState('sneak', false);
        bot.setControlState('sprint', false);
        
        if (bot.entity) {
            bot.entity.velocity.x = bot.entity.velocity.x;
            bot.entity.velocity.z = bot.entity.velocity.z;
        }
    });

    bot.on('end', () => {
        const reconnectDelay = Math.floor(Math.random() * (60000 - 40000) + 40000);
        console.log(`[!] ${name} disconnected. Rejoining in ${reconnectDelay/1000}s...`);
        setTimeout(() => createBot(name), reconnectDelay);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
            setTimeout(() => createBot(name), 15000);
        }
    });
}

botNames.forEach((name, index) => {
    setTimeout(() => {
        console.log(`[→] Attempting to connect ${name}...`);
        createBot(name);
    }, index * 45000); 
});
