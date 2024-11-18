import TicketingService from "@/services/ticketing.service";

const state = () => ({
    // state = les données centralisées
    tickets: sessionStorage.getItem('tickets') || [],
    ticketsAnimationCategories: [],
    ticketsAgeCategories: [],
    ticketPrice: "",
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updatetickets(state, tickets) {
        state.tickets = tickets;
        sessionStorage.setItem('tickets', tickets);
    },
    updateticketsAnimationCategories(state, animationCategories) {
        state.ticketsAnimationCategories = animationCategories;
    },
    updateticketsAgeCategories(state, ageCategories) {
        state.ticketsAgeCategories = ageCategories;
    },
    updateticketPrice(state, price) {
        state.ticketPrice = price;
    },
    addTickets(state, tickets) {
        for (let ticket of tickets)
            state.tickets.push(ticket);
        sessionStorage.setItem('tickets', state.tickets);
    },
};
// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async getTickets({ commit }) {
        try {
            let response = await TicketingService.getTickets();
            if (response.error === 0) {
                commit('updatetickets', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tickets:', error);
        }
    },
    async getTicketsAnimationCategories({ commit }) {
        try {
            let response = await TicketingService.getTicketsAnimationCategories();
            if (response.error === 0) {
                commit('updateticketsAnimationCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories d\'animation:', error);
        }
    },
    async getTicketsAgeCategories({ commit }, ticket) {
        try {
            let response = await TicketingService.getTicketsAgeCategories(ticket);
            if (response.error === 0) {
                commit('updateticketsAgeCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories d\'âge:', error);
        }
    },
    async getTicketPrice({ commit }, ticket) {
        try {
            let response = await TicketingService.getTicketPrice(ticket);
            if (response.error === 0) {
                commit('updateticketPrice', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du prix du ticket:', error);
        }
    },
    async addTickets({ commit }, formData) {
        try {
            let response = await TicketingService.addTickets(formData);
            if (response.error === 0) {
                commit('addTickets', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du ticket:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout du ticket' };
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};