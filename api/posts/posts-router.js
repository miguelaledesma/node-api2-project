// implement your posts router here
const express = require('express'); 

const router = express.Router()

const Posts = require('./posts-model'); 

//ENDPOINTS FOR POSTS 

router.get('/', (req, res) => {
    Posts.find().then(post => {
        res.json(post)
    })
})


router.get('/:id', (req, res) => {
    Posts.findById(req.params.id).then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.json(post)
        }
    })
}); 

router.post('/', (req,res) => {
    let post = req.body
    let id = req.params.id

    if(!post.title || !post.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.insert(post)
        
        .then(createdPost => {
            res.status(201).json(createdPost)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else{
            Posts.remove(req.params.id)
            .then(deleted => {
                res.status(200).json(post)
            })
            
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post could not be removed" })
    })
  })

    // server.get('/api/posts/:id/comments', (req,res) => {

    // })  
   
    router.get('/:id/comments', (req, res) => {
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


      module.exports = router; 