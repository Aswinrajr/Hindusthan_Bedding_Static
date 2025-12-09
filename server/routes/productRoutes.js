import express from 'express';
import Product from '../models/Product.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

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

        // Cloudinary returns file.path as the secure URL
        const imageUrls = req.files.map(file => file.path);

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

        // New uploaded images from Cloudinary
        const newImageUrls = req.files ? req.files.map(file => file.path) : [];

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

export default router;
