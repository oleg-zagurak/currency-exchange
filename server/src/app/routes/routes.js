const express = require('express');
const path = require('path');
const router = express.Router();

const controller = require('./../controllers/controller');

router.get('/:amount', controller.getData);

module.exports = router;