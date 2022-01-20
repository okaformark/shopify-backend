const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

/**
 * @description create product Route
 * @method POST
 */
router.post('/api/product', controller.create);

/**
 * @description retrieve product Route
 * @method GET
 */
router.get('/api/product', controller.get);

/**
 * @description retrieve one product Route
 * @method GET
 */
router.get('/api/product/:id', controller.getOne);

/**
 * @description update product Route
 * @method PUT
 */
router.put('/api/product/:id', controller.update);

/**
 * @description delete product Route
 * @method DELETE
 */
router.delete('/api/product/:id', controller.delete);

/**
 * @description export product Route
 * @method get
 */
router.get('/api/exportExcel', controller.exportExcel);

module.exports = router;
