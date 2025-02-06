const pool = require('../database/db');

async function getProviderServiceCategories() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_service_categories');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des catégories de services des prestataires' };
    } finally {
        client.release();
    }
}

async function addProviderServiceCategory(providerServiceCategory) {
    const client = await pool.connect();
    try {
        if (!providerServiceCategory || !providerServiceCategory.user.email || (providerServiceCategory.serviceCategory === undefined || providerServiceCategory.serviceCategory === null)) {
            return { error: 1, status: 404, data: 'Champs manquants' };
        }

        const existingUser = await client.query('SELECT * FROM customer_accounts WHERE email = $1', [providerServiceCategory.user.email]);
        if (existingUser.rows.length === 0) {
            return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
        }

        const existingProviderServiceCategories = await client.query('SELECT * FROM provider_service_categories WHERE customer_id = $1', [existingUser.rows[0]._id]);
        if (existingProviderServiceCategories.rows.find(e => e.service_id === providerServiceCategory.serviceCategory)) {
            return { error: 1, status: 404, data: 'Service déjà existant pour le prestataire' };
        }

        const lastIdRes = await client.query('SELECT _id FROM provider_service_categories ORDER BY _id DESC LIMIT 1');
        const newId = lastIdRes.rows.length > 0 ? parseInt(lastIdRes.rows[0]._id) + 1 : 1;

        const res = await client.query(
            'INSERT INTO provider_service_categories (_id, state, customer_id, service_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [newId, "0", existingUser.rows[0]._id, providerServiceCategory.serviceCategory]
        );
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de la catégorie de service du prestataire' };
    } finally {
        client.release();
    }
}

async function modifyProviderServiceCategory(providerServiceCategory) {
    const client = await pool.connect();
    try {
        if (!providerServiceCategory || (providerServiceCategory._id === undefined || providerServiceCategory._id === null)) {
            return { error: 1, status: 404, data: 'Champs manquants' };
        }

        const res = await client.query(
            'UPDATE provider_service_categories SET state = $1, customer_id = $2, service_id = $3 WHERE _id = $4 RETURNING *',
            [providerServiceCategory.state, providerServiceCategory.customer_id, providerServiceCategory.service_id, providerServiceCategory._id]
        );
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Service non trouvé' };
        }
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la modification de la catégorie de service du prestataire' };
    } finally {
        client.release();
    }
}

async function deleteProviderServiceCategory(providerServiceCategory) {
    const client = await pool.connect();
    try {
        if (!providerServiceCategory || !providerServiceCategory._id) {
            return { error: 1, status: 404, data: 'Champs manquants' };
        }

        const res = await client.query('DELETE FROM provider_service_categories WHERE _id = $1 RETURNING _id', [providerServiceCategory._id]);
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Service non trouvé' };
        }
        return { error: 0, status: 200, data: res.rows[0]._id };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression de la catégorie de service du prestataire' };
    } finally {
        client.release();
    }
}

async function getProviderServiceCategoriesByCustomerId(customer_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_service_categories WHERE customer_id = $1', [customer_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving provider service categories by customer ID' };
    } finally {
        client.release();
    }
}

async function getProviderServiceCategoriesByCustomerIdAndServiceID(customer_id, service_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_service_categories WHERE customer_id = $1 AND service_id = $2', [customer_id, service_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Provider service category not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving provider service category by customer ID and service ID' };
    } finally {
        client.release();
    }
}

async function getProviderServiceCategoriesCustomerId() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT DISTINCT customer_id FROM provider_service_categories WHERE customer_id IS NOT NULL');
        return { error: 0, data: res.rows.map(row => row.customer_id) };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving provider service categories customer IDs' };
    } finally {
        client.release();
    }
}

async function getProviderOfferingServices() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT DISTINCT customer_id FROM provider_service_categories WHERE state = $1', ["1"]);
        const uniqueProviderIds = res.rows.map(row => row.customer_id);
        const customersRes = await client.query('SELECT * FROM customer_accounts WHERE _id = ANY($1)', [uniqueProviderIds]);
        return { error: 0, data: customersRes.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving providers offering services' };
    } finally {
        client.release();
    }
}

module.exports = {
    getProviderServiceCategories,
    addProviderServiceCategory,
    modifyProviderServiceCategory,
    deleteProviderServiceCategory,
    getProviderServiceCategoriesByCustomerId,
    getProviderServiceCategoriesByCustomerIdAndServiceID,
    getProviderServiceCategoriesCustomerId,
    getProviderOfferingServices,
}