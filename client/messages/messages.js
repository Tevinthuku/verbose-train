// the template  helpers for the messages template
Template.messages.helpers({
   'messages': function(){
       return Messages.find({}, {sort: {day : -1}});
    },

    
    // if its my content subscription
    isOwner: function () {
      return this.userIntel === Meteor.userId();
    }
});

// the messages on created template

Template.messages.onCreated(function() {
   var self = this;
   self.autorun(function(){
       self.subscribe('messages');
   });
});