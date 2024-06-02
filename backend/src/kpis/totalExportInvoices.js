const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getTotalExportInvoices(req, res) {
  try {
    const totalExportInvoices = await prisma.exportInvoice.count();
    res.json({ totalExportInvoices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getTotalExportInvoices;
