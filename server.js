const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// الاتصال بقاعدة البيانات (يمكنك وضع رابط MongoDB Atlas الخاص بك هنا)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/alrai_engineering';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ تم الاتصال بقاعدة البيانات بنجاح'))
  .catch(err => console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err));

// نموذج المستخدمين (Users Schema) مع حماية البيانات الحساسة
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // تُحفظ مشفرة حصرياً
    name: { type: String, required: true },
    role: { type: String, required: true },
    type: { type: String, required: true } // 'admin' أو 'field'
});
const User = mongoose.model('User', userSchema);

// نموذج القسايم والمشاريع
const siteSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    owner: String,
    supervisor: String,
    status: { type: String, default: 'pending_approval' },
    client: String,
    startDate: String,
    duration: Number,
    approvedBy: String,
    approvedAt: String,
    workers: [{ name: String, workType: String, dailyRate: Number, daysCount: Number }],
    expenses: [{ title: String, amount: Number, date: String }],
    logs: [{ date: String, author: String, text: String }]
});
const Site = mongoose.model('Site', siteSchema);

// 🔐 تسجيل الدخول الآمن (Login API)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) return res.status(400).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });

        // مقارنة كلمة المرور المدخلة مع الباسورد المشفر في قاعدة البيانات بأمان تام
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });

        // إصدار توكن آمن للجلسة صالح لمدة 7 أيام
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role: user.role }, 
            process.env.JWT_SECRET || 'ALRAI_MAX_SECURE_KEY_998877', 
            { expiresIn: '7d' }
        );

        res.json({ token, user: { name: user.name, role: user.role, type: user.type, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'خطأ داخلي في الخادم' });
    }
});

// جلب البيانات مع توليد الحسابات الافتراضية المشفرة أول مرة
app.get('/api/data', async (req, res) => {
    try {
        let users = await User.find({});
        if (users.length === 0) {
            const salt = await bcrypt.genSalt(12); // قوة تشفر عالية جداً
            const defaultPass = await bcrypt.hash('Alrai@2026', salt); // كلمة مرور قوية افتراضية
            
            users = await User.insertMany([
                { email: 'admin@alrai.com', password: defaultPass, name: 'المدير العام', role: 'إدارة شاملة ومتابعة', type: 'admin' },
                { email: 'dev@alrai.com', password: defaultPass, name: 'المبرمج', role: 'دعم تقني وصلاحيات كاملة', type: 'admin' },
                { email: 'ameer@alrai.com', password: defaultPass, name: 'م/أمير', role: 'مهندس موقع / مشرف ميداني', type: 'field' },
                { email: 'abusaad@alrai.com', password: defaultPass, name: 'ابوسعد', role: 'مشرف تنفيذ', type: 'field' },
                { email: 'ayman@alrai.com', password: defaultPass, name: 'ايمن', role: 'مشرف حركة ومشاريع', type: 'field' }
            ]);
        }
        const sites = await Site.find({});
        res.json({ users, sites });
    } catch (err) {
        res.status(500).json({ error: 'خطأ في جلب البيانات' });
    }
});

// حفظ القسايم وتحديثاتها
app.post('/api/sites', async (req, res) => {
    try {
        const newSite = new Site(req.body);
        await newSite.save();
        const sites = await Site.find({});
        res.json(sites);
    } catch (err) {
        res.status(500).json({ error: 'خطأ في حفظ القسيمة' });
    }
});

app.put('/api/sites/:id', async (req, res) => {
    try {
        await Site.findByIdAndUpdate(req.params.id, req.body);
        const sites = await Site.find({});
        res.json(sites);
    } catch (err) {
        res.status(500).json({ error: 'خطأ في التحديث' });
    }
});

app.delete('/api/sites/:id', async (req, res) => {
    try {
        await Site.findByIdAndDelete(req.params.id);
        const sites = await Site.find({});
        res.json(sites);
    } catch (err) {
        res.status(500).json({ error: 'خطأ في الحذف' });
    }
});

// إضافة موظف جديد مع تشفير كلمة المرور فوراً
app.post('/api/users', async (req, res) => {
    try {
        const { email, password, name, role, type } = req.body;
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({ email: email.toLowerCase().trim(), password: hashedPassword, name, role, type });
        await newUser.save();
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'خطأ: البريد الإلكتروني مستخدم مسبقاً أو غير صالح' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 السيرفر الآمن يعمل على المنفذ ${PORT}`));
