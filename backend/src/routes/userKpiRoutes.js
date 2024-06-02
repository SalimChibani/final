const express = require('express');
const router = express.Router();
const getTotalExport = require('../kpis/user/totalExport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to get the user ID from the request
router.use((req, res, next) => {
    if (req.user && req.user.id) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

router.get('/total-export', getTotalExport);

router.get('/export-invoices-by-status', async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await prisma.exportInvoice.groupBy({
            by: ['status'],
            _count: {
                status: true,
            },
            where: {
                userId: userId
            }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/export-invoices-by-country', async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await prisma.exportInvoice.groupBy({
            by: ['country'],
            _count: {
                country: true,
            },
            where: {
                userId: userId
            }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Top Products for User by Quantity
router.get('/top-products-for-user', async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await prisma.$queryRaw`
            SELECT p.name AS product_name, SUM(ei.quantity) AS total_quantity
            FROM ExportInvoice ei 
            JOIN Product p ON ei.productId = p.id 
            WHERE ei.userId = ${userId}
            GROUP BY p.name 
            ORDER BY total_quantity DESC
            LIMIT 5
        `;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/top-countries-for-user', async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await prisma.$queryRaw`
            SELECT c.name AS country_name, SUM(ei.quantity) AS total_quantity
            FROM ExportInvoice ei 
            JOIN Country c ON ei.countryId = c.id
            WHERE ei.userId = ${userId}
            GROUP BY c.name 
            ORDER BY total_quantity DESC
            LIMIT 5
        `;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Number of Invoices
router.get('/number-of-invoices', async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await prisma.exportInvoice.count({
            where: {
                userId: userId
            }
        });
        res.json({ total_invoices: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Total Quantity Exported
router.get('/total-quantity-exported', async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await prisma.$queryRaw`
            SELECT SUM(quantity) AS total_quantity_exported
            FROM ExportInvoice
            WHERE userId = ${userId}
        `;
        res.json(data[0]); // Assuming the result is an array with a single object
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Total Price by User
router.get('/total-price-by-user', async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await prisma.exportInvoice.aggregate({
            where: {
                userId: userId
            },
            _sum: {
                price: true,
            },
        });
        res.json(data._sum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
