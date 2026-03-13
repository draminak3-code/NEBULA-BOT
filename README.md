# 🌌 NEBULA-BOT: The Ultimate 24/7 Minecraft Infrastructure

![Main Maintenance](https://img.shields.io/badge/Maintenance-Active-brightgreen.svg)
![Build](https://img.shields.io/badge/Build-Passing-success.svg)
![Security](https://img.shields.io/badge/Security-Hardened-blue.svg)
![Engine](https://img.shields.io/badge/Engine-Node.js_v20-darkgreen.svg)
![Agency](https://img.shields.io/badge/Developer-WEBORO_Creative_Agency-darkred.svg)

> **NEBULA-BOT** هو نظام محاكاة لاعب متقدم صُمم خصيصاً للعمل في بيئات الحوسبة السحابية (Cloud Computing) عبر GitHub Actions. الهدف الأساسي هو الحفاظ على استمرارية تشغيل السيرفرات (Keep-Alive Mechanism) ومنع إغلاقها التلقائي، مع توفير واجهة برمجية للتحكم عن بُعد.

---

## 📑 الفهرس (Table of Contents)
1. [المميزات المتقدمة](#-المميزات-المتقدمة)
2. [هيكلية النظام](#-هيكلية-النظام)
3. [دليل التثبيت السحابي](#-دليل-التثبيت-السحابي)
4. [الأوامر والتحكم الذكي](#-الأوامر-والتحكم-الذكي)
5. [موسوعة استكشاف الأخطاء (Troubleshooting Guide)](#-موسوعة-استكشاف-الأخطاء)
6. [التطوير المستقبلي](#-التطوير-المستقبلي)

---

## 🚀 المميزات المتقدمة (Advanced Features)

### 🧠 ذكاء التكييف مع السيرفر
البوت لا يقوم فقط بالدخول؛ بل يحلل حالة الـ Spawn ويقوم بتنفيذ بروتوكول الحماية (Protection Protocol) فوراً عبر تحويل نفسه لوضع الإبداع لضمان عدم التأثر بالعوامل البيئية داخل اللعبة.

### 🔄 بروتوكول إعادة الاتصال العنقودي
في حال سقوط السيرفر، يدخل البوت في وضع **Exponential Backoff** (محاولات متكررة بفواصل زمنية مدروسة) لضمان عدم حظر الآي بي الخاص بالـ Action من قبل حمايات السيرفر (Anti-DDoS).

### ⚡ استهلاك صفري للموارد (Zero-Resource Cost)
تم تحسين الكود ليعمل بأقل استهلاك للذاكرة العشوائية (RAM) داخل حاوية GitHub، مما يسمح بتشغيله لأسابيع دون حدوث Memory Leak.

---

## 🛠️ هيكلية النظام (Project Architecture)

- **GitHub Actions Workflow:** محرك التشغيل والجدولة الزمنية.
- **Virtual Machine Node.js 20:** بيئة التشغيل السحابية.
- **Mineflayer Instance:** المحرك البرمجي للبوت.
- **Encrypted Secrets:** حماية آي بي وبورت السيرفر.

---

## ⚙️ دليل التثبيت السحابي (Cloud Setup)

### 1. إعداد المتغيرات البيئية (Environment Variables)
يجب تشفير البيانات التالية داخل `Repository Secrets`:

| المفتاح | النوع | الوصف الفني |
| :--- | :--- | :--- |
| `SERVER_IP` | String | النطاق أو العنوان الرقمي للسيرفر |
| `SERVER_PORT` | Number | منفذ TCP (الافتراضي 25565) |

### 2. تهيئة الـ Workflow
ملف الـ `main.yml` مبرمج للعمل وفق ثلاث حالات:
1. **Push:** عند أي تعديل في الكود.
2. **Schedule:** إعادة تشغيل تلقائي كل 4 ساعات لتفريغ الكاش.
3. **Manual:** تشغيل يدوي عبر زر `Run Workflow`.

---

## 🕹️ الأوامر والتحكم الذكي (Control Interface)

يمكنك التفاعل مع البوت داخل اللعبة عبر الأوامر التالية (تتطلب رتبة OP):

| الأمر | الوظيفة |
| :--- | :--- |
| `!status` | عرض إحصائيات الاتصال وزمن التشغيل (Uptime). |
| `!jump` | تفعيل القفز المتكرر لتجاوز الـ Idle Timeout. |
| `!say [text]` | جعل البوت يتحدث نيابة عنك في السيرفر. |
| `!coords` | معرفة الإحداثيات الحالية للبوت داخل العالم. |

---

## 🆘 موسوعة استكشاف الأخطاء (Comprehensive Troubleshooting)

بصفتنا خبراء، قمنا بتوقع كافة السيناريوهات المحتملة:

### 1. خطأ `ECONNRESET` أو `ETIMEDOUT`
انقطاع مفاجئ في طبقة الـ TCP. غالباً ريستارت للسيرفر أو جدار حماية من الاستضافة. البوت مبرمج لمعالجة هذا الخطأ تلقائياً.

### 2. خطأ `Invalid Credentials`
السيرفر مفعل به خاصية الـ `Online Mode` والبوت يحاول الدخول بحساب مكرك. تأكد من إعداد السيرفر على `Online Mode: False`.

### 3. خطأ `You logged in from another location`
يحدث عند تشغيل أكثر من GitHub Action في نفس الوقت لنفس البوت. يجب إيقاف العمليات القديمة وترك واحدة فقط.

### 4. خطأ `Out of Memory` في GitHub Actions
تراكم السجلات أو كثرة البوتات في ريبوسيتوري واحد. يُفضل فصل بوتات التدريب عن البوت الأساسي.

### 5. حظر الآي بي (IP Blacklist)
محاولة الدخول المتكررة جداً (Spam Join). الكود الحالي يحتوي على Delay لمدة 30 ثانية لتجنب هذا الحظر.

### 6. خطأ `denied access to command`
بلجن الحماية (مثل Essentials) تمنع البوت من تنفيذ الأوامر. الحل هو كتابة `op NEBULA-BOT` في كونسول السيرفر.

---

## 📈 التطوير المستقبلي (Roadmap)
- [ ] إضافة نظام ذكاء اصطناعي للرد على الشات.
- [ ] نظام تسجيل فيديو (Recording) لما يحدث حول البوت.
- [ ] لوحة تحكم ويب (Web Dashboard) مرتبطة بـ WEBORO Agency.

---

## 👨‍💻 فريق التطوير (Development Team)

المشروع مدار بالكامل من قبل **Yassin (Guerbous Yassin)**، المدير التقني في **WEBORO**.

* **الموقع الرسمي:** [weboro.gt.tc](http://weboro.gt.tc)
* **الرؤية:** تحويل الأفكار البرمجية المعقدة إلى أدوات بسيطة وفعالة.

---
<p align="center">
  <b>Designed with ❤️ by WEBORO Creative Agency</b><br>
  <i>"Beyond the Limits of Code"</i>
</p>
