const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Visitor = require('./models/Visitor'); // Visitor Model

dotenv.config();

const app = express();

const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const productRoutes = require('./routes/productRoutes');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
