const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP, 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.21.11',
    checkTimeoutInterval: 60000,
    auth: 'offline'
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    // دالة لتغيير وضع البوت إلى Creative
    function setCreative() {
        console.log('🛠️ جاري تحويل NEBULA-BOT إلى وضع الـ Creative...');
        bot.chat(`/gamemode creative ${bot.username}`);
    }

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن بنجاح.`);
        
        // تحويله لكرييتف فور دخوله
        setTimeout(setCreative, 2000);

        // نظام حماية: إذا تغير الوضع لـ Survival بالخطأ، يعيد نفسه للكرييتف
        bot.on('game', () => {
            if (bot.game.gameMode !== 'creative') {
                setCreative();
            }
        });
    });

    bot.on('chat', async (username, message) => {
        const myMaster = 'draminak';
        if (username !== myMaster) return;

        // أمر الـ Mace (الاستدعاء والرمي)
        if (message === '!dropmace') {
            bot.chat(`/execute at @s run summon item ~ ~1 ~ {Item:{id:"minecraft:mace",count:1,components:{"minecraft:enchantments":{levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}}}}`);
        }

        // أمر الدرع (سيعطي نفسه الدرع ويلبسه تلقائياً)
        else if (message === '!shield') {
            bot.chat(`/give ${bot.username} shield 1`);
        }
    });

    // دالة لبس الدرع تلقائياً (بما أنه كرييتف يستطيع حمل أي شيء)
    bot.on('playerCollect', () => {
        const shield = bot.inventory.items().find(item => item.name.includes('shield'));
        if (shield) bot.equip(shield, 'off-hand').catch(() => {});
    });

    bot.on('error', (err) => console.log('❌ Error:', err.message));
    
    bot.on('end', () => {
        setTimeout(createBot, 15000);
    });
}

createBot();

// إعادة تشغيل دورية للـ GitHub Action
setTimeout(() => {
    process.exit(0);
}, 18000000);