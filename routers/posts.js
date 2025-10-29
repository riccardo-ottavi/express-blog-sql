const express = require("express");

// settiamo il router
const router = express.Router();

// importiamo il controller della risorsa
const postController = require('../controllers/postController');


// Rotte di CRUD sulla risorsa 
// index
router.get('/', postController.index);

// show
router.get('/:id', postController.show);

// store
router.post('/', postController.store);

// update
router.put('/:id', postController.update);

// modify
router.patch('/:id', postController.modify);

// destroy
router.delete('/:id', postController.destroy);

module.exports = router;