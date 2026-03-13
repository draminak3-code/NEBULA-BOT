🌌 NEBULA-BOT: The Definitive 24/7 Minecraft Infrastructure

NEBULA-BOT هو نظام محاكاة لاعب متقدم مصمم للعمل في بيئات الحوسبة السحابية (Cloud Computing) عبر GitHub Actions. الهدف الأساسي هو الحفاظ على استمرارية تشغيل السيرفرات (Keep-Alive Mechanism) ومنع إغلاقها التلقائي، مع توفير واجهة برمجية للتحكم عن بُعد.

📑 الفهرس (Table of Contents)

المميزات المتقدمة

هيكلية النظام

دليل التثبيت السحابي

الأوامر والتحكم الذكي

موسوعة استكشاف الأخطاء (Troubleshooting Guide)

التطوير المستقبلي

🚀 المميزات المتقدمة (Advanced Features)

🧠 ذكاء التكييف مع السيرفر

البوت لا يقوم فقط بالدخول؛ بل يحلل حالة الـ Spawn ويقوم بتنفيذ بروتوكول الحماية (Protection Protocol) فوراً عبر تحويل نفسه لوضع الإبداع لضمان عدم التأثر بالعوامل البيئية داخل اللعبة.

🔄 بروتوكول إعادة الاتصال العنقودي

في حال سقوط السيرفر، يدخل البوت في وضع Exponential Backoff (محاولات متكررة بفواصل زمنية مدروسة) لضمان عدم حظر الآي بي الخاص بالـ Action من قبل حمايات السيرفر (Anti-DDoS).

⚡ استهلاك صفري للموارد (Zero-Resource Cost)

تم تحسين الكود ليعمل بأقل استهلاك للذاكرة العشوائية (RAM) داخل حاوية GitHub، مما يسمح بتشغيله لأسابيع دون حدوث Memory Leak.

🛠️ هيكلية النظام (Project Architecture)

graph TD
    A[GitHub Actions Workflow] -->|Triggers| B[Virtual Machine Node.js 20]
    B -->|Initializes| C[Mineflayer Instance]
    C -->|Reads Secrets| D[Encrypted Server IP/Port]
    D -->|Authenticates| E[Minecraft Server]
    E -->|Feedback| C
    C -->|Logging| F[GitHub Action Logs]


⚙️ دليل التثبيت السحابي (Cloud Setup)

1. إعداد المتغيرات البيئية (Environment Variables)

يجب تشفير البيانات التالية داخل Repository Secrets:

المفتاح

النوع

الوصف الفني

SERVER_IP

String

النطاق أو العنوان الرقمي للسيرفر

SERVER_PORT

Number

منفذ TCP (الافتراضي 25565)

BOT_NAME

String

(اختياري) اسم مخصص للبوت

2. تهيئة الـ Workflow

ملف الـ main.yml مبرمج للعمل وفق ثلاث حالات:

Push: عند أي تعديل في الكود.

Schedule: إعادة تشغيل تلقائي كل 4 ساعات لتفريغ الكاش.

Manual: تشغيل يدوي عبر زر Run Workflow.

🕹️ الأوامر والتحكم الذكي (Control Interface)

يمكنك التفاعل مع البوت داخل اللعبة عبر الأوامر التالية (تتطلب رتبة OP):

الأمر

الوظيفة

!status

عرض إحصائيات الاتصال وزمن التشغيل (Uptime).

!jump

تفعيل القفز المتكرر لتجاوز الـ Idle Timeout.

!say [text]

جعل البوت يتحدث نيابة عنك في السيرفر.

!coords

معرفة الإحداثيات الحالية للبوت داخل العالم.

🆘 موسوعة استكشاف الأخطاء (Comprehensive Troubleshooting)

بصفتنا خبراء، قمنا بتوقع كافة السيناريوهات المحتملة:

1. خطأ ECONNRESET أو ETIMEDOUT

الوصف: انقطاع مفاجئ في طبقة الـ TCP.

السبب: غالباً ريستارت للسيرفر أو جدار حماية (Firewall) من الاستضافة.

الحل: البوت مبرمج لمعالجة هذا الخطأ تلقائياً. لا تتدخل.

2. خطأ Invalid Credentials أو Authentication Failed

السبب: السيرفر مفعل به خاصية الـ Online Mode والبوت يحاول الدخول بحساب مكرك (Offline).

الحل: تأكد من إعداد السيرفر على Online Mode: False في إعدادات أترنوس.

3. البوت "موجود" في السجل ولكن لا يظهر في اللعبة

السبب: قد يكون البوت عالقاً في الـ "Limbo" أو منطقة الـ Login.

الحل: إذا كان السيرفر يحتوي على نظام تسجيل دخول، يجب إضافة كود /login في ملف index.js.

4. خطأ Out of Memory في GitHub Actions

السبب: تراكم السجلات (Logs) أو كثرة البوتات في ريبوسيتوري واحد.

الحل: استخدام النسخة المستقلة لكل بوت كما نصحنا في وكالة WEBORO.

5. حظر الآي بي (IP Blacklist)

السبب: محاولة الدخول المتكررة جداً (Spam Join).

الحل: الكود الحالي يحتوي على Delay (تأخير) لمدة 30 ثانية لتجنب هذا الحظر.

6. خطأ Plugin Conflict (مثل Essentials)

السبب: بلجن الحماية تمنع البوت من تنفيذ /gamemode.

الحل: يجب إضافة البوت إلى قائمة الـ Whitelist وإعطاؤه رتبة Admin أو Owner.

📈 التطوير المستقبلي (Roadmap)

[ ] إضافة نظام ذكاء اصطناعي للرد على الشات.

[ ] نظام تسجيل فيديو (Recording) لما يحدث حول البوت.

[ ] لوحة تحكم ويب (Web Dashboard) مرتبطة بـ WEBORO Agency.

👨‍💻 فريق التطوير (Development Team)

المشروع مدار بالكامل من قبل Guerbous Yassin، المدير التقني في WEBORO.

الموقع الرسمي: weboro.gt.tc

الرؤية: تحويل الأفكار البرمجية المعقدة إلى أدوات بسيطة وفعالة.

<p align="center">
<b>Designed with ❤️ by WEBORO Creative Agency</b>




<i>"Beyond the Limits of Code"</i>
</p>
