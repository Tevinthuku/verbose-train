// the template  helpers for the timetable template
Template.timetable.helpers({
   'timetable': function(){
       return Timetable.find({}, {sort: {timeTableDate : -1}});
    },

    
    // if its my content subscription
    isOwner: function () {
      return this.userIntel === Meteor.userId();
    }
});

// the messages on created template

Template.timetable.onCreated(function() {
   var self = this;
   self.autorun(function(){
       self.subscribe('timetable');
   });
});