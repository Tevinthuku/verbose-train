Notes = new Mongo.Collection('Notes');

// the allow and deny

Notes.allow({
    insert: function(userId, doc){
        return !!userId;
    },update: function(userId, doc){
        return !!userId;
    }
    
});

Schema = {};

// array of characteristics
NotesSchema = new SimpleSchema({
    

    
    header: {
        type: String,
        label: "The header",
        
        autoform: {
            
            icon: "chat_bubble"
            
        }
    },
    
     description: {
         type: String,
         label: "Describe the content",
         autoform: {
             type: "textarea",
             icon: "description"
         }
     },
     
     link: {
         type: String,
         label: "link",
         
         autoform: {
         icon: "http"             
         }

     },
    
    day: {
        type: Date,
        label: "This is today",

    },
        
    
    
    userIntel: {
        type: String,
        label: "Type your Name",
        autoform: {
            class: "disabled"
        }
    },
    
});

// post hook for user intel
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

// post hook for date
var postHooksForDate = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.day = new Date();
      }
      
      return doc;
    }
  }
}






// post hook atachment schema
if(Meteor.isClient){
    // the post hooks for user intel
  AutoForm.addHooks('add-notes-form',postHooks );   
  
  // the post hook for hte date
  AutoForm.addHooks('add-notes-form',postHooksForDate );  
  
 
   
      
    // redirect to the details page

AutoForm.addHooks(['add-notes-form'],{
    onSuccess: function(formType, result) {
        Router.go('viewnotes');
    }
});
  
  
}

// attach schema

Notes.attachSchema( NotesSchema );