// implement your server here
// require your posts router and connect it here
const express = require('express')

const server = express();

server.use(express.json()); 

const Posts = require('./posts/posts-model'); 

server.get('/api/posts', (req, res) => {
    Posts.find().then(post => {
        res.json(post)
    })
})


server.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id).then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.json(post)
        }
    })
}); 

server.post('/api/posts', (req,res) => {
    let posts = req.body
    if(!posts.title || !posts.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.insert(posts)
        .then(createdPost => {
            res.status(201).json(createdPost)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
})



module.exports = server; 