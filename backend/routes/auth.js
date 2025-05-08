const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/cadastrocliente', authController.cadastrocliente);
router.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensagem: 'Bem-vindo à área protegida!', user: req.user});
});

module.exports = router;