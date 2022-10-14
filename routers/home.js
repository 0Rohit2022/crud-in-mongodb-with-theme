const express = require("express");
const Router = express.Router();
const server = require('../models/server')

Router.get('/', (req,res) => {
   res.render('index')
})

// Creating or Inserting the data

Router.post('/add', (req,res) => {
   const name  = req.body.name;
   const email = req.body.email;
//    console.log(name,email)
    const Server = new server({
        name,email
    })
    Server.save(err => {
        if(err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }

    })
})


// Find || Displaying the data

Router.get('/show', (req,res) => {
    server.find((err,docs) => {
        if(err) {
            console.log(err)
        }
        // console.log(docs)
        res.render('show', {
            Employees : docs
        })
    })
})


// Edit or Updating the data

Router.get('/edit/:id', (req,res) => {
    // console.log(req.params.id)
    server.findOneAndUpdate({_id:req.params.id}, req.body,{new:true}, (err,docs) => {
        if(err){
            console.log(err)
        }else {
            res.render('edit', {studentdata : docs})
        }
    })
})


Router.post('/edit/:id', (req,res) => {
    server.findByIdAndUpdate({_id:req.params.id}, req.body,(err,docs) => {
        if(err){
            console.log(err)
        }
        else {
            res.redirect('/show')
        }
    })
})

// Deleting the data from the database

Router.get('/delete/:id',(req,res) => {
    server.findByIdAndDelete({_id :req.params.id}, req.body, (err,docs) => {
        if(err){
            console.log(err)
        }
        else {
            console.log("Deleted Successfully");
            res.redirect('/show');
        }
    })
})

module.exports = Router;