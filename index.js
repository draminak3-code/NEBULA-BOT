const mineflayer = require('mineflayer');

// إعدادات السيرفر عبر GitHub Secrets
const serverConfig = {
    host: process.env.SERVER_IP,
    port: parseInt(process.env.SERVER_PORT) || 25565,
    version: false 
};

// قائمة الأسماء (تقدر تضيف أو تغير الأسماء هنا)
const botNames = ['NEBULA_AFK_1', 'NEBULA_AFK_2', 'NEBULA_AFK_3'];

function createBot(name) {
    const bot = mineflayer.createBot({
        ...serverConfig,
        username: name,
        hideErrors: true
    });

    // نظام الـ AFK الصامت (تحريك الرأس فقط لتجنب الطرد)
    function startAFK() {
        const interval = setInterval(() => {
            if (bot.entity) {
                // التفات عشوائي بسيط جداً
                bot.look(Math.random() * Math.PI * 2, 0);
            }
        }, 30000);
        bot.once('end', () => clearInterval(interval));
    }

    bot.on('spawn', () => {
        console.log(`[✔] ${name} has entered the server.`);
        
        // التحويل لنمط Survival لضمان الانجراف مع الماء والـ Knockback
        bot.chat('/gamemode survival');
        
        // إذا تبي تنقلهم لمكان المويه فوراً، فعل السطر اللي تحت وغير الإحداثيات
        // bot.chat('/tp 100 64 100'); 
        
        startAFK();
    });

    // --- أهم جزء: إلغاء المقاومة الفيزيائية ---
    bot.on('physicTick', () => {
        // تعطيل كل أزرار التحكم لترك البوت "جثة" منجرفة
        bot.setControlState('jump', false);
        bot.setControlState('forward', false);
        bot.setControlState('back', false);
        bot.setControlState('left', false);
        bot.setControlState('right', false);
        bot.setControlState('sneak', false);
        bot.setControlState('sprint', false);
        
        // تصفير أي تسارع داخلي لضمان الانصياع لتيار الماء فقط
        if (bot.entity) {
            bot.entity.velocity.x = bot.entity.velocity.x;
            bot.entity.velocity.z = bot.entity.velocity.z;
        }
    });

    // نظام إعادة الاتصال التلقائي والعشوائي
    bot.on('end', () => {
        const reconnectDelay = Math.floor(Math.random() * (60000 - 40000) + 40000);
        console.log(`[!] ${name} disconnected. Rejoining in ${reconnectDelay/1000}s...`);
        setTimeout(() => createBot(name), reconnectDelay);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
            console.log(`[!] ${name}: Connection error (Retrying in 15s)`);
            setTimeout(() => createBot(name), 15000);
        } else {
            console.log(`[✘] ${name} Critical Error: ${err.message}`);
        }
    });
}

// تشغيل البوتات بفاصل زمني (45 ثانية) لمنع حظر الـ IP من أترنوس
botNames.forEach((name, index) => {
    setTimeout(() => {
        console.log(`[→] Attempting to connect ${name}...`);
        createBot(name);
    }, index * 45000); 
});
