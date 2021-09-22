const router = require('express').Router();
const {blog_CreateIndex, blog_Index, blog_GetById, blog_Post, blog_delete} = require('../controllers/blogController');

router.get('/', blog_Index);

router.get('/create',blog_CreateIndex);

router.get('/:id', blog_GetById);

router.delete('/:id', blog_delete);

router.post('/',blog_Post);
let da = new Date()
da.getFullYear()
module.exports = router;
