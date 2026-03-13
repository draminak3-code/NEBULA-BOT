const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP || 'IP_HERE',
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline'
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    // دالة آمنة للبس الدرع لمنع الكراش
    async function equipShield() {
        try {
            const shield = bot.inventory.items().find(item => item.name.includes('shield'));
            if (shield) {
                await bot.equip(shield, 'off-hand');
                console.log('🛡️ تم تجهيز الدرع بنجاح');
            }
        } catch (err) {
            console.log('⚠️ خطأ بسيط في التجهيز (تم التجاهل لمنع الكراش):', err.message);
        }
    }

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل وجاهز يا draminak!`);
        // انتظر قليلاً بعد الدخول قبل لبس أي شيء لضمان تحميل الحقيبة
        setTimeout(equipShield, 2000);
    });

    bot.on('chat', async (username, message) => {
        const myMaster = 'draminak';
        if (username !== myMaster) return;

        // أمر الميس (رمي)
        if (message === '!dropmace') {
            bot.chat(`/execute at @s run summon item ~ ~1 ~ {Item:{id:"minecraft:mace",count:1,components:{"minecraft:enchantments":{levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}}}}`);
        }

        // أمر الدرع
        else if (message === '!shield') {
            bot.chat(`/give ${bot.username} shield 1`);
            // انتظر ثانية حتى يستلم البوت الدرع ثم يلبسه
            setTimeout(equipShield, 1500);
        }

        // وضع الدفاع (Block)
        else if (message === '!block') {
            bot.activateItem(true); 
        }

        // إلغاء الدفاع
        else if (message === '!unblock') {
            bot.deactivateItem();
        }
    });

    // أهم جزء لمنع الكراش: معالجة الأخطاء العالمية
    bot.on('error', (err) => console.log('❌ خطأ في البوت:', err.message));
    bot.on('kicked', (reason) => console.log('❌ تم الطرد:', reason));
    
    bot.on('end', (reason) => {
        console.log(`🔄 انفصلنا بسبب ${reason}.. إعادة تشغيل خلال 15 ثانية`);
        setTimeout(createBot, 15000);
    });
}

createBot();