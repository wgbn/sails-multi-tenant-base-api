/**
 * verbo.js
 *
 * A custom response.
 */

module.exports = function verbo() {
    // Get access to `req` and `res`
    const res = this.res;

    // Define the status code to send in the response.
    const statusCodeToSet = 400;
    return res.status(statusCodeToSet).json(`Método não autorizado`);
};
