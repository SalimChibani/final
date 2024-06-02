const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getTotalExport(req, res) {
    const userId = req.user.id;
    try {
        const totalExportInvoices = await prisma.exportInvoice.count({
            where: {
                userId: userId
            }
        });

        const totalPriceSpent = await prisma.exportInvoice.aggregate({
            _sum: {
                price: true
            },
            where: {
                userId: userId
            }
        });

        const totalSpent = totalPriceSpent._sum.price || 0;
        
        res.json({ totalExportInvoices, totalSpent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getTotalExport;
