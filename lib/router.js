// main route
Router.route('/',{
    name: "login",
    template:"login",
    fastRender: true
});

// the mesages route
Router.route('/messages');


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
