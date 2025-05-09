const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const db = require('../config/db');
const connectToDatabase = require('../config/db');

// Registra um novo usuário
exports.register = async (req, res) => {
    const { name, email, telefone, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const db = await connectToDatabase();
        const sql = 'INSERT INTO usuarios (name, email, telefone, password) VALUES (?, ?, ?, ?)';
        await db.execute(sql, [name, email, telefone, hash]);

        res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso.'});
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'E-mail já cadastrado.'});
        }
        
        console.error('Erro ao cadastrar o usuário:', err);
        res.status(500).json({ success: false, message: 'Erro ao cadastrar o usuário.'});
    }
    
};

// Faz o login do usuário
exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const sql = 'SELECT * FROM usuarios WHERE email = ?';

        const [results] = await db.execute(sql, [email]);

        if (results.length === 0) {
            return res.status(401).json({ erro: 'Usuário não encontrado.'});
        }

        const user = results[0];
        console.log("Dados do usuário: ", user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ erro: 'Senha incorreta.'});
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            success: true,
            mensagem: 'Login successful!',
            name: user.name,
            token
        });
    } 
    catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
};

// Cadastra empresa cliente no banco de dados
exports.cadastrocliente = async (req, res) => {
    const { nomefantasia, cnpj, email } = req.body;

    try {
        const db = await connectToDatabase();
        const sql = 'INSERT INTO clientes (nome_fantasia, cnpj, email_administrador) VALUES (?, ?, ?)';
        
        await db.execute(sql, [nomefantasia, cnpj, email]);

        res.status(201).json({ success: true, message: 'Empresa cadastrada com sucesso.'});
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Empresa já cadastrada no sistema.'});
        }

        console.error('Erro ao registrar o cliente:', err);
        res.status(500).json({ success: false, message: 'Erro ao cadastrar a empresa.'});
    }
};

// Lista as empresas cadastradas
