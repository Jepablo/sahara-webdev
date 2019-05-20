const express = require('express');
const router = express.Router();
const User = require('../models/user');

//(GET METHOD)
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // retrieve all users exist in db
        res.json(users); //display all users as the output
    } catch (err) {
        res.json({message: err});
    }
});

router.get('/courses', (req, res) => {
    res.send('This is a list of courses menu');
});

//Send data to the database (POST METHOD)
router.post('/', async (req, res) => {
    const users = new User( { //push all data send into the database as json
        usertype: req.body.usertype,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const saveUser = await users.save();
        res.json(saveUser);
    } catch(err) {
        res.json({message: err});
    }
});

//gets a specific users
router.get('/:?userId', async (req, res) => {
    try {
        const users = await User.findById(req.params.userId);
        res.json(users);
    } catch(err) {
        res.json({message: err});
    }
});

//Delete a users
router.delete('/:?userId', async (req, res) => {
    try {
        const removeUser = await User.remove({_id: req.params.userId});
        res.json(removeUser);
    } catch (err) {
        res.json({message: err});
    }
});

//update users data
router.patch('/:?userId', async (req, res) => {
    try {
        const updateUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: {password: req.body.password}}
        );
        res.json(updateUser);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;