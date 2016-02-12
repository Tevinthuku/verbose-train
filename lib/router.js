if(Meteor.isClient) {
    
    // logout page
    Accounts.onLogout(function() {
        Router.go('login')
    });   
    
}


// main route
Router.route('/',{
    name: "login",
    template:"login",
    fastRender: true
});

// the mesages route
Router.route('/messages');

// the notes create route

Router.route('/notescreate');

// view notes route

Router.route('/viewnotes');


// the layout
Router.configure({
    layoutTemplate: 'layout'
});


// the timetable route


Router.route('/timetable');

// the create a message route

Router.route('/create');

// the brain create route

Router.route('/brian');

// the update route

Router.route('/update/:_id',{
    
    name: 'update',
    template: 'update',
    
    subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    var currentPatient = this.params._id;
    return Meteor.subscribe('timetable', currentPatient);
  },
    data: function(){
        var currentPatient = this.params._id;
        return Timetable.findOne({ _id: currentPatient});
    }
});

// the update notes route

Router.route('/updatenotes/:_id',{
    
    name: 'updatenotes',
    template: 'updatenotes',
    
    subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    var currentPatient = this.params._id;
    return Meteor.subscribe('notes', currentPatient);
  },
    data: function(){
        var currentPatient = this.params._id;
        return Notes.findOne({ _id: currentPatient});
    }
});
