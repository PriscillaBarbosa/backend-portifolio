const express = require('express');
const router = express.Router();

const { handleContactForm } = require('../controllers/contactController');

//definição das rotas 
router.post('/send-email', handleContactForm);

module.exports = router;
