const SHA256 = require("crypto-js/sha256");

module.exports = {

    /**
     * Recebe senha e username e retorna uma string criptografada com um salt
     * @param options {object}
     */
    saltPass(email, password) {
        const salt = SHA256(password + sails.config.security.salt).toString();
        return SHA256(email + salt).toString();
    }

};
