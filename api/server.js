// implement your server here
// require your posts router and connect it here
const express = require('express')

const server = express();

server.use(express.json()); 

const Posts = require('./posts/posts-model'); 



module.exports = server; 