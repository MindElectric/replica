const express = require('express');
const router = express.Router();
const User = require('../models/users');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


// get all users route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

router.get('/list', (req, res) => {
    User.find()
        .then((users) => {
            res.render('list', {
                title: 'Lista de usuarios',
                users: users
            })
        })
        .catch((err) => {
            res.json({ message: err.message })
        });
});

//edit a user
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findById(id);
        if (user == null) {
            res.redirect('/list');
        } else {
            res.render('edit_user', {
                title: 'Edit User',
                user: user
            });
        }
    } catch (err) {
        res.redirect('/list');
    }
});

// update user route
router.post("/update/:id", async (req, res) => {
    let id = req.params.id;
    console.log("Request body:", req.body);
    try {
        let result = await User.findByIdAndUpdate(id, {
            username: req.body.username,
            name: req.body.name,
            habilidad: req.body.habilidad,
            modalidad: req.body.modalidad,
            area: req.body.area,
            cope: req.body.cope,
        }, { new: true });
        console.log(id);
        console.log(req.body.username);
        if (!result) {
            // Handle case where user with that ID doesn't exist
            req.session.message = {
                type: "danger",
                message: "User not found for update",
            };
            console.log("Something went wrong");
            return res.redirect("/list"); // Or any other action you prefer
        }
        req.session.message = {
            type: "success",
            message: "User updated successfully!",
        };
        console.log("User updated");
        console.log("Request body:", req.body);
        res.redirect("/list");
    } catch (err) {
        res.json({ message: err.message, type: "danger" });
    }
});

//Search filter
router.post('/search', (req, res) => {
    // Get the name parameter from the input field
    const name = req.body.txtBuscar;

    // Create a regular expression to match the name
    const regex = new RegExp(name, 'i');

    // Find the users that match the name from the database
    User.find({ name: regex })
        .then(users => {
            // Render the index.ejs template with the filtered users data
            res.render('list', { title: "Lista de usuarios", users: users });
        })
        .catch(err => {
            console.log(err);
        });
});



module.exports = router;