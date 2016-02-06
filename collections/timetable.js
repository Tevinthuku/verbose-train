Timetable = new Mongo.Collection('Timetable');
// the allow and deny

Timetable.allow({
    insert: function(userId, doc){
        return !!userId;
    },
    
    update: function(userId, doc){
        return !!userId;
    }
});


// array of characteristics
LectureSchema = new SimpleSchema({
    unit: {
        type: String,
        
    },
    
    timeStart: {
        type: String,
    },
    
    timeEnd: {
        type: String,
    },
    
    room: {
        type: String,
    }
    
});

// the schema
TimetableSchema = new SimpleSchema({
    day: {
        type: String,

    },
    
    description: {
        type: String,
        autoform: {

        },
    },
    
    
    lectures: {
        type: [LectureSchema]
    },
    
    userIntel: {
        type: String,
        label: "Type your Name",
        autoform: {
            class: "disabled"
        }
    },
    timeTableDate: {
        type: Date,
        label: "Publication Date"
    }
});

var postHooks = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.userIntel = Meteor.userId();
      }
      
      return doc;
    }
  }
}

var postHooksForDate = {
    before: {
        insert: function(doc) {
            if(Meteor.userId()){
                doc.timeTableDate = new Date;
            }
            return doc
        }
    }
}

// post hook atachment schema
if(Meteor.isClient){

AutoForm.addHooks('quickstring',postHooks );
AutoForm.addHooks('quickstring',postHooksForDate );
// the redirect

AutoForm.addHooks(['quickstring'],{
    onSuccess: function(formType, result) {
        Router.go('timetable');
    }
});

}
Timetable.attachSchema( TimetableSchema );