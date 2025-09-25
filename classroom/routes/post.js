
// Study purpose 

const express = require("express")
const posts = express.Router()

//posts
// Index posts 
posts.get("", (req, res) => {
  res.send("GET for posts");
});

// Show posts 
posts.get("/:id", (req, res) => {
  res.send("GET for show posts");
});

// New posts 
posts.post("/new", (req, res) => {
  res.send("POST for new posts");
});

// Delete posts 
posts.delete("/:id", (req, res) => {
  res.send("DELETE for new posts");
});

module.exports = posts;