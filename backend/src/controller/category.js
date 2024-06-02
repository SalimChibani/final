const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addCategory = async (req, res) => {
    const categoryData = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: {
                ...categoryData
            }
        });
        res.status(200).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
}

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(categoryId)
            }
        });
        res.status(200).json(category);
    } catch (error) {
        console.error('Error getting category:', error);
        throw error;
    }
}

const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const categoryData = req.body;
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: parseInt(categoryId)
            },
            data: {
                ...categoryData
            }
        });
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        await prisma.category.delete({
            where: {
                id: parseInt(categoryId)
            }
        });
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

module.exports = { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory };

