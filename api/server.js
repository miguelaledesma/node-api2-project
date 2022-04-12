// implement your server here
// require your posts router and connect it here
const e = require('express');
const express = require('express')

const server = express();

server.use(express.json()); 

const Posts = require('./posts/posts-model'); 


//ENDPOINTS FOR POSTS 

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

server.put('/api/posts/:id', (req, res) => {
    let id = req.params.id; 
    let post = req.body; 

    if(!post.title || !post.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else{
        Posts.update(id, post)
        .then(numberOfUpdate => {
            if(numberOfUpdate === 1){
              Posts.findById(id)
              .then(posts => {
                  res.status(200).json(posts)
              })
                
            } else{
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post information could not be modified" })
        })
    }
})

  server.delete('/api/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else{
            
            res.json(post)
            return 
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post could not be removed" })
    })
  })

    // server.get('/api/posts/:id/comments', (req,res) => {

    // })  
   
    server.get('/api/posts/:id/comments', (req, res) => {
        Posts.findPostComments(req.params.id)
          .then(post => {
            if (post.length > 0) {
              res.status(200).json(post);
            } else {
              res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The comments information could not be retrieved" });
          });
      });




module.exports = server; 