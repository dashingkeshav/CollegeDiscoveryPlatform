"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'edunexus-secret-key-2024';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        res.status(401).json({ error: 'No token' });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(header.split(' ')[1], JWT_SECRET);
        req.userId = payload.userId;
        next();
    }
    catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};
/* ── Register ────────────────────────────────────────────── */
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: 'All fields required' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ error: 'Password must be at least 6 characters' });
            return;
        }
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            res.status(409).json({ error: 'Email already registered' });
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({ data: { name, email, passwordHash } });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});
/* ── Login ───────────────────────────────────────────────── */
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password required' });
            return;
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!valid) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});
/* ── Get current user ────────────────────────────────────── */
app.get('/api/auth/me', authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true, name: true, email: true, createdAt: true } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch {
        res.status(500).json({ error: 'Failed to get user' });
    }
});
/* ── Colleges ────────────────────────────────────────────── */
app.get('/api/colleges', async (req, res) => {
    try {
        const { search, location, maxFees, page = '1', limit = '10' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const where = {};
        if (search)
            where.name = { contains: search };
        if (location)
            where.location = { contains: location };
        if (maxFees) {
            const f = parseInt(maxFees);
            if (!isNaN(f))
                where.fees = { lte: f };
        }
        const [colleges, total] = await Promise.all([
            prisma.college.findMany({ where, include: { courses: true }, skip, take: limitNum, orderBy: { rating: 'desc' } }),
            prisma.college.count({ where }),
        ]);
        res.json({ data: colleges, meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) } });
    }
    catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ error: 'Failed to fetch colleges' });
    }
});
app.get('/api/colleges/:id', async (req, res) => {
    try {
        const college = await prisma.college.findUnique({ where: { id: req.params.id }, include: { courses: true } });
        if (!college) {
            res.status(404).json({ error: 'College not found' });
            return;
        }
        res.json(college);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch college' });
    }
});
/* ── Predictor ───────────────────────────────────────────── */
app.post('/api/predict', async (req, res) => {
    try {
        const { exam, rank } = req.body;
        const rankNum = parseInt(rank);
        let maxFees = 0;
        if (exam === 'JEE Advanced')
            maxFees = rankNum < 1000 ? 250000 : rankNum < 5000 ? 350000 : 500000;
        else if (exam === 'JEE Main')
            maxFees = rankNum < 5000 ? 200000 : rankNum < 20000 ? 400000 : 700000;
        else if (exam === 'BITSAT')
            maxFees = rankNum < 100 ? 300000 : rankNum < 300 ? 450000 : 600000;
        else
            maxFees = 500000;
        const colleges = await prisma.college.findMany({ where: { fees: { lte: maxFees } }, include: { courses: true }, take: 6, orderBy: { rating: 'desc' } });
        res.json(colleges);
    }
    catch (error) {
        res.status(500).json({ error: 'Prediction failed' });
    }
});
/* ── Saved Colleges ──────────────────────────────────────── */
app.get('/api/users/:userId/saved', async (req, res) => {
    try {
        const saved = await prisma.savedCollege.findMany({ where: { userId: req.params.userId }, include: { college: { include: { courses: true } } } });
        res.json(saved.map((s) => s.college));
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch saved colleges' });
    }
});
/* ── Saved Colleges ──────────────────────────────────────── */
app.get('/api/users/:userId/saved', async (req, res) => {
    try {
        const saved = await prisma.savedCollege.findMany({ where: { userId: req.params.userId }, include: { college: { include: { courses: true } } } });
        res.json(saved.map((s) => s.college));
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch saved colleges' });
    }
});
app.post('/api/users/:userId/saved', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { collegeId } = req.body;
        const saved = await prisma.savedCollege.upsert({ where: { userId_collegeId: { userId, collegeId } }, update: {}, create: { userId, collegeId } });
        res.json(saved);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to save college' });
    }
});
app.delete('/api/users/:userId/saved/:collegeId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const collegeId = req.params.collegeId;
        await prisma.savedCollege.delete({ where: { userId_collegeId: { userId, collegeId } } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove saved college' });
    }
});
/* ── Q&A ─────────────────────────────────────────────────── */
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await prisma.question.findMany({
            include: { author: { select: { id: true, name: true } }, answers: { include: { author: { select: { id: true, name: true } } }, orderBy: { createdAt: 'asc' } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(questions);
    }
    catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});
app.post('/api/questions', async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = 'mock-user-123'; // Default guest user
        if (!title || !content) {
            res.status(400).json({ error: 'Missing fields' });
            return;
        }
        const question = await prisma.question.create({
            data: { title, content, authorId: userId },
            include: { author: { select: { id: true, name: true } }, answers: { include: { author: { select: { id: true, name: true } } } } }
        });
        res.json(question);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create question' });
    }
});
app.post('/api/questions/:id/answers', async (req, res) => {
    try {
        const { content } = req.body;
        const userId = 'mock-user-123'; // Default guest user
        if (!content) {
            res.status(400).json({ error: 'Missing content' });
            return;
        }
        const answer = await prisma.answer.create({
            data: { content, authorId: userId, questionId: req.params.id },
            include: { author: { select: { id: true, name: true } } }
        });
        res.json(answer);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add answer' });
    }
});
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});
app.listen(port, () => console.log(`Server running on port ${port}`));
