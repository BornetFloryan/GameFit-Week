import TicketService from "@/services/ticket.service";

const state = () => ({
    // state = les données centralisées
    tickets: [],
    ticketsAnimationCategories: [],
    ticketsAgeCategories: [],
    ticketPrices: [],
});

// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updatetickets(state, tickets) {
        state.tickets = tickets;
    },
    updateticketsAnimationCategories(state, animationCategories) {
        state.ticketsAnimationCategories = animationCategories;
    },
    updateticketsAgeCategories(state, ageCategories) {
        state.ticketsAgeCategories = ageCategories;
    },
    updateticketPrices(state, price) {
        state.ticketPrices = price;
    },
    addTickets(state, tickets) {
        for (let ticket of tickets)
            state.tickets.push(ticket);
    },
    deleteTicket(state, ticket_id) {
        let index = state.tickets.findIndex(e => e._id === ticket_id);
        if (index !== -1) {
            state.tickets.splice(index, 1);
        }
    },
};

// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async getTickets({commit}) {
        try {
            let response = await TicketService.getTickets();
            if (response.error === 0) {
                commit('updatetickets', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tickets:', error);
        }
    },
    async getTicketsAnimationCategories({commit}) {
        if (this.state.ticket.ticketsAnimationCategories.length > 0) return;
        try {
            let response = await TicketService.getTicketsAnimationCategories();
            if (response.error === 0) {
                commit('updateticketsAnimationCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories d\'animation:', error);
        }
    },
    async getTicketsAgeCategories({commit},) {
        try {
            let response = await TicketService.getTicketsAgeCategories();
            if (response.error === 0) {
                commit('updateticketsAgeCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories d\'âge:', error);
        }
    },
    async getTicketPrices({commit},) {
        try {
            let response = await TicketService.getTicketPrices();
            if (response.error === 0) {
                commit('updateticketPrices', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du prix du ticket:', error);
        }
    },
    async addTickets({commit}, formData) {
        try {
            let response = await TicketService.addTickets(formData);

            if (response.error === 0) {
                commit('addTickets', response.data);
            }
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du ticket:', error);
            return {error: 1, data: 'Erreur lors de l\'ajout du ticket'};
        }
    },
    async deleteTicket({commit}, ticket_id) {
        try {
            let response = await TicketService.deleteTicket(ticket_id);
            if (response.error === 0) {
                commit('deleteTicket', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression du ticket:', error);
            return {error: 1, data: 'Erreur lors de la suppression du ticket'};
        }
    },
};

const getters = {
    getTicketById: (state) => (id) => {
        return state.tickets.find(ticket => ticket._id === id);
    },
    getTicketPricesPriceById: (state) => (id) => {
        return state.ticketPrices.find(price => price._id === id);
    },
    getTicketPriceByCategories: (state) => (animationCategoryId, ageCategoryId) => {
        return state.ticketPrices.find(price =>
            price.age_category_id === ageCategoryId &&
            price.animation_category_id === animationCategoryId
        );
    },
    getTicketsAnimationCategoryById: (state) => (id) => {
        return state.ticketsAnimationCategories.find(animationCategory => animationCategory._id === id);
    },
    getTicketsAgeCategoryById: (state) => (id) => {
        return state.ticketsAgeCategories.find(ageCategory => ageCategory._id === id);
    },
    getTicketsByCustomerId: (state) => (id) => {
        return state.tickets.filter(ticket => ticket.customer_id === id);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};