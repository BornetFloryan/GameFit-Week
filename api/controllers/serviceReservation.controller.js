const serviceReservationService = require('../services/serviceReservation.service');

exports.getServiceReservations = async function (req, res) {
    try {
        const result = await serviceReservationService.getServiceReservations();
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de la récupération des réservations de services' });
    }
}

exports.addServiceReservation = async function (req, res) {
    try {
        const result = await serviceReservationService.addServiceReservation(req.body);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de l\'ajout de la réservation de service' });
    }
}

exports.modifyServiceReservation = async function (req, res) {
    try {
        const result = await serviceReservationService.modifyServiceReservation(req.body);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de la modification de la réservation de service' });
    }
}

exports.deleteServiceReservation = async function (req, res) {
    try {
        const result = await serviceReservationService.deleteServiceReservation(req.params.id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Erreur lors de la suppression de la réservation de service' });
    }
}



exports.getServiceReservationsById = async function (req, res) {
    try {

        const result = await serviceReservationService.getServiceReservationsById(req.params.id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving service reservation by ID' });
    }
}

exports.getServiceReservationsByTicketId = async function (req, res) {
    try {
        const result = await serviceReservationService.getServiceReservationsByTicketId(req.params.ticket_id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving service reservations by ticket ID' });
    }
}

exports.getServiceReservationByServiceId = async function (req, res) {
    try {
        const result = await serviceReservationService.getServiceReservationByServiceId(req.params.service_id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving service reservations by service ID' });
    }
}

exports.getServiceReservationsByStandsReservationsIdAndServiceId = async function (req, res) {
    try {
        const result = await serviceReservationService.getServiceReservationsByStandsReservationsIdAndServiceId(req.params.standsReservationsId, req.params.service_id);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving service reservations by stand reservation ID and service ID' });
    }
}

exports.getServiceReservationsByTicketIdAndDate = async function (req, res) {
    try {
        const result = await serviceReservationService.getServiceReservationsByTicketIdAndDate(req.params.ticket_id, req.params.date);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving service reservations by ticket ID and date' });
    }
}

exports.getServiceReservationsByDate = async function (req, res) {
    try {
        const result = await serviceReservationService.getServiceReservationsByDate(req.params.date);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 1, data: 'Error retrieving service reservations by date' });
    }
}