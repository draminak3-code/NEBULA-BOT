const mineflayer = require('mineflayer');

const botArgs = {
    host: process.env.SERVER_IP,
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: 'NEBULA-BOT',
    version: false 
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs);

    function startAntiAFK() {
        setInterval(() => {
            if (bot.entity) {
                // ألغينا القفز والمشي تماماً
                // نكتفي فقط بتغيير زاوية النظر (Look) كل 30 ثانية
                // هذه الحركة "وهمية" لا تمنع الماء من دفع الجسم
                const yaw = Math.random() * Math.PI * 2;
                bot.look(yaw, 0); 

                console.log("[WEBORO] Anti-AFK: Head rotation only. Physics is free.");
            }
        }, 30000); 
    }

    bot.on('spawn', () => {
        console.log(`[✔] ${bot.username} joined.`);
        bot.chat('/gamemode creative');
        startAntiAFK();
    });

    bot.on('end', () => {
        setTimeout(createBot, 30000); 
    });

    bot.on('error', (err) => console.log(`[✘] Error: ${err.message}`));
}

createBot();
