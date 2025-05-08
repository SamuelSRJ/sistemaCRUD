const express = require('express');
const app = express();
const cors = require('cors');
const connectToDatabase = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth');

// Middlewares
app.use(cors());
app.use(express.json()); // permite ler body JSON

// Rotas
app.use('/api', authRoutes);

app.get('/api/clientes', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.execute('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ mensagem : 'Erro ao buscar clientes.'})
    }
})

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});