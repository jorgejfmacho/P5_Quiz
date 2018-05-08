var express = require('express');
var router = express.Router();

const sequelize = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QUIZ' });
});

/* GET credits page. */
router.get('/credits', function(req, res, next) {
  res.render('credits', { title:'Credits'});
});

/* GET quizzes page. */
router.get('/quizzes', function(req, res, next) {
	sequelize.models.quiz.findAll()
	.then( quizzes => {
		res.render('quizzes', {quizzes});	
	})
	.catch(error => next(error));
});
module.exports = router;
