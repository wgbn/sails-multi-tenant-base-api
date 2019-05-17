/**
 * TenantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require("jsonwebtoken");

module.exports = {

    async register(req, res) {

        if (req.method == 'POST') {
            if (req.body.tenant && req.body.user) {

                let tenant, user;

                // cria o tenant
                try {
                    tenant = await Tenant.create({...req.body.tenant, tenant:'none'}).fetch();
                } catch(e) {
                    console.log(e.message);
                    return res.erro(400, e.message);
                }

                // cria o usuario
                try {
                    // user = await User.create({...req.body.user, tenant: tenant.id}).fetch();
                    // user.hasOwnProperty('password') && delete user.password;

                    // const token = jwt.sign({user: user.id}, sails.config.security.salt, {expiresIn: sails.config.security.jwtExpires});
                    // user.token = token;

                    user = await UserService.signupEmail({...req.body.user, tenant: tenant.id});
                } catch(e) {
                    console.log(e.message);
                    await Tenant.destroy(tenant.id);
                    return res.erro(400, e.message);
                }

                return res.json({tenant, user});

            } else {
                return res.noparam();
            }
        }
        return res.verbo();

    }  

};

