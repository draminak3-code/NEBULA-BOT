const mineflayer = require('mineflayer');

const botOptions = {
    host: process.env.SERVER_IP, 
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: '1.16.5', // تأكد من مطابقة نسخة السيرفر التي تتدرب عليها
    checkTimeoutInterval: 60000,
    auth: 'offline'
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    function setCreative() {
        console.log('🛠️ جاري تحويل NEBULA-BOT إلى وضع الـ Creative...');
        bot.chat(`/gamemode creative ${bot.username}`);
    }

    // دالة لجعل البوت يرفع الدرع ويحمي نفسه
    function startBlocking() {
        const offHandItem = bot.inventory.slots[45]; // فتحة اليد اليسرى
        if (offHandItem && offHandItem.name.includes('shield')) {
            bot.activateItem(true); // تفعيل الـ Right Click بشكل دائم
        }
    }

    bot.on('spawn', () => {
        console.log(`🌌 [NEBULA-BOT] متصل الآن بنجاح.`);
        setTimeout(setCreative, 2000);

        // تفعيل الدرع بشكل دوري للتأكد أنه مرفوع دائماً
        setInterval(() => {
            startBlocking();
        }, 1000);
    });

    bot.on('chat', async (username, message) => {
        const myMaster = 'draminak';
        if (username !== myMaster) return;

        if (message === '!dropmace') {
            bot.chat(`/execute at @s run summon item ~ ~1 ~ {Item:{id:"minecraft:mace",count:1,components:{"minecraft:enchantments":{levels:{"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:mending":1}}}}}`);
        }

        else if (message === '!shield') {
            // إعطاء البوت درع مطور ليصمد أمام الـ Mace
            bot.chat(`/give ${bot.username} minecraft:shield{Unbreakable:1b,Enchantments:[{id:"minecraft:unbreaking",lvl:3}]} 1`);
        }
    });

    // مراقبة الأيتمز: إذا حصل على درع يلبسه فوراً في اليد اليسرى ويبدأ الحماية
    bot.on('playerCollect', async () => {
        setTimeout(async () => {
            const shield = bot.inventory.items().find(item => item.name.includes('shield'));
            if (shield) {
                try {
                    await bot.equip(shield, 'off-hand');
                    startBlocking(); // ارفع الدرع فور اللبس
                } catch (err) {}
            }
        }, 500);
    });

    // في حال تغير المود، نضمن عودته لكرييتف واستمرار الحماية
    bot.on('game', () => {
        if (bot.game.gameMode !== 'creative') {
            setCreative();
        }
    });

    bot.on('error', (err) => console.log('❌ Error:', err.message));
    
    bot.on('end', () => {
        console.log('🔄 انقطع الاتصال، إعادة تشغيل بعد 15 ثانية...');
        setTimeout(createBot, 15000);
    });
}

createBot();

// نظام GitHub Actions لإعادة التشغيل
setTimeout(() => {
    process.exit(0);
}, 18000000);
