const express = require('express')
const postController = require('../controllers/postController')
const { hasDescription } = require('../validations/validators')
const uploadImage = require('../middleware/multer')
const router = express.Router()

router.get('/', postController.index)
router.get('/:id', postController.show)
router.post('/',
    uploadImage('posts').single('image'),
    hasDescription, 
    postController.store
)
router.patch('/:id', postController.update)
router.delete('/:id', postController.delete)

module.exports = router