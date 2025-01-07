const standsService = require('../services/stands.service');

exports.getStands = async (req, res) => {
    try {
        const data = await standsService.getStands();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des stands");
    }
}

exports.getPavillons = async (req, res) => {
    try {
        const data = await standsService.getPavillons();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des pavillons");
    }
}

exports.getStandsReservations = async (req, res) => {
    try {
        const data = await standsService.getStandsReservations();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations de stands");
    }
}

exports.modifyStand = async (req, res) => {
    try {
        const data = await standsService.modifyStand(req.body);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification du stand");
    }
}

exports.modifyStandsReservations = async (req, res) => {
    try {
        const data = await standsService.modifyStandsReservations(req.body);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification de la réservation de stand");
    }
}

exports.addStandReservation = async (req, res) => {
    try {
        const data = await standsService.addStandReservation(req.body);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(201).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la réservation de stand");
    }
}

exports.deleteStandReservation = async (req, res) => {
    try {
        const data = await standsService.deleteStandReservation(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression de la réservation de stand");
    }
}

exports.deleteStand = async (req, res) => {
    try {
        const data = await standsService.deleteStand(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du stand");
    }
}

exports.getStandById = async (req, res) => {
    try {
        const data = await standsService.getStandById(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du stand");
    }
}

exports.getStandReservationById = async (req, res) => {
    try {
        const data = await standsService.getStandReservationById(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de la réservation de stand");
    }
}

exports.getStandReservationsByStandId = async (req, res) => {
    try {
        const data = await standsService.getStandReservationsByStandId(req.params.stand_id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations de stand");
    }
}

exports.getStandsReservationsByStandIdAndDate = async (req, res) => {
    try {
        const data = await standsService.getStandsReservationsByStandIdAndDate(req.params.stand_id, req.params.date);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations de stand");
    }
}

exports.getStandsReservationsByCustomerId = async (req, res) => {
    try {
        const data = await standsService.getStandsReservationsByCustomerId(req.params.customer_id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations de stand");
    }
}

exports.getStandsReservationsByServiceId = async (req, res) => {
    try {
        const data = await standsService.getStandsReservationsByServiceId(req.params.service_id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations de stand");
    }
}

exports.getStandsReservationsByCustomerIdAndServiceId = async (req, res) => {
    try {
        const data = await standsService.getStandsReservationsByCustomerIdAndServiceId(req.params.customer_id, req.params.service_id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations de stand");
    }
}

exports.getStandsReservationsByCustomerIdAndServiceIdAndDate = async (req, res) => {
    try {
        const data = await standsService.getStandsReservationsByCustomerIdAndServiceIdAndDate(req.params.customer_id, req.params.service_id, req.params.date);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations de stand");
    }
}

exports.getStandsReservationsByCustomerIdAndDateAndExcludingStandId = async (req, res) => {
    try {
        const data = await standsService.getStandsReservationsByCustomerIdAndDateAndExcludingStandId(req.params.customer_id, req.params.date, req.params.stand_id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations de stand");
    }
}

exports.getPavillonById = async (req, res) => {
    try {
        const data = await standsService.getPavillonById(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du pavillon");
    }
}