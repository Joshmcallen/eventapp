var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var Meeting = require('../models/meeting');

/* GET home page. */
router.get('/', function(req, res, next) {

  Member.find({}, function(err, members){
    res.render('index', {title: "index", members: members});
  });
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//GET page with entire memberlist
router.get('/memberlist', function(req, res, next){

  Member.find({}, function(err, members){
    res.render('memberlist', {title:"test", members: members});
  });
});
//GET page with form to add member
router.get('/addmember', function(req, res, next){
    res.render('addmember', {title:"Add new member"});
});
//Post to add member
router.post('/addmember', function(req, res, next){

  var member = new Member(req.body);

  member.save(function(err){
    if(err)res.send(err);
    res.redirect('/memberlist');
  });
});
//Post to delete specific member
router.post('/memberlist/:id', function(req, res, next){
  console.log('im in route')

  var id = req.params.id;
  console.log(id);

  Member.remove({_id:id}, function(err){
    if(err){
      console.log('item not found');
    }
    else{
      res.redirect('/memberlist');
    }
  });
});
// go to edit page of specific member
router.get('/editmember/:id', function(req, res, next){
  var id = req.params.id;
  console.log(req.params);
  Member.findById(id, function(err, members) {
    if(err){
      console.log("item not found")
      }
    else {
       res.render('editmember', {title: 'Edit Member', members:members})
     }
  });
});
//Post to edit specific member
router.post('/editmember/:id', function(req, res, next){

    var id = req.params.id;
    var original = id.name;
    console.log(req.body);

    Member.findByIdAndUpdate(id,{$set:req.body}, function(err, result){
        if(err){
            console.log('error editing');
        }
        res.redirect('/memberlist')
    });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////














module.exports = router;
