const mineflayer = require('mineflayer');

const serverConfig = {
    host: process.env.SERVER_IP,
    port: parseInt(process.env.SERVER_PORT) || 25565,
    version: false 
};

const afkBotNames = ['NEBULA_AFK_1', 'NEBULA_AFK_2', 'NEBULA_AFK_3'];

function createAFKBot(name) {
    const bot = mineflayer.createBot({
        ...serverConfig,
        username: name,
        hideErrors: true
    });

    // نظام الـ AFK الصامت
    function startSilentAFK() {
        const interval = setInterval(() => {
            if (bot.entity) {
                bot.look(Math.random() * Math.PI * 2, 0);
            }
        }, 40000);
        bot.once('end', () => clearInterval(interval));
    }

    bot.on('spawn', () => {
        console.log(`[✔] ${name} has entered and is now stable.`);
        bot.chat('/gamemode creative');
        startSilentAFK();
    });

    bot.on('physicTick', () => {
        bot.setControlState('jump', false);
        bot.setControlState('forward', false);
    });

    bot.on('end', () => {
        // إذا فصل، ينتظر وقت عشوائي ثم يعود
        const reconnectDelay = Math.floor(Math.random() * (60000 - 40000) + 40000);
        console.log(`[!] ${name} disconnected. Rejoining in ${reconnectDelay/1000}s...`);
        setTimeout(() => createAFKBot(name), reconnectDelay);
    });

    bot.on('error', (err) => {
        // إذا حدث خطأ في البداية (مثل ECONNRESET)، يعيد المحاولة فوراً للبوت رقم 1
        if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
            console.log(`[!] ${name} failed to connect initially. Retrying...`);
            setTimeout(() => createAFKBot(name), 10000);
        }
    });
}

// تشغيل البوتات بفاصل زمني أطول (40 ثانية) لضمان استقرار الـ IP
afkBotNames.forEach((name, index) => {
    setTimeout(() => {
        console.log(`[→] Attempting to connect ${name}...`);
        createAFKBot(name);
    }, index * 40000); 
});
