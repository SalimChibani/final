const router = require('express').Router();
const multer = require('multer');

const { addImageProfile, getProfileImage, resetPassword, getUsers,getUserById } = require('../controller/user');
const multerConfigImage = require('../config/multer');


router.get('/get-profile-img', getProfileImage);

router.post('/upload-img-profile', multer(multerConfigImage).single('file'), (req, res) => {
    try {
        if (res.status(200)) {
            addImageProfile(req, res)
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/reset-password', resetPassword);



router.get('/', getUsers)
router.get('/:id', getUserById)


  
  

module.exports = router;