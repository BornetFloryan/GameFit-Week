const sportsCategoriesService = require('../services/sportsCategories.service');

exports.getSportsCategories = async (req, res) => {
    try {
        let data = await sportsCategoriesService.getSportsCategories();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des catégories de sports");
    }
}