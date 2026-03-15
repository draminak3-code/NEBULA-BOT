const mineflayer = require('mineflayer');

// إعدادات الاتصال عبر GitHub Secrets
const serverConfig = {
    host: process.env.SERVER_IP,
    port: parseInt(process.env.SERVER_PORT) || 25565,
    version: false // تحديد النسخة تلقائياً
};

// قائمة أسماء بوتات الـ AFK (يمكنك زيادة الأسماء كما تشاء)
const afkBotNames = ['NEBULA_AFK_1', 'NEBULA_AFK_2', 'NEBULA_AFK_3'];

function createAFKBot(name) {
    const bot = mineflayer.createBot({
        ...serverConfig,
        username: name
    });

    // --- نظام الـ AFK الصامت ---
    function startSilentAFK() {
        setInterval(() => {
            if (bot.entity) {
                // تحريك الرأس فقط لتجنب كشف الخمول
                bot.look(Math.random() * Math.PI * 2, 0);
                console.log(`[AFK-System] ${name}: Active and flowing with water.`);
            }
        }, 30000); // كل 30 ثانية
    }

    bot.on('spawn', () => {
        console.log(`[✔] ${name} joined for AFK duty.`);
        bot.chat('/gamemode creative'); // تأمين البوت
        startSilentAFK();
    });

    // إيقاف أي حركة برمجية لضمان الانجراف التام مع تيارات المياه
    bot.on('physicTick', () => {
        bot.setControlState('jump', false);
        bot.setControlState('forward', false);
        bot.setControlState('back', false);
        bot.setControlState('left', false);
        bot.setControlState('right', false);
    });

    // إعادة الاتصال التلقائي
    bot.on('end', () => {
        console.log(`[!] ${name} disconnected. Reconnecting in 30 seconds...`);
        setTimeout(() => createAFKBot(name), 30000);
    });

    bot.on('error', (err) => {
        console.log(`[✘] ${name} Error: ${err.message}`);
    });
}

// تشغيل مصفوفة البوتات
afkBotNames.forEach(name => {
    createAFKBot(name);
});
