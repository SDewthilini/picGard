const {Router} = require('express');

const authControler = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

router = Router();

router.get('/signin', authControler.signin_get);

router.get('/signup', authControler.signup_get);

router.post('/signin', authControler.signin_post);

router.post('/signup', authControler.signup_post);

router.get('/logout', authControler.logout_get);

router.get('/profile',requireAuth, authControler.profile_get);

router.get('/accesstoken', authControler.accesstoken_get);

module.exports = router;