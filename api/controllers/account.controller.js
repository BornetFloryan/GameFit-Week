const accountService = require('../services/account.service');

exports.getCustomersAccounts = async (req, res) => {
    try {
        let data = await accountService.getCustomersAccounts();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des comptes clients");
    }
}

exports.loginUser = async (req, res) => {
    try {
        let data = await accountService.loginUser(req.body.login, req.body.password);
        if (data) {
            return res.status(200).json({ data: data });
        } else {
            return res.status(404).send("Login/pass incorrect");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la connexion de l'utilisateur");
    }
}

exports.addCustomerAccount = async (req, res) => {
    try {
        let data = await accountService.addCustomerAccount(req.body);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout du compte client");
    }
}

exports.modifyCustomerAccount = async (req, res) => {
    try {
        let data = await accountService.modifyCustomerAccount(req.body);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification du compte client");
    }
}