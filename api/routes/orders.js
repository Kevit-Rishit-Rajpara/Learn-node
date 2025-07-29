const express = require('express');    
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Orders retrieved successfully"
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "Order created successfully",
        productId: productId,
        quantity: quantity
    })
})

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: "Order retrieved successfully",
        orderId: orderId
    })
})

router.put('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    const orderStatus = req.body.orderStatus;
    res.status(200).json({
        message: "Order updated successfully",
        orderId: orderId,
        orderStatus: orderStatus
    })
})

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: "Order deleted successfully",
        orderId: orderId
    })
})


module.exports = router