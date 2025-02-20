function transformToString(req, res, next) {
    const originalSend = res.send;

    res.send = function (data) {
        function transform(obj) {
            for (let key in obj) {
                if (Object.hasOwn(obj, key)) {
                    if (typeof obj[key] === 'number') {
                        obj[key] = obj[key].toString();
                    }
                }
            }
        }

        if (typeof data === 'string') {
            try {
                const jsonData = JSON.parse(data);
                transform(jsonData);
                data = JSON.stringify(jsonData);
            } catch (e) {
                // Do nothing
            }
        } else if (typeof data === 'object') {
            transform(data);
        }

        originalSend.call(this, data);
    };

    next();
}

module.exports = transformToString;