const mineflayer = require('mineflayer');

// إعدادات البوت - سيتم جلب الـ IP من إعدادات Railway لزيادة الأمان
const botOptions = {
    host: process.env.SERVER_IP || 'nebula-adho.aternos.me', // ضع الآي بي هنا أو في Variables
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11' // الإصدار المطلوب بدقة
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`✨ [NEBULA] تم تسجيل الدخول بنجاح كـ ${bot.username}`);
        
        // نظام حركة ذكي (يتحرك قليلاً كل 40 ثانية لمنع الطرد)
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 40000);
    });

    // الرد التلقائي للتأكد من أن البوت يعمل
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message.toLowerCase() === '!info') {
            bot.chat('I am NEBULA-BOT, maintaining this server 24/7.');
        }
    });

    // إعادة الاتصال التلقائي (Auto-Reconnect)
    bot.on('end', (reason) => {
        console.log(`⚠️ تم قطع الاتصال: ${reason}. جاري إعادة المحاولة خلال 10 ثوانٍ...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log(`❌ خطأ تقني: ${err.message}`);
    });
}

createBot();