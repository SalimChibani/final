const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTotalUsers = require('../kpis/totalUsers');
const getNewUsersByPeriod = require('../kpis/newUsersByPeriod');
const getUserProfileCompletion = require('../kpis/userProfileCompletion');
const getTotalProducts = require('../kpis/totalProducts');
const getAverageProductsPerUser = require('../kpis/averageProductsPerUser');
const getTotalExportInvoices = require('../kpis/totalExportInvoices');
const getExportInvoicesByStatus = require('../kpis/exportInvoicesByStatus');
const getTotalExportAmount = require('../kpis/totalExportAmount');
const getTotalCategories = require('../kpis/totalCategories');
const getInvoiceCountByCategory = require('../kpis/averageInvoicesPerCategory');
const getDailyUserActivity = require('../kpis/dailyUserActivity');
const getUserRoleDistribution = require('../kpis/userRoleDistribution');


router.get('/total-users', getTotalUsers);
router.get('/new-users-by-period', getNewUsersByPeriod);
router.get('/user-profile-completion', getUserProfileCompletion);
router.get('/total-products', getTotalProducts);
router.get('/average-products-per-user', getAverageProductsPerUser);
router.get('/total-export-invoices', getTotalExportInvoices);
router.get('/export-invoices-by-status', getExportInvoicesByStatus);
router.get('/total-export-amount', getTotalExportAmount);
router.get('/total-categories', getTotalCategories);
router.get('/average-invoices-per-category', getInvoiceCountByCategory);
router.get('/daily-user-activity', getDailyUserActivity);
router.get('/user-role-distribution', getUserRoleDistribution);

router.get('/top-products', async (req, res) => {
    const topProducts = await prisma.exportInvoice.groupBy({
      by: ['productId'],
      _count: {
        productId: true,
      },
      orderBy: {
        _count: {
          productId: 'desc',
        },
      },
      take: 5,
    });
  
    const productsWithDetails = await Promise.all(topProducts.map(async (product) => {
      const productDetails = await prisma.product.findUnique({
        where: { id: product.productId },
      });
      return {
        name: productDetails.name,
        count: product._count.productId,
      };
    }));
  
    res.json(productsWithDetails);
  });
  
  router.get('/percentage-by-municipalite', async (req, res) => {
    const totalItems = await prisma.exportInvoice.count();
    const itemsByMunicipalite = await prisma.exportInvoice.groupBy({
      by: ['municipalite'],
      _count: {
        municipalite: true,
      },
    });
  
    const percentageByMunicipalite = itemsByMunicipalite.map(item => ({
      municipalite: item.municipalite,
      percentage: (item._count.municipalite / totalItems) * 100,
    }));
  
    res.json(percentageByMunicipalite);
  });
  







  router.get('/percentage-by-transport', async (req, res) => {
    const totalItems = await prisma.exportInvoice.count();
    const itemsByTransport = await prisma.exportInvoice.groupBy({
        by: ['transport'],
        _count: {
            transport: true,
        },
    });

    const percentageByTransport = itemsByTransport.map(item => ({
        transport: item.transport,
        percentage: (item._count.transport / totalItems) * 100,
    }));

    res.json(percentageByTransport);
});










  
  router.get('/money-by-country', async (req, res) => {
    const moneyByCountry = await prisma.exportInvoice.groupBy({
      by: ['country'],
      _sum: {
        price: true,
      },
    });
  
    const result = moneyByCountry.map(item => ({
      country: item.country,
      totalMoney: item._sum.price,
    }));
  
    res.json(result);
  });

  router.get('/money-by-municipalite', async (req, res) => {
    const moneyByMunicipalite = await prisma.exportInvoice.groupBy({
      by: ['municipalite'],
      _sum: {
        price: true,
      },
    });
  
    const result = moneyByMunicipalite.map(item => ({
      municipalite: item.municipalite,
      totalMoney: item._sum.price,
    }));
  
    res.json(result);
  });
  router.get('/percentage-by-spec', async (req, res) => {
    try {
      const totalUsers = await prisma.userInfo.count();
      const usersBySpec = await prisma.userInfo.groupBy({
        by: ['spec'],
        _count: {
          spec: true,
        },
      });
  
      const percentageBySpec = usersBySpec.map(item => ({
        spec: item.spec,
        percentage: (item._count.spec / totalUsers) * 100,
      }));
  
      res.json(percentageBySpec);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = router;
