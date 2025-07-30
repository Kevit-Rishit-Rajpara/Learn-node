const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

// GET all products
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then((products) => {
      console.log(products);
      if (products.length === 0) {
        return res.status(404).json({
          message: "No products found",
        });
      }
      res.status(200).json({
        message: "Products retrieved successfully",
        products: products,
        count: products.length,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

// GET a product by ID
router.get("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .select("name price _id")
    .exec()
    .then((product) => {
      console.log(product);
      if (product) {
        res.status(200).json({
          message: "Product found",
          product: product,
        });
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

// POST a new product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product.save().then(
    (result) => {
      console.log(result);
      res.status(201).json({
        message: "Product created successfully",
        createdProduct: product,
      });
    },
    (error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    }
  );
});

// PUT (update) a product
router.put("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  Product.updateOne(
    { _id: productId },
    { $set: { name: req.body.name, price: req.body.price } }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product updated successfully",
        productId: productId,
        productName: req.body.name,
        productDescription: req.body.description,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

// PATCH (update) a product
router.patch("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);
  Product.updateOne({ _id: productId }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product updated successfully",
        result: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

// DELETE a product
router.delete("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteOne({ _id: productId })
    .exec()
    .then((result) => {
      console.log(result);
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      console.log("Product deleted successfully");
      res.status(200).json({
        message: "Product deleted successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
