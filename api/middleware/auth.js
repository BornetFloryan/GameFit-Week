function checkSession(req, res, next) {
    const session = req.query.session;
    if (session) {
        next();
    } else {
        res.status(401).json({ error: "Non autorisé : Aucune session fournie" });
    }
}

module.exports = checkSession;