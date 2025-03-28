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
        const { login, password } = req.body;
        if (!login || !password) {
            return res.status(400).json({ error: 1, status: 404, data: 'aucun login/pass fourni' });
        }
        let data = await accountService.loginUser({login, password});
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
        let customer = req.body;

        if (req.file) {
            customer.file = req.file;
        }

        let data = await accountService.modifyCustomerAccount(customer);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification du compte client");
    }
};

exports.deleteCustomerAccount = async (req, res) => {
    try {
        let data = await accountService.deleteCustomerAccount(req.params.id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du compte client");
    }
}

exports.getCustomerById = async (req, res) => {
    try {
        let data = await accountService.getCustomerById(req.params.id);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du client par ID");
    }
}

exports.getCustomerByEmail = async (req, res) => {
    try {
        let data = await accountService.getCustomerByEmail(req.params.email);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du client par email");
    }
}

exports.getCustomerByName = async (req, res) => {
    try {
        let data = await accountService.getCustomerByName(req.params.name);
        if (data.error) {
            return res.status(data.status).send(data.data);
        }
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du client par nom");
    }
}
