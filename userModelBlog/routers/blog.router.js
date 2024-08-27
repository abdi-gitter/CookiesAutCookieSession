const router = require('express').Router();

// bring in controllers
// blog categories
// blog posts
const {BlogCategory, BlogPost} = require('../controllers/blog.controller')
// default route:
router.all('/', (req, res)=>{
    res.send('Welcome to /blog  Please use /categories or /posts')
})
// blog categories
// '/categories
router.route(('/categories'))
// GET all categories
    .get(BlogCategory.list)
// POST a new category
    .post(BlogCategory.create)

// category/:id
router.route('/categories/:id')
// req.params.id
// GET a single category
    .get(BlogCategory.read)
// PUT update a category
    .put(BlogCategory.update)
// PATCH update a category
    .patch(BlogCategory.update)
// DELETE a category
    .delete(BlogCategory.delete)


// blog posts
// '/posts'
router.route('/posts')
    .get(BlogPost.list)
    .post(BlogPost.create)

// req.params.id would be sent as /posts/:id
// query parameters are different from url parameters
// req.query.whatever would be sent as /posts?whatever=something

router.route('/posts/:id')
    .get(BlogPost.read)
    .put(BlogPost.update)
    .patch(BlogPost.update)
    .delete(BlogPost.delete)

module.exports = router;