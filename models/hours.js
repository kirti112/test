
var mongoose = require("mongoose");
 var   Schema = mongoose.Schema;
   

var HourSchema = new Schema({
    tasknumber:{type: String, unique : true},
    est_hours: String,
    est_notes:String,
    act_hours:String,
	notes:String,
	total_hours:String,
	final_notes:String,
	completed:{
        type: Boolean,
        default: false
    },
	created_at: Date,
    updated_at: Date,
	
	

});
// on every save, add the date
HourSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
  
});

module.exports=mongoose.model("Hours", HourSchema);
