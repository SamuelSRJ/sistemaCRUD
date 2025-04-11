const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.register = (req, res) => {
    const { nome, username, email, senha } = req.body;

    // Criptografar a senha antes de salvar
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) return res.status(500).json({ erro: 'Erro ao criptografar a senha.'});

        const sql = 'INSERT INTO usuarios (nome, username, email, senha) VALUES (?, ?, ?, ?)';
        db.query(sql, [nome, username, email, hash], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ erro: 'Email já cadastrado.'});
                }
                return res.status(500).json({ erro: 'Erro ao cadastrar usuário.'});
            }

            res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.'});
        });
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro na consulta ao banco.'});

        if (results.length === 0) {
            return res.status(401).json({ erro: 'Usuário não encontrado.'});
        }

        const user = results[0];

        bcrypt.compare(senha, user.senha, (err, isMatch) => {
            if (err) return res.status(500).json({ erro: 'Erro ao verficar a senha.'});
            if (!isMatch) return res.status(401).json({ erro: 'Senha incorreta.'});

            res.status(200).json({ mensagem: 'Login bem-sucedido!'});
        });
    });
};