const jwt = require("jsonwebtoken");

module.exports = {

    async signupEmail(body) {
        if (body.email && body.password && body.nome) {
            const {nome, email, password} = body;
    
            const user = {
                nome,
                email,
                password,
                tenant: body.tenant || 'none',
                status: body.status || 'active'
            };
    
            try {
                const userExiste = await User.findOne({email: email});
    
                if (userExiste) throw new Error('Já existe um usuário com este e-mail.');
    
                else {
                    const novo = await User.create(user).fetch();
                    const token = jwt.sign({user: novo.id}, sails.config.security.salt, {expiresIn: sails.config.security.jwtExpires});
                    delete novo.password;
                    return {...novo, token};
                }
    
            } catch(e) {
                throw new Error(e.message);// res.erro(400, e.message);
            }
        } else {
            return false;
        }
    }

};