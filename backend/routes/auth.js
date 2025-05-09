const connectToDatabase = require('../config/db')
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

router.get('/clientes', async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase(); // <- cria a conexão aqui
        const [rows] = await connection.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar os clientes' });
    } finally {
        if (connection) {
            await connection.end(); // Fecha a conexão com o banco de dados
        }
    }
});

router.get('/usuarios', async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase(); // <- Cria a conexão aqui
        const [rows] = await connection.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
    } finally {
        if(connection) {
            await connection.end(); // Fecha a conexão com o banco de dados
        }
    }
})

module.exports = router;