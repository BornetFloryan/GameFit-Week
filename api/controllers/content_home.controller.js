const contentHomeService = require('../services/content_home.service');

exports.getContentHome = async (req, res) => {
    try {
        let data = await contentHomeService.getContentHome();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de la page principale");
    }
}

exports.modifyContentHome = async (req, res) => {
    try {
        let content_home = req.body;

        if (req.file) {
            content_home.file = req.file;
        }

        let data = await contentHomeService.modifyContentHome(content_home);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification de la page principale");
    }
}