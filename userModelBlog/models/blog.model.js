// bring in mongoose
const mongoose = require('mongoose');

// SCHEMA!!!
const blogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
},
    {
        timestamps: true,
        collection: 'blogCategory'
    })

const blogPostSchema = new mongoose.Schema({
    // 
    blogCategoryId: {
        // This type is used to reference another model by it's ID
        type: mongoose.Schema.Types.ObjectId, // ForeignKey, RelationalID
        // All this is is a reference to the BlogCategory model
        // This is a string that needs to match the name of the model
        ref: 'BlogCategory',
        required: true,
        // check to make sure the category ID actually exists:
        // Validate is a built-in mongoose function 
        // that allows us to check the value of a field
        validate: {
            validator: async function (value) {
                const category = await mongoose.model('BlogCategory').findById(value)
                return category ? true : false
            },
            message: 'Category does not exist'
        }
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    published: {
        type: Boolean,
        default: true
    }

    //  createdAt //  updatedAt
}, {
    timestamps: true,
    collection: 'blogPost'
})

// Schema is a blueprint for the data
// The model is an object that gives us access to a database collection
// The model is built from the schema
// The model is what enables us to interact with our database/collection
module.exports = {
    BlogCategory: mongoose.model('BlogCategory', blogCategorySchema),
    BlogPost: mongoose.model('BlogPost', blogPostSchema)
}

// example JSON:
// {
//     "blogCategoryId": "60e5b3f6c3f2b7d0e8b1e9c5",
//     "title": "My first blog post",
//     "content": "This is my first blog post.  I hope you like it.",
//     "published": true
// }