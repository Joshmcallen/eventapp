var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var Meeting = require('../models/meeting');
var q = require('q');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {

  Meeting.find({})
  .populate('attendants')
  .exec(function(err, meetings){

    Member.find({})
    .populate('events')
    .exec(function(err, members){
      res.render('index', {title: "index", members: members, meetings: meetings});
      // res.json({meetings});
    });
  });
});
  // console.log(meeting);
//    function(err, meetings){
    // Member.find({}, function(err, members)
//
//     {
//       res.render('index', {title: "index", members: members, meetings: meetings});
//     });
//   });
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

  //multer - get image from multer and set path
  var multer_image = "";
  req.file ? multer_image = `/images/uploads/${req.file.filename}` : multer_image = `/images/uploads/default.jpg`;
  //now set member.image to multer_image url
  meeting.image = multer_image;

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

  var multer_image = "";
  req.file ? multer_image = `/images/uploads/${req.file.filename}` : multer_image = `/images/uploads/default.jpg`;
  //now set member.image to multer_image url
  req.body.image = multer_image;

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

router.post('/event/:id', function(req, res, next){
  var id = req.params.id;

//   Meeting.findById(id)
//   .populate({
//     path: 'attendants',
//     model: 'Member'
//   }).exec(function (err, meetings, members){
//     if (err) return handleError(err);
//     console.log(meetings);
//     res.json(meetings);
//   });
// });

  Meeting.findById(id)
  .populate('attendants')
  .exec(function (err, meetings, members){
    if (err) return handleError(err);
    console.log(meetings);
    res.render('eventpage', {title: 'eventpage', meetings: meetings, members: members})
  });
});

//go to page of specific event
router.get('/event/:id', function(req, res, next){

  var id = req.params.id;

// population attempt
  Meeting.findById(id)
  .populate('attendants')
  .exec(function (err, meetings, members){
    if (err) return handleError(err);
    // console.log(meetings);
    res.render('eventpage', {title: 'eventpage', meetings: meetings, members: members})
  });
});
//////////////////////////

//population attempt 2
  // Meeting.findById(id)
  // .populate({
  //   path: 'attendants',
  //   model: 'Member'
  // }).exec(function (err, meetings, members){
  //   if (err) return handleError(err);
  //   console.log(meetings);
  //   res.json(meetings);
  // });
//////////////////////////

// original code below
//   Meeting.findById(id, function(err, meetings) {
//     if(err){
//       console.log("item not found")
//       }
//     else {
//
//        res.render('eventpage', {title: 'eventpage', meetings: meetings})
//      }
//   })
// });
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//page to display search results
router.get('/searchresults', function(req, res, next){

  var search = req.body.searchinput;
  console.log(search);

  Meeting.find({}, function(err, meetings){
    Member.find({ "name":{"$regex": search, "$options": "i"} }, function(err, members){
      res.render('index', {title: "index", members: members, meetings: meetings});
    });
  });
});
//Post to search
router.post('/searchresults', function(req, res, next){

    var search = new RegExp(req.body.searchinput);
    console.log(search);

    Member.find({"name":{"$regex": search, "$options": "ig"}}, function(err, members) {
      if(err) throw err;

      res.render('searchresults', {title:'Search', members: members});
    });
  });
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

router.get('/searchevent', function(req, res, next){

  var search = req.body.searchinput;
  console.log(search);

  Meeting.find({"name":{"$regex": search, "$options": "i"}}, function(err, meetings){
    Member.find({}, function(err, members){
      res.render('index', {title: "index", members: members, meetings: meetings});
    });
  });
});
//Post to search for event
router.post('/searchevent', function(req, res, next){

    var search = new RegExp(req.body.searchinput);
    console.log(search);

    Meeting.find({$or: [{"name":{"$regex": search, "$options": "ig"}},
                       {"date":{"$regex": search, "$options": "ig"}},
                       {"location":{"$regex": search, "$options": "ig"}},
                       {"description":{"$regex": search, "$options": "ig"}}]}, function(err, meetings) {
      if(err) throw err;

      res.render('searchevent', {title:'Search', meetings: meetings});
    });
  });


////////////////////Event CheckIn Pages/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/eventcheckin/:id', function(req, res, next){

  var id = req.params.id;

  Meeting.findById(id, function(err, meetings){
    Member.find({}, function(err, members){
      res.render('eventcheckin', {title: 'Event Check In', meetings: meetings, members: members});
    });
  });
});

//Page that displays the memers attending particular event
router.get('/attendees/:id', function(req, res, next){

  var id = req.params.id;

  Meeting.findById(id, function(err, meetings){
    Member.find({}, function(err, members){

      res.render('attendees', {title: 'Attendees', meetings: meetings, members: members});
      // res.json('a test');
      // res.json(req.body);
    });
  });
});


//Post information to attendee page
router.post('/attendees/:id', function(req, res, next){

  var member = Member.findOne({_id: "5855c8bf8cf56c3f07175e09"}).exec();
  // var meeting = Meeting.findByIdAndUpdate("58570d0a4c5714404110ec40", {$push: { attendants: member._id }}, {'new': true}).exec();

  q.all([member])
    .then(data => {
      Meeting.findById("5857ff1218afb547f7b4bf61", (err, meeting) => {
        if (meeting.attendants.indexOf(data[0]._id) === -1) {
          meeting.attendants.push(data[0]._id);
          meeting.save();
        }
        var attendants = [];
        meeting.attendants.forEach(function(attendant) {
          Member.findById(attendant, function(err, person) {
            attendants.push(person);
          }).then(function() {
            for (var i = 0; i < attendants.length; i++) {
              console.log(attendants[i].name);
            }
            res.send(attendants[1].name);//do for loop
          });
        });
      });
    })
    .catch(function(err){
      console.log('error occurred');
    });
  });
  //
  //
  // router.get('/test/:id'){
  //
  //   const id = req.params.id;
  //
  //   Meeting.findById(id, function(err, meetings){
  //     res.json(meetings);
  //   });
  // });


  // router.post('/test/:id', function(req, res, next){
  //
  //   const id = req.params.id;
  //   const meeting = Meeting.findOne(id).exec();
  //
  //   // var member = Member.findOne({_id: "5855c8bf8cf56c3f07175e09"}).exec();
  //   // var meeting = Meeting.findByIdAndUpdate("58570d0a4c5714404110ec40", {$push: { attendants: member._id }}, {'new': true}).exec();
  //
  //   q.all([meeting])
  //     .then(data => {
  //       Member.findById("5857ff1218afb547f7b4bf61", (err, meeting) => {
  //         if (meeting.attendants.indexOf(data[0]._id) === -1) {
  //           meeting.attendants.push(data[0]._id);
  //           meeting.save();
  //         }
  //         var attendants = [];
  //         meeting.attendants.forEach(function(attendant) {
  //           Member.findById(attendant, function(err, person) {
  //             attendants.push(person);
  //           }).then(function() {
  //             for (var i = 0; i < attendants.length; i++) {
  //               console.log(attendants[i].name);
  //             }
  //             res.send(attendants[1].name);//do for loop
  //           });
  //         });
  //       });
  //     })
  //     .catch(function(err){
  //       console.log('error occurred');
  //     });
  //   });


module.exports = router;
