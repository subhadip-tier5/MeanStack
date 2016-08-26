var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){
    console.log('server js received a get request');
    
    db.contactList.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactList', function(req, res){
    console.log(req.body);
    delete req.body._id;
    db.contactList.insert(req.body, function(err, docs){
        res.json(docs);
    });
});

app.delete('/contactList/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactList.remove({_id: mongojs.ObjectID(id)}, function(err, docs){
        res.json(docs);
    });
});

app.get('/contactList/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactList.findOne({_id: mongojs.ObjectID(id)}, function(err, docs){
        res.json(docs);
    });
});

app.put('/contactList/:id', function(req, res){
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

app.listen(3000);
console.log('Server is running on port 3000');