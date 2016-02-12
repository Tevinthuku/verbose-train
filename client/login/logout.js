Template.layout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        
    },
    
});

Template.login.helpers({
    // display mail address
    'emailAddress': function(){
       var user = Meteor.user();
       var email = user && user.emails && user.emails[0].address;
       return email;
    }
});