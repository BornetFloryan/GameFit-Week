const standsService = require('../services/stands.service');

exports.getStands = async (req, res) => {
    try {
        const data = await standsService.getStands();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des stands");
    }
}