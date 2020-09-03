const express = require('express');
const db = require ('../db/config');
const { index, create, show } = require('../db/queries');

const router = express.Router();

// let singlePostId;
// let posts;


//posts index route
router.get('/', (req, res) => {
    db.run(index)
        .then(resp => {
            const posts = resp.rows
            res.json({posts})
        })
        .catch(err => res.status(500).end())
})

// show route
router.get('/:id', (req,res) => {
    console.log('you hit the show route')
    db.run(show, [req.params.id])
        .then(resp => {
            const post = resp.rows
            res.json({post})
        })
        .catch(err => res.status(500).end())
})

// router.get("/singlepost", (req, res) => {
//     singlePostId = req.query.id;
//     res.send(JSON.stringify(posts[singlePostId]));
// })


// Create post route
router.post('/', (req, res) => {
    db.run(create, [req.body.title, req.body.author, req.body.story])
        .then(resp => {
            const post = resp.rows[0]
            res.status(201).json(post)
        })
        .catch(err => res.status(500).end())
})


module.exports = router;