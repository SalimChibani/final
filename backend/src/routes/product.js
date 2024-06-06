    const router = require('express').Router();
    const multer = require('multer');

    const {
        addProduct,
        getProducts,
        getProductById,
        updateProduct,
        deleteProduct,
        addImage,
        getProductImage
    } = require('../controller/product');
    const multerConfigImage = require('../config/multer');

    router.post('/', addProduct);
    router.get('/', getProducts);
    router.get('/:id', getProductById);
    router.put('/:id', updateProduct);
    router.delete('/:id', deleteProduct);

    router.post('/upload/:id', multer(multerConfigImage).single('file'), (req, res) => {
        try {
            if (res.status(200)) {
                addImage(req, res);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    router.get('/get-product-img/:id', getProductImage);

    module.exports = router;
