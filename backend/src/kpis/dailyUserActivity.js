const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getDailyUserActivity(req, res) {
  try {
    const users = await prisma.User.findMany({
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const formattedActivity = users.reduce((acc, product) => {
      const date = new Date(product.createdAt);
      const formattedDate = date.toISOString().split('T')[0]; 

      if (!acc[formattedDate]) {
        acc[formattedDate] = { createdAt: formattedDate, _count: { id: 0 } };
      }
      acc[formattedDate]._count.id += 1;
      return acc;
    }, {});

    const result = Object.values(formattedActivity);

    res.json({ dailyUserActivity: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getDailyUserActivity;
