const roundsService = require('../services/rounds.service');


exports.getRounds = async (req, res) => {
    try {
        let data = await roundsService.getRounds();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des rounds du tournois");
    }
}


exports.createRound = async (req,res) =>{
    try {
        let data = await roundsService.createRound(req.body);
        if(data.error ===0){
            return res.status(200).json({ data: data });
        }
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la création du round");
    }
}

exports.editRound = async (req,res) =>{
    try {
        let data = await roundsService.editRound(req.body);
        return res.status(data.status).json({ data: data });
    }catch(error){
        console.error(error);
        return res.status(500).send("Erreur lors de la mise a jour du round");
    }
}

exports.deleteRoundByID = async (req,res) =>{
    try {
        let data = await roundsService.deleteRoundByID(req.params.id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du round");
    }
}

exports.getRoundByID = async (req,res) =>{
    try {
        let data = await roundsService.getRoundByID(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du round par ID");
    }
}