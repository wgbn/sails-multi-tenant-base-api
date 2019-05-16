/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require("jsonwebtoken");

module.exports = {

    async email(req, res) {

        if (req.method == 'POST') {
            if (req.body.email && req.body.password) {
                const {email, password} = req.body;

                const pass = UtilsService.saltPass(email, password);

                try {
                    const user = await User.findOne({ email: email, password: pass });
                    if (!user) return res.erro(401,{erro: 'Usuário e/ou senha inválido.'});
                    if (user.status != 'active' ) return res.erro(401,{erro: 'Usuário não tem acesso ao sistema.'});

                    const token = jwt.sign({user: user.id}, sails.config.security.salt, {expiresIn: sails.config.security.jwtExpires});
                    user.hasOwnProperty('password') && delete user.password;

                    return res.json({token, user});

                } catch(e) {
                    return res.erro(400,e.message);
                }

            }
            return res.noparam();
        }
        return res.verbo();
    },

    async facebook(req, res) {
        if (req.method == 'POST') {

        }
        return res.verbo();
    },

    async twitter(req, res) {
        if (req.method == 'POST') {

        }
        return res.verbo();
    },

    async google(req, res) {
        if (req.method == 'POST') {

        }
        return res.verbo();
    },

};

