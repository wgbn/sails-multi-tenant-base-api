/**
 * erro.js
 *
 * A custom response.
 */

module.exports = function erro(cod, msg) {
    // Get access to `req` and `res`
    const res = this.res;
    return res.status(cod).json(msg);
};
