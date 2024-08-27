// bring in the models for the blog posts and blog categories
const {BlogCategory, BlogPost} = require('../models/blog.model')
// Now we have a BlogCategory model
// and a BlogPost model

module.exports.BlogCategory ={
    // GET all categories
    list: async (req, res)=>{
        const data = await BlogCategory.find()
        // find all categories
        res.status(200).send(({
            error: false,
            data: data
        }))
    },
    // POST a new category
    create: async (req, res)=>{
        const data = await BlogCategory.create(req.body)
        res.status(201).send({
            error: false,
            body: req.body,
            data: data
        })
    },

    // methods for single categories:
    // GET a single category
    read: async (req, res)=>{
        // I need to get an ID from the URL
        // '/categories/:id'
        const data = await BlogCategory.find({_id:req.params.id})
        res.status(200).send({
            error: false,
            data: data
        })
    },
    // PUT PATCH update a category
    update: async (req, res)=>{
        const data = await BlogCategory.updateOne({_id: req.params.id}, req.body)
        // now I'll find the updated value and send it back
        const newData = await BlogCategory.find({_id: req.params.id})
        res.status(202).send({
            error: false,
            body: req.body,
            data: data,
            newData: newData
        })
    },
    // DELETE a category
    delete: async (req, res)=>{
        const data = await BlogCategory.deleteOne({_id: req.params.id})
        // remember if we delete something, data.deletedCount will be 1
        // if nothing is found/deleted, data.deletedCount will be 0
        res.sendStatus((data.deletedCount >= 1)? 204: 404)
    }
}

module.exports.BlogPost = {
    list: async (req, res) => {
        const data = await BlogPost.find()
        res.status(200).send({
            error: false,
            data: data
        })

    },
    create: async (req, res) => {
        const data = await BlogPost.create(req.body)
        res.status(201).send({
            error: false,
            body: req.body,
            data: data
        })
    },
    read: async (req, res) => {
        const data = await BlogPost.find({ _id: req.params.id })
        res.status(202).send({
            error: false,
            data: data

        })
    },
    update: async (req, res) => {
        const data = await BlogPost.updateOne({ _id: req.params.id }, req.body)
        const newdata = await BlogPost.find({ _id: req.params.id })
        res.status(202).send({
            error: false,
            body: req.body,
            data: data, // info about update
            // güncel veriyi istiyorsan tekrar çağır
            newdata: newdata
        })
    },
    delete: async (req, res) => {
        const data = await BlogPost.deleteOne({ _id: req.params.id })
        // console.log(data);
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    }
}