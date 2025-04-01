const matchsService = require('../services/matchs.service');

exports.getMatchs = async (req,res) =>  {
    try {
        let data = await matchsService.getMatchs();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des matchs");
    }
}
exports.createMatch = async (req,res) =>  {
    try {
        let data = await matchsService.createMatch(req.body);
        if(data.error ===0){
            return res.status(200).json({ data: data });
        }
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la création du match");
    }
}
exports.editMatch = async (req,res) =>  {
    try {
        let data = await matchsService.editMatch(req.body);
        return res.status(data.status).json({ data: data });
    }catch(error){
        console.error(error);
        return res.status(500).send("Erreur lors de la mise a jour du match");
    }
}
exports.deleteMatchByID = async (req,res) =>  {
    try {
        let data = await matchsService.deleteMatchByID(req.params.id);
        if (data.error ===1){
            return res.status(data.status).json({ data: data });
        }
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du match");
    }
}
exports.getMatchByID = async (req,res) =>  {
    try {
        let data = await matchsService.getMatchByID(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du match par ID");
    }
}