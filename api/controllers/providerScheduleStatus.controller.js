const providerScheduleStatusService = require('../services/providerScheduleStatus.service');

exports.getScheduleStatus = async (req, res) => {
    try {
        let data = await providerScheduleStatusService.getProviderScheduleStatus();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des comptes clients");
    }
}

exports.addScheduleStatus = async (req, res) => {
    try {
        const { email } = req.body;
        let data = await providerScheduleStatusService.addProviderScheduleStatus(email);
        return res.status(data.status).json({ data: data.data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout du statut du planning");
    }
}

exports.modifyScheduleStatus = async (req, res) => {
    try {
        const providerScheduleStatus = req.body;
        let data = await providerScheduleStatusService.modifyProviderScheduleStatus(providerScheduleStatus);
        return res.status(data.status).json({ data: data.data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification du statut du planning");
    }
}

exports.getScheduleStatusByCustomerId = async (req, res) => {
    try {
        const { customer_id } = req.params;
        let data = await providerScheduleStatusService.getProviderScheduleStatusByCustomerId(customer_id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des entrées du planning");
    }
}
