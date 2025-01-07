const serviceCategoriesService = require('../services/serviceCategories.service');

exports.getServiceCategories = async function (req, res) {
    try {
        const result = await serviceCategoriesService.getServiceCategories();
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de la récupération des catégories de services' });
    }
}

exports.getServiceCategoryById = async function (req, res) {
    try {
        const result = await serviceCategoriesService.getServiceCategoryById(req.params.id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving service category by ID' });
    }
}