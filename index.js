// وظيفة الحركة العشوائية لمنع الطرد (Anti-AFK)
function startAntiAFK(bot) {
  setInterval(() => {
    // يجعل البوت يقفز
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);

    // حركة عشوائية لليمين أو اليسار
    const yaw = Math.random() * Math.PI * 2;
    bot.look(yaw, 0); 
    
    console.log("Anti-AFK: البوت قام بحركة لتجنب الطرد");
  }, 60000); // يتحرك كل 60 ثانية (دقيقة واحدة)
}

// استدعاء الوظيفة عند دخول البوت للسيرفر
bot.on('spawn', () => {
  console.log("تم دخول البوت بنجاح!");
  bot.chat('/gamemode creative'); // تأمين البوت
  startAntiAFK(bot); // تشغيل نظام الحركة
});
