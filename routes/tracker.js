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
        .catch(err => {
            next(err);
        })
  }
  else {
    models.Tracker.find()
        .exec()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
  }
});
//localhost:3000/api/trackers/1

router.get('/:id', (req, res, next) => {
    models.Tracker.find({_id: req.params.id})
        .exec()
        .then(tracker => {
            res.send(tracker);
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', (req, res, next) => {
    var userID = req.body.userID;
    var name = req.body.name;
    // if( !userID ) {
    //     throw new Error();
    // }
    
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
