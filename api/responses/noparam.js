/**
 * noparam.js
 *
 * A custom response.
 */

module.exports = function noparam() {
    // Get access to `req` and `res`
    const res = this.res;

    // Define the status code to send in the response.
    const statusCodeToSet = 400;
    return res.status(statusCodeToSet).json(`Faltam parâmetros`);
};
