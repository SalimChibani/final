const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getTotalProducts(req, res) {
  try {
    const totalProducts = await prisma.product.count();
    res.json({ totalProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getTotalProducts;
