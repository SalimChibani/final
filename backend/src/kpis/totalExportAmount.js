const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getTotalExportAmount(req, res) {
  try {
    const totalExportAmount = await prisma.exportInvoice.aggregate({
      _sum: {
        price: true,
      },
    });

    res.json({ totalExportAmount: totalExportAmount._sum.price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getTotalExportAmount;
