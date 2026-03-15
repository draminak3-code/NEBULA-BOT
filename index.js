const mineflayer = require('mineflayer');

const serverConfig = {
    host: process.env.SERVER_IP,
    port: parseInt(process.env.SERVER_PORT) || 25565,
    version: false 
};

// قائمة الأسماء (يفضل أن تكون مختلفة قليلاً لتجنب الفلتر)
const afkBotNames = ['NEBULA_AFK_1', 'NEBULA_AFK_2', 'NEBULA_AFK_3'];

function createAFKBot(name) {
    const bot = mineflayer.createBot({
        ...serverConfig,
        username: name,
        hideErrors: true // إخفاء الأخطاء المزعجة من الكونسول
    });

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
        // منع أي حركة قد تؤدي لتعليق البوت أو طرده
        bot.setControlState('jump', false);
        bot.setControlState('forward', false);
    });

    bot.on('end', () => {
        // وقت عشوائي لإعادة الاتصال لتجنب التصادم بين البوتات
        const reconnectDelay = Math.floor(Math.random() * (60000 - 40000) + 40000);
        console.log(`[!] ${name} out. Rejoining in ${reconnectDelay/1000}s...`);
        setTimeout(() => createAFKBot(name), reconnectDelay);
    });

    bot.on('error', (err) => {
        // تجاهل ECONNRESET لأنه سيحاول مرة أخرى تلقائياً
        if (err.code !== 'ECONNRESET') {
            console.log(`[✘] ${name} Error: ${err.message}`);
        }
    });
}

// زيادة الفاصل الزمني لـ 30 ثانية بين كل بوت لضمان دخول الجميع
afkBotNames.forEach((name, index) => {
    setTimeout(() => {
        console.log(`[→] Attempting to connect ${name}...`);
        createAFKBot(name);
    }, index * 30000); 
});
