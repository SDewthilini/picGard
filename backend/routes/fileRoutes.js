const {Router} = require('express');
const { save_post, get_images, saveimg, deleteimg, renameImage_put } = require('../controllers/fileController');
const authControler = require('../controllers/authController');


router = Router();

router.post('/save', save_post);
router.get('/images', get_images);
router.post('/saveimg',saveimg);
router.delete('/deleteimg/:imageId',deleteimg);
router.put('/rename',renameImage_put);


module.exports = router;