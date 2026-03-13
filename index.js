const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_SERVER_HERE', // يفضل استخدامه كمتغير بيئة في Railway
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'WEBORO_BOT',
    version: '1.16.5'
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log('✅ [WEBORO] البوت متصل الآن في السيرفر');
        // حركة عشوائية بسيطة كل 30 ثانية لمنع الطرد
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === '!ping') bot.chat('Pong! I am alive.');
    });

    // نظام إعادة التشغيل التلقائي عند الطرد أو التوقف
    bot.on('end', (reason) => {
        console.log(`⚠️ تم الانفصال بسبب: ${reason}. إعادة المحاولة بعد 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => console.log('❌ خطأ في الاتصال:', err));
}

createBot();