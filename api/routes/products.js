const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controller/products');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const Product = require('../models/product');

// GET all products
router.get('/', ProductController.getAllProducts );

// GET a product by ID
router.get('/:productId', ProductController.getProductrDetails);

// POST a new product
router.post('/', checkAuth, upload.single('productImage'), ProductController.createProduct);

// PUT (update) a product
router.put('/:productId', checkAuth, ProductController.upldateProduct);

// DELETE a product
router.delete('/:productId', checkAuth, ProductController.deleteProduct);

module.exports = router;
