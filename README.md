# 🌌 NEBULA-BOT | 24/7 Minecraft Server Keeper

![Version](https://img.shields.io/badge/version-1.2.1-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)
![Mineflayer](https://img.shields.io/badge/Mineflayer-Latest-orange.svg)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Active-success.svg)
![Developer](https://img.shields.io/badge/Developed_by-WEBORO-darkred.svg)

بوت ماين كرافت احترافي ومستقل، مبرمج بلغة **Node.js** ومكتبة **Mineflayer**. تم تصميم هذا البوت خصيصاً لإبقاء سيرفرات ماين كرافت (مثل Aternos) متصلة بالإنترنت وتعمل على مدار الساعة (24/7) دون الحاجة لأي استضافة مدفوعة، معتمداً كلياً على بيئة تشغيل **GitHub Actions**.

---

## ✨ المميزات الرئيسية (Features)

- **استضافة مجانية 100%:** يعمل بالكامل على خوادم GitHub Actions.
- **اتصال دائم (24/7):** نظام إعادة اتصال تلقائي (Auto-Reconnect) ذكي عند انقطاع السيرفر.
- **التوافق التام:** يدعم أحدث إصدارات ماين كرافت (1.21+) بالإضافة للإصدارات المستقرة.
- **نظام الحماية (Anti-AFK):** يتفادى الطرد من السيرفرات بسبب الخمول.
- **كود نظيف (Clean Code):** خالٍ من أي ارتباطات بمنصات خارجية مثل Railway.

---

## 🚀 طريقة التشغيل والإعداد (Setup & Installation)

بما أن المشروع يعتمد على الـ Actions، لا تحتاج لتشغيل أي شيء على جهازك الشخصي. فقط اتبع الخطوات التالية:

### 1. إعداد المتغيرات السرية (Repository Secrets)
اذهب إلى إعدادات المستودع (Settings) -> ثم (Secrets and variables) -> ثم (Actions) وقم بإضافة المتغيرات التالية:
- `SERVER_IP`: عنوان الآي بي الخاص بالسيرفر (مثال: `nebula.aternos.me`).
- `SERVER_PORT`: البورت الخاص بالسيرفر (مثال: `25565` أو البورت المخصص لك).

### 2. تفعيل سير العمل (Enable Workflow)
- اذهب إلى تبويب **Actions** في أعلى المستودع.
- اضغط على **"I understand my workflows, go ahead and enable them"** (إذا ظهرت لك).
- اضغط على Workflow المسمى **NEBULA-BOT 24/7** واختر **Run workflow**.

---

## 🛠️ البنية التقنية (Tech Stack)

- **اللغة:** JavaScript (Node.js v20.x)
- **المكتبة الأساسية:** [Mineflayer](https://github.com/PrismarineJS/mineflayer)
- **بيئة التشغيل (CI/CD):** GitHub Actions

---

## 📄 ملاحظات هامة (Important Notes)

- تأكد من إعطاء البوت رتبة **Operator (OP)** في السيرفر ليتمكن من الدخول في وضع الإبداع (Creative Mode) وتنفيذ الأوامر.
- إذا كنت تستخدم سيرفرات Aternos، راقب الـ Console للتأكد من عدم وجود إضافات (Plugins) تمنع البوت من تنفيذ الأوامر مثل `/gamemode`.

---

<div align="center">
  <b>تم التطوير والبرمجة بواسطة <a href="http://weboro.gt.tc">WEBORO Agency</a> © 2026</b><br>
  <i>"نصنع حلولاً برمجية ذكية"</i>
</div>
