import axios from 'axios';
import store from '@/store';

/* Explications :
Un agent axios permet de faire des requêtes asynchrones à un serveur.
Si l'appel réussit, l'agent axios renvoie un objet représentant la réponse.
L'API renvoie toujours des données sous la forme : { error, stats, data }
*/

const API_PORT = 3000;
const MAX_REFRESH_ATTEMPTS = 3;
let refreshAttempts = 0;
let errorCount = 0;

function getAccessToken() {
    return store.getters['account/getAccessToken'];
}

function getBaseURL() {
    const serverIP = localStorage.getItem('serverIP');
    return serverIP ? `http://${serverIP}:${API_PORT}/` : `http://localhost:${API_PORT}/`;
}

let axiosAgent = axios.create({
    baseURL: getBaseURL()
});

axiosAgent.interceptors.request.use(
    async config => {
        const token = getAccessToken();
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

let isRefreshing = false;
let failedRequestsQueue = [];

axiosAgent.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response) {
            const status = error.response.status;

            if (status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedRequestsQueue.push({ resolve, reject });
                    })
                        .then(token => {
                            originalRequest.headers['authorization'] = `Bearer ${token}`;
                            return axiosAgent(originalRequest);
                        })
                        .catch(err => Promise.reject(err));
                }

                if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
                    console.warn("Trop de tentatives de refresh, déconnexion...");
                    store.dispatch('account/logoutUser');
                    return Promise.reject(error);
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newToken = await store.dispatch('account/refreshToken');

                    if (!newToken) {
                        console.warn("⚠ Refresh token expiré ou invalide. Déconnexion...");
                        store.dispatch('account/logoutUser');
                        return Promise.reject(error);
                    }

                    refreshAttempts = 0;
                    failedRequestsQueue.forEach(prom => prom.resolve(newToken));
                    failedRequestsQueue = [];

                    originalRequest.headers['authorization'] = `Bearer ${newToken}`;
                    return axiosAgent(originalRequest);
                } catch (e) {
                    console.error('Erreur lors du rafraîchissement du token:', e);
                    failedRequestsQueue.forEach(prom => prom.reject(e));
                    failedRequestsQueue = [];
                    store.dispatch('account/logoutUser');
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            }

            if (status === 403) {
                console.warn("Refresh token expiré. Déconnexion forcée...");
                store.dispatch('account/logoutUser');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

async function handleError(serviceName, err) {
    if (err.response) {
        console.log("ERROR in SERVICE " + serviceName + ": " + JSON.stringify(err.response));
        return { data: { error: 1, data: err.response.data } };
    } else if (err.request) {
        console.log("NETWORK ERROR in SERVICE " + serviceName + ": " + JSON.stringify(err.request));

        if (err.code.includes('ERR_NETWORK')) {
            errorCount++;
            if (errorCount >= 3) {
                window.showServerIpPrompt();
                await new Promise(resolve => setTimeout(resolve, 1000));
                const serverIP = localStorage.getItem('serverIP');
                axiosAgent = axios.create({ baseURL: `http://${serverIP}:${API_PORT}/` });
                console.log('Nouvelle IP du serveur:', serverIP);
                errorCount = 0;
            }
        }

        return { data: { error: 1, data: 'Le serveur est injoignable ou l\'URL demandée n\'existe pas' } };
    } else {
        console.log("UNKNOWN ERROR in SERVICE " + serviceName);
        return { data: { error: 1, data: 'Erreur inconnue' } };
    }
}

async function getRequest(uri, name, config = {}) {
    try {
        const response = await axiosAgent.get(uri, config);
        return response.data;
    } catch (err) {
        return await handleError(name, err);
    }
}

async function postRequest(uri, data, name, config = {}) {
    try {
        const response = await axiosAgent.post(uri, data, config);
        return response.data;
    } catch (err) {
        return await handleError(name, err);
    }
}

async function patchRequest(uri, data, name, config = {}) {
    try {
        const response = await axiosAgent.patch(uri, data, config);
        return response.data;
    } catch (err) {
        return await handleError(name, err);
    }
}

async function putRequest(uri, data, name, config = {}) {
    try {
        const response = await axiosAgent.put(uri, data, config);
        return response.data;
    } catch (err) {
        return await handleError(name, err);
    }
}

async function deleteRequest(uri, name, config = {}) {
    try {
        const response = await axiosAgent.delete(uri, config);
        return response.data;
    } catch (err) {
        return await handleError(name, err);
    }
}

async function getLocalIp() {
    try {
        return await getRequest('local-ip', 'getLocalIp');
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'IP locale :', error);
        return 'localhost';
    }
}

export {
    getRequest,
    postRequest,
    patchRequest,
    putRequest,
    deleteRequest,
    getLocalIp
};
