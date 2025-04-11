const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (!token) return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.'});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ erro: 'Token inválido ou expirado.'});

        req.user = user; // Adiciona os dados do usuário na requisição
        next();
    });
}

module.exports = verificarToken;