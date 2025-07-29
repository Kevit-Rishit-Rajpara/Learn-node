const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// GET all products
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Products retrieved successfully',
  });
});

// GET a product by ID
router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({
    message: 'Product retrieved successfully',
    productId: productId,
  });
});

// POST a new product
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product.save().then(
    (result) => {
      console.log(result);
    },
    (error) => {
      console.log(error);
    }
  );
  res.status(201).json({
    message: 'Product created successfully',
    createdProduct: product
  });
});

// PUT (update) a product
router.put('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  const productName = req.body.name;
  const productDescription = req.body.description;
  res.status(200).json({
    message: 'Product updated successfully',
    productId: productId,
    productName: productName,
    productDescription: productDescription,
  });
});

// DELETE a product
router.delete('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({
    message: 'Product deleted successfully',
    productId: productId,
  });
});

module.exports = router;
