var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require('body-parser');
express().use(bodyParser.json());
router.get('/contactList', function(req, res, next){
    console.log('server js received a get request');

    db.contactList.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

router.post('/contactList', function(req, res){
    console.log(req.body);
    if(typeof req.body != 'undefined'){
        delete req.body._id;
        db.contactList.insert(req.body, function(err, docs){
            res.json(docs);
        });
    }
});

router.delete('/contactList/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactList.remove({_id: mongojs.ObjectID(id)}, function(err, docs){
        res.json(docs);
    });
});

router.get('/contactList/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactList.findOne({_id: mongojs.ObjectID(id)}, function(err, docs){
        res.json(docs);
    });
});

router.put('/contactList/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactList.findAndModify({
        query: {_id: mongojs.ObjectID(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true
    }, 
    function(err, docs){
        res.json(docs);
    });
});

module.exports = router;