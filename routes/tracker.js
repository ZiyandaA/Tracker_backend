var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.withUsers) {
    models.Tracker.find()
        .populate('userID')
        .exec()
        .then(data => {
            res.send(data);
        })
  }
  else {
    models.Tracker.find()
        .exec()
        .then(data => {
            res.send(data);
        })
  }
});

router.post('/', (req, res, next) => {
    var userID = req.body.userID;
    var name = req.body.name;
    
    models.Tracker.create({
        userID: userID,
        name: name
    })
    .then(tracker => {
        res.send(tracker);
    })
    .catch(err => {
        next(err);
    })
})

module.exports = router;
