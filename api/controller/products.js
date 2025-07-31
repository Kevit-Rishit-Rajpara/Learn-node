const mongoose = require("mongoose");

const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then((products) => {
      console.log(products);
      if (products.length === 0) {
        return res.status(404).json({
          message: 'No products found',
        });
      }
      res.status(200).json({
        message: 'Products retrieved successfully',
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
}


exports.getProductrDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .select('name price _id productImage')
    .exec()
    .then((product) => {
      console.log(product);
      if (product) {
        res.status(200).json({
          message: 'Product found',
          product: product,
          url: {
            type: 'GET',
            url: `http://localhost:3000/products/${productId}`,
          },
        });
      } else {
        res.status(404).json({
          message: 'Product not found',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
}
  
exports.createProduct = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req?.file?.path, // Store the path of the uploaded image
  });
  product.save().then(
    (result) => {
      console.log(result);
      res.status(201).json({
        message: 'Product created successfully',
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
}

exports.upldateProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.updateOne(
    { _id: productId },
    { $set: { name: req.body.name, price: req.body.price } }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Product updated successfully',
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
}
  
exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteOne({ _id: productId })
    .exec()
    .then((result) => {
      console.log(result);
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      console.log('Product deleted successfully');
      res.status(200).json({
        message: 'Product deleted successfully',
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
}