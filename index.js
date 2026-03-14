const mineflayer = require('mineflayer');

// إعدادات الاتصال عبر المتغيرات البيئية (GitHub Secrets)
const botArgs = {
    host: process.env.SERVER_IP,
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: false // سيقوم Mineflayer بتحديد النسخة تلقائياً
};

let bot;

// دالة إنشاء البوت والتحكم في دورة حياته
function createBot() {
    bot = mineflayer.createBot(botArgs);

    // --- نظام الحماية Anti-AFK ---
    function startAntiAFK() {
        setInterval(() => {
            if (bot.entity) {
                // القفز
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);

                // تحريك الرأس عشوائياً (الالتفات)
                const yaw = Math.random() * Math.PI * 2;
                const pitch = (Math.random() - 0.5) * Math.PI;
                bot.look(yaw, pitch);

                console.log("[WEBORO-System] Anti-AFK: Movement performed to prevent kick.");
            }
        }, 30000); // حركة كل 30 ثانية لزيادة الأمان
    }

    // --- عند دخول البوت للسيرفر ---
    bot.on('spawn', () => {
        console.log(`[✔] ${bot.username} has joined the server.`);
        
        // تنفيذ أمر Creative لتأمين البوت من الموت
        bot.chat('/gamemode creative');
        
        // تفعيل نظام الحركة
        startAntiAFK();
    });

    // --- نظام معالجة الشات والأوامر ---
    bot.on('chat', (username, message) => {
        if (username === bot.username) return; // تجاهل رسائل البوت نفسه

        const msg = message.toLowerCase();

        if (msg === '!status') {
            bot.chat(`🌌 NEBULA-STATUS: Active | Health: ${Math.round(bot.health)}/20 | Food: ${Math.round(bot.food)}/20`);
        } 
        else if (msg === '!coords') {
            const pos = bot.entity.position;
            bot.chat(`📍 Current Location: X:${Math.round(pos.x)} Y:${Math.round(pos.y)} Z:${Math.round(pos.z)}`);
        }
        else if (msg === '!jump') {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 1000);
            bot.chat('🚀 Jumping high!');
        }
    });

    // --- نظام إعادة الاتصال التلقائي (Auto-Reconnect) ---
    bot.on('end', () => {
        console.log('[!] Disconnected. Reconnecting in 30 seconds...');
        setTimeout(createBot, 30000); // محاولة إعادة الاتصال بعد 30 ثانية
    });

    bot.on('error', (err) => {
        console.log(`[✘] Error: ${err.message}`);
    });

    // التعامل مع طرد البوت (Kicked)
    bot.on('kicked', (reason) => {
        console.log(`[!] Kicked for: ${reason}`);
    });
}

// تشغيل البوت لأول مرة
createBot();
