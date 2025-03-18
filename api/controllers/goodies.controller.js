const goodiesService = require('../services/goodies.service');

exports.getAllGoodies = async (req, res) => {
    try {
        const data = await goodiesService.getAllGoodies();
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des goodies");
    }
};

exports.getGoodieById = async (req, res) => {
    try {
        const data = await goodiesService.getGoodieById(req.params.id);
        if (!data) return res.status(404).send("Goodie non trouvé");
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du goodie");
    }
};

exports.addGoodie = async (req, res) => {
    try {
        const { name, image, price, description } = req.body;
        const data = await goodiesService.addGoodie(name, image, price, description);
        return res.status(201).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la création du goodie");
    }
};

exports.updateGoodie = async (req, res) => {
    try {
        const { name, image, description } = req.body;
        const data = await goodiesService.updateGoodie(req.params.id, name, image, description);
        if (!data) return res.status(404).send("Goodie non trouvé");
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la mise à jour du goodie");
    }
};

exports.deleteGoodie = async (req, res) => {
    try {
        await goodiesService.deleteGoodie(req.params.id);
        return res.status(200).send("Goodie supprimé avec succès");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du goodie");
    }
};

exports.getGoodieSizes = async (req, res) => {
    try {
        const data = await goodiesService.getGoodieSizes();
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des tailles");
    }
};

exports.getGoodieVariations = async (req, res) => {
    try {
        const data = await goodiesService.getGoodieVariations(req.params.goodie_id);
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des variations");
    }
};

exports.addGoodieVariation = async (req, res) => {
    try {
        const { goodie_id, size_id } = req.body;
        const data = await goodiesService.addGoodieVariation(goodie_id, size_id);
        return res.status(201).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la variation");
    }
};
