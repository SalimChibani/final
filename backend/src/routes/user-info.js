const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();  
const { addUserInfo, updateUserInfo,getMyInfo } = require('../controller/user-info');


const router = require('express').Router();

router.post('/', addUserInfo);
router.put('/', updateUserInfo);
router.get('/', getMyInfo);

router.get('/users', async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          userInfo: true,  
        }
      });
  
      const modifiedUsers = users.map(user => ({
        ...user,
        userInfo: user.userInfo || 'No user info available'
      }));
  
      res.json(modifiedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users");
    }
  });

  module.exports = router;