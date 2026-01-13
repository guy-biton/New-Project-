// controllers/clientController.js
const Client = require('../models/Client');

exports.getClients = async (req, res) => {
    const searchQuery = req.query.search;
    try {
        let clients;
        if (searchQuery) {
            clients = await Client.search(searchQuery);
        } else {
            clients = await Client.findAll();
        }
        res.render('clients', { clients, searchQuery, error: null });
    } catch (err) {
        console.error(err);
        res.render('clients', { clients: [], searchQuery: '', error: 'Error fetching clients' });
    }
};

exports.addClientSecure = async (req, res) => {
    const { name } = req.body;
    try {
        await Client.create(name);
        res.redirect('/clients');
    } catch (err) {
        // In secure app, we might still want to avoid showing raw DB errors
         res.render('clients', { clients: [], searchQuery: '', error: 'Error adding client' });
    }
};
