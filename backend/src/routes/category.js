const router = require('express').Router();
const { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controller/category');

router.post('/', addCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;