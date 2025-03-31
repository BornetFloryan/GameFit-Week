const basketService = require('../services/basket.service');
const basketItemService = require('../services/basketItem.service');

exports.getAllBaskets = async (req, res) => {
    try {
        let data = await basketService.getAllBaskets();
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des paniers");
    }
}

exports.getBasketsByTicketId = async (req, res) => {
    try {
        let data = await basketService.getBasketsByTicketId(req.params.ticket_id);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des paniers");
    }
};

exports.createBasket = async (req, res) => {
    try {
        let { ticket_id, provider_service_categories_id } = req.body;
        let data = await basketService.createBasket(ticket_id, provider_service_categories_id);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la création du panier");
    }
};

exports.updateBasketState = async (req, res) => {
    try {
        let { state, is_order } = req.body;
        let data = await basketService.updateBasketState(req.params.basket_id, state, is_order);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la mise à jour du panier");
    }
};

exports.deleteBasket = async (req, res) => {
    try {
        let data = await basketService.deleteBasket(req.params.basket_id);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du panier");
    }
};

exports.getItemsByBasket = async (req, res) => {
    try {
        let data = await basketItemService.getItemsByBasket(req.params.basket_id);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des articles du panier");
    }
};

exports.addItemToBasket = async (req, res) => {
    try {
        let { item_id, item_type, quantity } = req.body;
        let data = await basketItemService.addItemToBasket(req.params.basket_id, item_id, item_type, quantity);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de l'article au panier");
    }
};

exports.updateItemQuantity = async (req, res) => {
    try {
        let { quantity } = req.body;
        let data = await basketItemService.updateItemQuantity(req.params.item_id, quantity);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la mise à jour de la quantité de l'article");
    }
};

exports.deleteItemFromBasket = async (req, res) => {
    try {
        let data = await basketItemService.deleteItemFromBasket(req.params.item_id);
        return res.status(data.status).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression de l'article du panier");
    }
};
