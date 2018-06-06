var express = require('express');
var router = express.Router();
var User = require('../models/user');
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.find()
    .exec()
    .then(data => {
      res.send(data)
    })
  
});

router.post('/', (req, res, next) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send({err: err});
  })
})

module.exports = router;
