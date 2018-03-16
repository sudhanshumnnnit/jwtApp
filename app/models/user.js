var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var uerSchema = new Schema({
    userName:  {type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true}
    
  });

  uerSchema.pre('save', function(next) {
    // do stuff
    var user=this;
    console.log("In Pre function this",user);
    bcrypt.hash(user.password, null, null, function(err, hash) {
      // Store hash in your password DB.
      console.log('beforre hash',user.password);
      user.password=hash;
      console.log('after hashing',user.password);
      next();
  });  
  });

  uerSchema.methods.comparePassword=function(password){
    console.log('this ooj',this);
    return bcrypt.compareSync(password, this.password); // true
  }
module.exports=mongoose.model("User",uerSchema);



// var blogSchema = new Schema({
//   title:  String,
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });