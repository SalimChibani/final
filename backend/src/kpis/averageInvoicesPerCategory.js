const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getInvoiceCountByCategory(req, res) {
  try {
    // Fetch the count of invoices grouped by category
    const invoiceCountByCategory = await prisma.exportInvoice.groupBy({
      by: ['categoryId'],
      _count: {
        id: true,
      },
      orderBy: {
        categoryId: 'asc',
      },
    });

    // Fetch category names
    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: invoiceCountByCategory.map(item => item.categoryId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Map category names to the results
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {});

    const result = invoiceCountByCategory.map(item => ({
      categoryId: item.categoryId,
      categoryName: categoryMap[item.categoryId],
      invoiceCount: item._count.id,
    }));

    res.json({ invoiceCountByCategory: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getInvoiceCountByCategory;
