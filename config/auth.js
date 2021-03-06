const express = require('express');
const router = express.Router();

module.exports = {
    ensureAuthenticated: function(req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		}
		req.flash('error_msg', 'Please log in');
		res.redirect('/login');
	},
	forwardAuthenticated: function(req, res, next) {
		if(!req.isAuthenticated()) {
			return next();
		}
		res.redirect('/dashboard');
	}
};