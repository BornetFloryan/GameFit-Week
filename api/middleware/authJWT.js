const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const catchError = (err, res) => {
    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({ message: "Non autorisé ! Le jeton d'accès a expiré !" });
    }
    return res.status(401).send({ message: "Non autorisé !" });
};

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        token = req.headers["authorization"];
        if (!token) {
            return res.status(403).send({
                message: "Aucun jeton fourni!"
            });
        }
        token = token.split(" ")[1];
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const hasRole = (roles) => (req, res, next) => {
    if (roles.includes(req.userRole)) {
        next();
    } else {
        res.status(403).send({ message: "Accès réservé à certains rôles!" });
    }
};

const authJwt = {
    verifyToken: verifyToken,
    hasRole: hasRole,
};

module.exports = authJwt;