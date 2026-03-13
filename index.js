const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE', 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11' // النسخة المطلوبة بدقة
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن بنجاح على نسخة 1.21.11`);
        
        // نظام Anti-AFK احترافي (حركة خفيفة كل 20 ثانية)
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 400);
            }
        }, 20000);
    });

    // الرد على الأوامر للتأكد من الحالة
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === '!status') {
            bot.chat('NEBULA-BOT is active on 1.21.11 and keeping the server alive! ✨');
        }
    });

    // إعادة الاتصال التلقائي في حال الفصل
    bot.on('end', (reason) => {
        console.log(`⚠️ تم الانفصال: ${reason}. جاري إعادة التشغيل...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('❌ خطأ في الاتصال:', err));
}

createBot();