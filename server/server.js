// publishing the messages
Meteor.publish('messages', function(){
    return Messages.find();
});

// publishing the timetable
Meteor.publish('timetable', function(){
    return Timetable.find();
});