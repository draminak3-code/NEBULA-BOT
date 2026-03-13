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

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن. بانتظار أوامرك يا draminak!`);
        
        // نظام Anti-AFK احترافي للبقاء متصلاً 24/7
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // نظام الأوامر المخصص لـ draminak
    bot.on('chat', (username, message) => {
        const myMaster = 'draminak'; 

        if (username === myMaster) {
            // أمر استدعاء ورمي الميس الأسطوري
            if (message === '!dropmace') {
                bot.chat('📦 جاري استدعاء ورمي الـ Mace الأسطوري بأقوى تطويرات...');
                
                // الأمر يستخدم نظام Components الخاص بنسخة 1.21.1+
                const summonCmd = `/execute at @s run summon item ~ ~1 ~ {Item:{id:"minecraft:mace",count:1,components:{"minecraft:enchantments":{levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}}}}`;
                
                bot.chat(summonCmd);
            } 
            
            // أمر إعطاء شحنات الرياح (Wind Charges)
            else if (message === '!getwind') {
                bot.chat('🌪️ استلم شحنات الرياح يا draminak!');
                bot.chat(`/give ${username} wind_charge 64`);
            }
        }
    });

    // إعادة الاتصال التلقائي في حال الانفصال
    bot.on('end', (reason) => {
        console.log(`⚠️ تم الانفصال: ${reason}. إعادة المحاولة بعد 15 ثانية...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log(`❌ خطأ تقني: ${err.message}`);
    });
}

createBot();