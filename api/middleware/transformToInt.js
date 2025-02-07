function transformToInt(req, res, next) {
    function transform(obj) {
        for (let key in obj) {
            if (Object.hasOwn(obj, key)) {
                if (typeof obj[key] === 'string' && /^\d+$/.test(obj[key])) {
                    obj[key] = parseInt(obj[key], 10);
                }
            }
        }
    }

    if (req.body) {
        transform(req.body);
    }
    if (req.query) {
        transform(req.query);
    }
    if (req.params) {
        transform(req.params);
    }

    next();
}

module.exports = transformToInt;