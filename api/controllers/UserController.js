/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require("jsonwebtoken");

module.exports = {

    async signup(req, res) {

        if (req.method == 'POST') {

            try {
                switch(req.body.signupType) {
                    case 'email':
                        const email = await signupEmail(req.body);
                        return email !== false ? res.json(email) : res.noparam();

                    case 'facebook':
                        const facebook = false;
                        return facebook !== false ? res.json(facebook) : res.noparam();

                    case 'twitter':
                        const twitter = false;
                        return twitter !== false ? res.json(twitter) : res.noparam();

                    case 'google':
                        const google = false;
                        return google !== false ? res.json(google) : res.noparam();
                }
            } catch(e) {
                return res.erro(400, e.message);
            }

        }
        return res.verbo();

    },

};

const signupEmail = async body => {
    if (body.email && body.password && body.nome) {
        const {nome, email, password} = body;

        const pass = UtilsService.saltPass(email, password);
        const user = {
            nome: nome,
            email: email,
            password: pass,
            tenant: 'none',
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

};
