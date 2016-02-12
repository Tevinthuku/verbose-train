// the template  helpers for the messages template
Template.viewnotes.helpers({
   'notes': function(){
       return Notes.find({}, {sort: {day : -1}});
    },

    
    // if its my content subscription
    isOwner: function () {
      return this.userIntel === Meteor.userId();
    }
});

// the messages on created template

Template.viewnotes.onCreated(function() {
   var self = this;
   self.autorun(function(){
       self.subscribe('notes');
   });
});
