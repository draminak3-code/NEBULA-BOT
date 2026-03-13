const mineflayer = require('mineflayer');

// إعدادات البوت الاحترافية
const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE', // يتم جلب الآي بي من Variables في Railway
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline' // متوافق مع سيرفرات Aternos المكركة
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    // عند دخول البوت للسيرفر
    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن بنجاح على نسخة 1.21.11`);
        
        // نظام Anti-AFK (حركة عشوائية لمنع الطرد من Aternos)
        setInterval(() => {
            if (bot.entity) {
                const actions = ['jump', 'sneak'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 1000);
            }
        }, 30000);
    });

    // نظام الأوامر: إعطاء الـ Mace والـ Wind Charge
    bot.on('chat', (username, message) => {
        // ضع اسمك هنا لكي يستجيب البوت لك فقط
        const myMaster = 'Guerbous_Yassin'; 

        if (username === myMaster) {
            if (message === '!getmace') {
                bot.chat('✨ جاري استدعاء الـ Mace الأسطوري مع Wind Burst III...');
                // أمر الـ Mace مع أقوى التطويرات لنسخة 1.21.x
                const maceCmd = `/give ${username} mace[enchantments={levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}] 1`;
                bot.chat(maceCmd);
            } 
            
            else if (message === '!getwind') {
                bot.chat('🌪️ جاري إعطاؤك شحنات الرياح (Wind Charges)...');
                bot.chat(`/give ${username} wind_charge 64`);
            }
        }
    });

    // معالجة الانفصال وإعادة الاتصال التلقائي
    bot.on('end', (reason) => {
        console.log(`⚠️ تم الانفصال بسبب: ${reason}. جاري إعادة المحاولة خلال 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        if (err.message.includes('socketClosed')) {
            console.log('🔄 Aternos أغلق المقبس، جاري إعادة الاتصال...');
        } else {
            console.log(`❌ خطأ: ${err.message}`);
        }
    });
}

createBot(

    // دالة لجعل البوت يمسك الدرع تلقائياً
function equipShield() {
    const shield = bot.inventory.items().find(item => item.name === 'shield');
    if (shield) {
        bot.equip(shield, 'off-hand', (err) => {
            if (err) {
                console.log('❌ فشل في حمل الدرع:', err.message);
            } else {
                console.log('🛡️ NEBULA-BOT الآن يحمل الدرع');
            }
        });
    }
}

// تنفيذ المحاولة عند الدخول أو عند تغير الحقيبة
bot.on('spawn', equipShield);
bot.on('playerCollect', equipShield); // يحاول لبسه إذا التقطه من الأرض
);