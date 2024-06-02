const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

async function main() {
    const adminEmail = 'salim@admin.com';
    const adminPassword = 'salim'; 
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminEmail,
      },
    }); 

    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }
  
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log("🚀 ~ main ~ adminUser:", adminUser)
    
    
  }
  
  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })