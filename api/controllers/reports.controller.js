const reportsService = require('../services/reports.service');

exports.getReports = async (req, res) => {
    try {
        let data = await reportsService.getReports();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des signalements");
    }
}

exports.addReport = async (req, res) => {
    try {
        let data = await reportsService.addReport(req.body);
        return res.status(201).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout du signalement");
    }
}

exports.updateReport = async (req, res) => {
    try {
        let data = await reportsService.updateReport(req.body);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la mise à jour du signalement");
    }
}