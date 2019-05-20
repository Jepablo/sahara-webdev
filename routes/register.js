const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//importing models
const User = require('../models/user');
const {forwardAuthenticated} = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('register.ejs');
});

//POST METHOD - user registration
router.post('/', (req, res) => {
	const {name, email, password, password2} = req.body;
	let errors = [];

	//Checking required fields
	if(!name || !email || !password || !password2) {
		errors.push({ msg: 'Please fill all fields'});
	}

	//check password
	if(password != password2) {
		errors.push({ msg: 'Passwords do not match'});
	}

	//check if atleast password is 6 char long
	if(password.length < 6) {
		errors.push( {msg: 'Password should be atleast 6 characters.'})
	}

	if(errors.length > 0) {
		res.render('register.ejs', {
			errors,
			name,
			email,
			password,
			password2
		});
    } 
    else {
	    // validation passed
		User.findOne({ email: email})
		.then(user => {
			if(user) {
				errors.push( { msg: 'Email is taken'});
				res.render('register.ejs', {
					errors,
					name,
					email,
					password,
					password2
				});
            } 
            else {
				const newUser = new User({
					name,
					email,
					password
				});

				// hashing password
				bcrypt.genSalt(10, (err, salt) => {
          			bcrypt.hash(newUser.password, salt, (err, hash) => {
            			if (err) throw err;
            			newUser.password = hash;
            			newUser
              			.save()
              			.then(user => {
                			req.flash(
                  				'success_msg',
                  				'You are now registered and can log in'
                			);
                			res.redirect('/login');
              			})
              			.catch(err => console.log(err));
         			});
        		});
      		}
    	});
  	}
});

module.exports = router;