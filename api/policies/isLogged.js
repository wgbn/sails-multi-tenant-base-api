const jwt = require("jsonwebtoken");

module.exports = async function(req, res, next) {

    // Verifica se há um token JWT no cabeçalho
    if (req.header('authorization') || req.query.token) {
        // Se existe, tente obter os dados de cabeçalho
        const token = req.header('authorization') ? req.header('authorization').split('Bearer ')[1] : req.query.token;
        delete req.query.token;

        // Se não houver nada após "Bearer", basta negar acesso
        if (!token) {
            res.status(401);
            return res.send({status: 401, statusText: 'Não está logado: nenhum token foi passado'});
        }

        // Se houver algo, verifica se é um token JWT
        try {
            const payload = await jwt.verify(token, sails.config.security.salt);
            // Se não houver ID de usuário no token, nega o acesso
            if (!payload.user) {
                res.status(401);
                return res.send({status: 401, statusText: 'Não está logado: usuário não possui ID'});
            }
            // Caso contrário, tente procurar esse usuário
            const user = await User.findOne(payload.user);
            if (!user) {
                res.status(401);
                return res.send({status: 401, statusText: 'Não está logado: usuário não foi encontrado'});
            }
            // Caso contrário, salve o id do tenant no pedido e continue
            req.tenant = user.tenant;
            return next();

        } catch(e) {
            res.status(401);
            return res.send({status: 401, statusText: 'Não está logado: erro ao verificar o token '+e.message});
            // return res.forbidden();
        }

    }

    // Caso não haja nada no cabeçalho, nega o acesso
    res.status(401);
    return res.send({status: 401, statusText: 'Usuário não está logado'});

};
