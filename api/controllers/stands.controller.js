const standsService = require('../services/stands.service');

exports.getStands = async (req, res) => {
    try {
        const data = await standsService.getStands();
        return res.state(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.state(500).send("Erreur lors de la récupération des stands");
    }
}