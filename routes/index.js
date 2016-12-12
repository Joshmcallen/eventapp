var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var Meeting = require('../models/meeting');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {

  Meeting.find({}, function(err, meetings){

    Member.find({}, function(err, members){
      res.render('index', {title: "index", members: members, meetings: meetings});

    });
  });
});


// //Post that will update two collection
// router.post('/:id', function(req, res, next){

  // console.log('im testing update route')
  //
  // var id = req.params.id;
  // var member = new Member({
  //   "events": req.body.Meeting.name
  // });
  // console.log(member);
  // console.log(id);

//
//   Member.findByIdAndUpdate(
//           info._id,
//           {$push: {"events": {title: title, msg: msg}}}, {new : true}, function(err, members) {
//               console.log(err);
//           }
//       );
//
//   //placeholder logic to push name of meeting(event) into member array of events
//   Member.events.push(Meeting.name);
//
//   //placeholder logic to push name of meeting(event) into member array of events
//   Meeting.attendants.push(Member.name);
//
// });
//
//   Meeting.attendants.push


// console.log(req.params.id);
//     var id = req.params.id;
//     var original = id.name;


//     Member.findByIdAndUpdate(id,{$push:req.body}, function(err, result){
//         if(err){
//             console.log('error editing');
//         }
//         res.redirect('/')
//     });


// Meeting_id: { type: Schema.Types.ObjectId, ref: 'Meeting' }
// then Member.find({}).populate('Meeting_id').exec(function (err, members){
//   if(err) { console.log(err) }
//   res.render('index', { members : members }); });




// });
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




//////////////////////////////Memberlist Pages//////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//GET page with entire memberlist
router.get('/memberlist', function(req, res, next){

  Member.find({}, function(err, members, meetings){
    console.log(req.body);
    res.render('memberlist', {title:"test", members: members});
  });
});
//GET page with form to add member
router.get('/addmember', function(req, res, next){
    res.render('addmember', {title:"Add New Guest"});
});
//Post to add member
router.post('/addmember', function(req, res, next){

  var member = new Member(req.body);

  //multer - get image from multer and set path
  var multer_image = "";
  req.file ? multer_image = `/images/uploads/${req.file.filename}` : multer_image = `/images/uploads/default.jpg`;
  //now set member.image to multer_image url
  member.image = multer_image;


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
       res.render('editmember', {title: 'Edit Guest', members:members})
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


//////////////////////////////Eventlist Pages///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//GET page with entire eventlist
router.get('/eventlist', function(req, res, next){

  Meeting.find({}, function(err, meetings){
    res.render('eventlist', {title:"Event List", meetings: meetings});
  });
});
//GET page with form to add event
router.get('/addevent', function(req, res, next){
  res.render('addevent', {title: 'Add New Event'});
});
//Post to add event
router.post('/addevent', function(req, res, next){

  var meeting = new Meeting(req.body);

  meeting.save(function(err){
    if(err)res.send(err);
    res.redirect('/eventlist');
  });
});
//Post to delete specific event
router.post('/eventlist/:id', function(req, res, next){
  console.log('im in route')

  var id = req.params.id;
  console.log(id);

  Meeting.remove({_id:id}, function(err){
    if(err){
      console.log('item not found');
    }
    else{
      res.redirect('/eventlist');
    }
  });
});
//GET edit page of specific event
router.get('/editevent/:id', function(req, res, next){
  var id = req.params.id;
  console.log(req.params);
  Meeting.findById(id, function(err, meetings) {
    if(err){
      console.log("item not found")
      }
    else {
       res.render('editevent', {title: 'Edit Event', meetings:meetings})
     }
  });
});
//Post to edit specific event
router.post('/editevent/:id', function(req, res, next){

    var id = req.params.id;
    var original = id.name;
    console.log(req.body);

    Meeting.findByIdAndUpdate(id,{$set:req.body}, function(err, result){
        if(err){
            console.log('error editing');
        }
        res.redirect('/eventlist')
    });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////Specific Member and Meeting Pages///////////////////////////
////////////////////////////////////////////////////////////////////////////////
//go to page of specific member
router.get('/member/:id', function(req, res, next){

  var id = req.params.id;
  Member.findById(id, function(err, members) {
    if(err){
      console.log("item not found")
      }
    else {
       res.render('memberpage', {title: 'memberpage', members: members})
     }
  });
});

//go to page of specific event
router.get('/event/:id', function(req, res, next){

  var id = req.params.id;
  Meeting.findById(id, function(err, meetings) {
    if(err){
      console.log("item not found")
      }
    else {

       res.render('eventpage', {title: 'eventpage', meetings: meetings})
     }
  });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




module.exports = router;
