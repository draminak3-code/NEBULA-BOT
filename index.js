const mineflayer = require('mineflayer');

// إعدادات البوت الاحترافية لنسخة 1.21.11
const botOptions = {
    host: process.env.SERVER_IP || 'IP_SERVER_HERE', // سيتم جلبه من Railway Variables
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000, // حل مشكلة socketClosed بتمديد وقت الانتظار
    auth: 'offline' // ضروري لسيرفرات Aternos المكركة
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    // عند دخول البوت للسيرفر
    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن بنجاح على نسخة 1.21.11`);
        
        // نظام Anti-AFK احترافي (حركة عشوائية لمنع كشف البوتات)
        setInterval(() => {
            if (bot.entity) {
                const actions = ['jump', 'sneak'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 1000);
                
                // تدوير الرأس بشكل عشوائي ليبدو كلاعب حقيقي
                const yaw = (Math.random() - 0.5) * Math.PI;
                const pitch = (Math.random() - 0.5) * Math.PI;
                bot.look(yaw, pitch);
            }
        }, 30000);
    });

    // الرد على الأوامر في الشات
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === '!status') {
            bot.chat('NEBULA-BOT is online 24/7! ✨');
        }
    });

    // معالجة الأخطاء والانفصال (Auto-Reconnect)
    bot.on('end', (reason) => {
        console.log(`⚠️ تم الانفصال بسبب: ${reason}. إعادة المحاولة خلال 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        if (err.message.includes('socketClosed')) {
            console.log('🔄 تنبيه: تم إغلاق المقبس (Socket)، جاري إعادة الاتصال تلقائياً...');
        } else {
            console.log(`❌ خطأ تقني: ${err.message}`);
        }
    });

    // منع البوت من التوقف عند حدوث خطأ غير متوقع
    bot.on('kicked', (reason) => {
        console.log(`❌ تم طرد البوت: ${reason}`);
    });
}

// تشغيل العملية
createBot();