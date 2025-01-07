const providerService = require('../services/providerRequests.service');

exports.getProviderRequests = async (req, res) => {
    try {
        let data = await providerService.getProviderRequests();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des demandes de fournisseur");
    }
}

exports.addProviderRequest = async (req, res) => {
    try {
        let data = await providerService.addProviderRequest(req.body);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la demande de fournisseur");
    }
}

exports.modifyProviderRequest = async (req, res) => {
    try {
        let data = await providerService.modifyProviderRequest(req.body);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification de la demande de fournisseur");
    }
}

exports.deleteProviderRequest = async (req, res) => {
    try {
        let data = await providerService.deleteProviderRequest(req.body);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression de la demande de fournisseur");
    }
}

exports.getProviderRequestById = async (req, res) => {
    try {
        let data = await providerService.getProviderRequestById(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json({ data: data.data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de la demande de fournisseur par ID");
    }
}

exports.getProviderRequestsByCustomerId = async (req, res) => {
    try {
        let data = await providerService.getProviderRequestsByCustomerId(req.params.customer_id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json({ data: data.data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des demandes de fournisseur par ID client");
    }
}