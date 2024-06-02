const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();  

const addUserInfo = async (req,res) => {
    const userData = req.body;
    const userId = req.user.id;
    try {
        const existingUser = await prisma.userInfo.findUnique({
            where: {
                userId: userId
            }
        });
        if(existingUser) {
            return res.status(400).json({ error: 'User info already exists' });
        }
        const newUser = await prisma.userInfo.create({
            data:{
                ...userData,
                userId: userId 
            } 
        });
        res.status(200).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}
const updateUserInfo = async (req,res) => {
    const userData = req.body;
    const userId = req.user.id;
    try {
        const existingUser = await prisma.userInfo.findUnique({
            where: {
                userId: userId
            }
        });
        if(!existingUser) {
            return res.status(400).json({ error: 'User info does not exist' });
        }
        const updatedUser = await prisma.userInfo.update({
            where: {
                userId: userId
            },
            data: {
                ...userData
            }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

const getMyInfo = async (req,res) => {   
    const userId = req.user.id;
    try {
        const user = await prisma.userInfo.findUnique({
            where: {
                userId: userId
            }
        });
        if(!user) {
            return res.status(400).json({ error: 'User info does not exist' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}


module.exports = {addUserInfo,updateUserInfo,getMyInfo}