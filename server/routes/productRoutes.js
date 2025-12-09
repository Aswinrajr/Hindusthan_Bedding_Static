const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Local Disk Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET all active products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false }).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new product with images
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { name, price, originalPrice, category } = req.body;

        // Get local file paths (relative to server root for serving)
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

        const newProduct = new Product({
            name,
            price,
            originalPrice,
            category,
            images: imageUrls
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update product
router.put('/:id', upload.array('images', 5), async (req, res) => {
    try {
        const { name, price, originalPrice, category, existingImages } = req.body;

        let headerImages = [];
        if (typeof existingImages === 'string') {
            headerImages = [existingImages];
        } else if (Array.isArray(existingImages)) {
            headerImages = existingImages;
        }

        // New uploaded images
        const newImageUrls = req.files.map(file => `/uploads/${file.filename}`);

        // Combine keeping existing images and adding new ones
        const finalImages = [...headerImages, ...newImageUrls];

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                originalPrice,
                category,
                images: finalImages
            },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE (Soft Delete) product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        res.json({ message: 'Product deleted successfully', product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
