module.exports = function(sails) {

    return {
        routes: {
            before: {
                'POST /*': function(req, res, next) {
                    return next();
                }
            },
            after: {
                'GET /*': function(req, res, next) {
                    console.log(req.model.name);
                    return next();
                }
            }
        }
    }

};