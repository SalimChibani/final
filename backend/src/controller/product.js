const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addProduct = async (req, res) => {
    const productData = req.body;
    const userId = req.user.id;
    try {
        const newProduct = await prisma.product.create({
            data: {
                ...productData,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        res.status(200).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}
const getProductImage = async (req, res) => {
    const productId = req.params.id;
    try {
        const productImage = await prisma.product.findFirst({
            where: {
                id: parseInt(productId)
            }
        });
        res.redirect(`/public/images/${productImage.productImage}`);

    } catch (error) {
        res.status(500).json({ error: 'Error getting user' });
    }
}
const addImage = async (req, res) => {
    const role = req.user.role;
    const productId = req.params.id;
    const image = req.file;
    try {
        if (role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(productId)
            }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const productImage = await prisma.product.update({
            where: {
                id: parseInt(productId)
            },
            data: {
                productImage: image.filename
            }
        });
        console.log("🚀 ~ addImage ~ productImage:", productImage)
        res.status(200).json(productImage);
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
}

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(productId)
            }
        });
        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting product:', error);
        throw error;
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { image, ...productData } = req.body;
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: parseInt(productId)
            },
            data: {
                ...productData
            }
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const getImageProduct = await prisma.resource.findFirst({
            where: {
                productId: parseInt(productId)
            }
        });
        if (getImageProduct) {
            await prisma.resource.deleteMany({
                where: {
                    id: getImageProduct.id
                }
            });
        }

        await prisma.exportInvoice.deleteMany({
            where: {
                productId: parseInt(productId),
            },
        });
        const deletedProduct = await prisma.product.delete({
            where: {
                id: parseInt(productId)
            }
        });
        res.status(200).json(deletedProduct);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct, addImage, getProductImage }