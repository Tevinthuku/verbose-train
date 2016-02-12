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
        autoform: {
          icon: "code"  
        }
        
        
    },
    
    timeStart: {
        type: String,
        autoform:{
            
        icon: "access_time" 
        
        }

    },
    
    timeEnd: {
        type: String,
        
        autoform: {
             icon: "access_time"     
        }
  
    },
    
    room: {
        type: String,
        autoform: {
        icon: "airline_seat_legroom_reduced"            
        }

    }
    
});

// the schema
TimetableSchema = new SimpleSchema({
    day: {
        type: String,
        
        autoform: {
            
        icon: "today"
        
        }


    },
    
    description: {
        type: String,
        autoform: {
            
            icon: "description"

        },
    },
    
    
    lectures: {
        type: [LectureSchema],
        
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