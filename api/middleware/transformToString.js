function transformToString(req, res, next) {
    const originalSend = res.send;

    res.send = function (data) {
        function transform(obj) {
            if (Array.isArray(obj)) {
                obj.forEach(transform);
            } else if (obj !== null && typeof obj === 'object') {
                for (let key in obj) {
                    if (Object.hasOwn(obj, key)) {
                        // Transformation des nombres en chaînes (sauf pour "error")
                        if (typeof obj[key] === 'number' && key !== 'error') {
                            obj[key] = obj[key].toString();
                        }
                        // Transformation des dates (format YYYY-MM-DD) avec +1 jour
                        else if (typeof obj[key] === 'string' && key === 'date') {
                            const date = new Date(obj[key]);
                            if (!isNaN(date.getTime())) {
                                date.setDate(date.getDate() + 1); // Ajoute 1 jour
                                obj[key] = date.toISOString().split('T')[0];
                            }
                        }
                        // Transformation des heures (format HH:mm:ss en HH:mm)
                        else if (typeof obj[key] === 'string' && /^(time|start_time|end_time)$/.test(key) && /^\d{2}:\d{2}:\d{2}$/.test(obj[key])) {
                            obj[key] = obj[key].slice(0, 5); // HH:mm
                        }
                        // Appel récursif si c'est un objet
                        else if (typeof obj[key] === 'object') {
                            transform(obj[key]);
                        }
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
