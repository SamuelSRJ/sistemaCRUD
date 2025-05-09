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

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});