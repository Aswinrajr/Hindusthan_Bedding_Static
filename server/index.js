import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Visitor from './models/Visitor.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hindusthanbedding', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Visitor Request to track unique views
app.post("/api/visit", async (req, res) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        // Check if this IP has visited today
        const existingVisit = await Visitor.findOne({ ip, visitDate: today });

        if (!existingVisit) {
            await Visitor.create({ ip, visitDate: today });
            console.log(`New unique visit from ${ip}`);
        }

        res.status(200).json({ message: "Visit recorded" });
    } catch (error) {
        console.error("Error recording visit:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get Visitor Stats
app.get("/api/stats", async (req, res) => {
    try {
        const totalUnique = await Visitor.countDocuments();
        // Start of today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // We store date string, so let's just count matching strings for today
        const todayStr = new Date().toISOString().split("T")[0];
        const todayUnique = await Visitor.countDocuments({ visitDate: todayStr });

        res.json({ totalUnique, todayUnique });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats" });
    }
});

// --- Serve Frontend in Production ---
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Handle React Routing, return all requests to React app
app.get('*', (req, res) => {
    // Skip if it looks like an API call that wasn't handled
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ message: "API endpoint not found" });
    }
    res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
