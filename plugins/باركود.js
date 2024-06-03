import { toDataURL } from 'qrcode';

let handler = async (m, { text, conn }) => {
    // التحقق من إدخال النص
    if (!text) throw `*اكتب كلام الي تبغاه يحول الى باركود 🧸*`;

    try {
        // توليد رمز الاستجابة السريعة (QR code)
        let qrCodeDataURL = await toDataURL(text.slice(0, 2048), { scale: 8 });

        // إرسال الملف الذي يحتوي على رمز الاستجابة السريعة
        await conn.sendFile(m.chat, qrCodeDataURL, 'qrcode.png', 'Here is your QR code', m);
    } catch (error) {
        // معالجة الخطأ إذا حدث أثناء توليد رمز الاستجابة السريعة
        console.error(error);
        throw '*Failed to generate QR code. Please try again later.*';
    }
};

// معلومات المساعدة لتوضيح كيفية استخدام الأوامر
handler.help = ['', 'code'].map(v => 'qr' + v + ' <text>');

// تصنيف الأداة ضمن مجموعة الأدوات
handler.tags = ['tools'];

// تعريف الأوامر المقبولة والتي يمكن للمستخدم إدخالها لتفعيل هذه الأداة
handler.command = /^qr(code)?|كود|باركود$/i;

export default handler;
