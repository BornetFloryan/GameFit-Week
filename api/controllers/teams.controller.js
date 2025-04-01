const teamsService = require('../services/teams.service');

exports.getTeams = async (req, res) => {
    try {
        let data = await teamsService.getTeams();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des équipes");
    }
}

exports.addTeam = async (req,res) => {
    try {
        let data = await teamsService.addTeam(req.body);
        if(data.error ===0){
            return res.status(200).json({ data: data });
        }
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la création de l'équipe");
    }
}

exports.editTeam = async (req,res) => {
        try {
            let data = await teamsService.editTeam(req.body);
            return res.status(data.status).json({ data: data });
        }catch(error){
            console.error(error);
            return res.status(500).send("Erreur lors de la mise a jour de l'équipe");
        }
}

exports.getTeamByID = async (req,res) => {

    try {
        let data = await teamsService.getTeamByID(req.params.id);
        if (data.error) {
            return res.status(data.status).json({ data: data });
        }
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de l'équipe par ID");
    }

}

exports.deleteTeamByID = async (req,res) => {
    try {
        let data = await teamsService.deleteTeamByID(req.params.id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression de l'équipe");
    }
}