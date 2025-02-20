const providerServiceCategoriesService = require('../services/providerServiceCategories.service');

exports.getProviderServiceCategories = async function (req, res) {
    try {
        const result = await providerServiceCategoriesService.getProviderServiceCategories();
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de la récupération des catégories de services des prestataires' });
    }
}

exports.addProviderServiceCategory = async function (req, res) {
    try {
        const result = await providerServiceCategoriesService.addProviderServiceCategory(req.body);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de l\'ajout de la catégorie de service du prestataire' });
    }
}

exports.modifyProviderServiceCategory = async function (req, res) {
    try {
        const result = await providerServiceCategoriesService.modifyProviderServiceCategory(req.body);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de la modification de la catégorie de service du prestataire' });
    }
}

exports.deleteProviderServiceCategory = async function (req, res) {
    try {
        const result = await providerServiceCategoriesService.deleteProviderServiceCategory(req.params.id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de la suppression de la catégorie de service du prestataire' });
    }
}

exports.getProviderServiceCategoriesByCustomerId = async function (req, res) {
    try {
        const result = await providerServiceCategoriesService.getProviderServiceCategoriesByCustomerId(req.params.customer_id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving provider service categories by customer ID' });
    }
}

exports.getProviderServiceCategoriesByCustomerIdAndServiceID = async function (req, res) {
    try {
        const result = await providerServiceCategoriesService.getProviderServiceCategoriesByCustomerIdAndServiceID(req.params.customer_id, req.params.service_id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving provider service category by customer ID and service ID' });
    }
}

exports.getProviderServiceCategoriesCustomerId = async function (req, res) {
    try {
        const result = await providerServiceCategoriesService.getProviderServiceCategoriesCustomerId();
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving provider service categories customer IDs' });
    }
}

exports.getProviderOfferingServices = async function (req, res) {
    try {
        const result = await providerServiceCategoriesService.getProviderOfferingServices();
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving providers offering services' });
    }
}