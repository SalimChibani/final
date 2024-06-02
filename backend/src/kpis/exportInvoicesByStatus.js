const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getExportInvoicesByStatus(req, res) {
  try {
    const invoicesByStatus = await prisma.exportInvoice.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    res.json({ invoicesByStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getExportInvoicesByStatus;
