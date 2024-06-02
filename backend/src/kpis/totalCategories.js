const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getTotalCategories(req, res) {
  try {
    const totalCategories = await prisma.category.count();
    res.json({ totalCategories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getTotalCategories;
