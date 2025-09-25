
// Study purpose 

const express = require("express")
const users = express.Router()
//users
// Index users 
users.get("", (req, res) => {
  res.send("GET for users");
});

// Show users 
users.get("/:id", (req, res) => {
  res.send("GET for show users");
});

// New users 
users.post("/new", (req, res) => {
  res.send("POST for new users");
});

// Delete users 
users.delete("/:id", (req, res) => {
  res.send("DELETE for new users");
});

module.exports = users;