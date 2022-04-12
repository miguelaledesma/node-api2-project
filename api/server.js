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



module.exports = server; 