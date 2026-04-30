"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Get all colleges with filtering, search, pagination
app.get('/api/colleges', async (req, res) => {
    try {
        const { search, location, maxFees, page = '1', limit = '10' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const where = {};
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        if (location) {
            where.location = { contains: location, mode: 'insensitive' };
        }
        if (maxFees) {
            where.fees = { lte: parseFloat(maxFees) };
        }
        const [colleges, total] = await Promise.all([
            prisma.college.findMany({
                where,
                include: { courses: true },
                skip,
                take: limitNum,
                orderBy: { rating: 'desc' }
            }),
            prisma.college.count({ where })
        ]);
        res.json({
            data: colleges,
            meta: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    }
    catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ error: 'Failed to fetch colleges' });
    }
});
// Get single college details
app.get('/api/colleges/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const college = await prisma.college.findUnique({
            where: { id },
            include: { courses: true }
        });
        if (!college) {
            return res.status(404).json({ error: 'College not found' });
        }
        res.json(college);
    }
    catch (error) {
        console.error('Error fetching college details:', error);
        res.status(500).json({ error: 'Failed to fetch college details' });
    }
});
// Simple Predictor Tool
app.post('/api/predict', async (req, res) => {
    try {
        const { exam, rank } = req.body;
        if (!exam || !rank) {
            return res.status(400).json({ error: 'Exam and rank are required' });
        }
        const rankNum = parseInt(rank);
        // Simple logic: lower rank = better college. 
        // We mock this by returning top rated colleges for top ranks.
        let skip = 0;
        if (rankNum > 1000)
            skip = 2;
        if (rankNum > 5000)
            skip = 5;
        if (rankNum > 20000)
            skip = 10;
        const colleges = await prisma.college.findMany({
            skip,
            take: 3,
            orderBy: { rating: 'desc' },
            include: { courses: true }
        });
        res.json(colleges);
    }
    catch (error) {
        console.error('Error predicting colleges:', error);
        res.status(500).json({ error: 'Prediction failed' });
    }
});
// Auth & Saved Items - Mocking user logic by hardcoding a User ID for demo
app.get('/api/users/:userId/saved', async (req, res) => {
    try {
        const { userId } = req.params;
        const saved = await prisma.savedCollege.findMany({
            where: { userId },
            include: { college: { include: { courses: true } } }
        });
        res.json(saved.map(s => s.college));
    }
    catch (error) {
        console.error('Error fetching saved colleges:', error);
        res.status(500).json({ error: 'Failed to fetch saved colleges' });
    }
});
app.post('/api/users/:userId/saved', async (req, res) => {
    try {
        const { userId } = req.params;
        const { collegeId } = req.body;
        if (!collegeId) {
            return res.status(400).json({ error: 'College ID is required' });
        }
        // Ensure user exists (mock auth)
        let user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            user = await prisma.user.create({
                data: { id: userId, name: 'Demo User', email: 'demo@example.com' }
            });
        }
        const saved = await prisma.savedCollege.create({
            data: { userId, collegeId }
        });
        res.json(saved);
    }
    catch (error) {
        console.error('Error saving college:', error);
        res.status(500).json({ error: 'Failed to save college' });
    }
});
app.delete('/api/users/:userId/saved/:collegeId', async (req, res) => {
    try {
        const { userId, collegeId } = req.params;
        await prisma.savedCollege.delete({
            where: { userId_collegeId: { userId, collegeId } }
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error removing saved college:', error);
        res.status(500).json({ error: 'Failed to remove saved college' });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
