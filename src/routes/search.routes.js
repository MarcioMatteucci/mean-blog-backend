const router = require('express').Router();

const SearchesController = require('../controllers/searches.controller');

// Busqueda general
router.get('/', SearchesController.searchAll);

module.exports = router;