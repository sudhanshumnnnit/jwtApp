let express=require('express');
let mongoose=require('mongoose');
let jwt=require('jsonwebtoken');
let app=express();
// Create our Express router
let router = express.Router();
let userModel=require('../models/user');

mongoose.connect('mongodb://localhost:27017/mean-app',function(err){
    if(err){
        console.log("DB is not connected",err);
    }else{
        console.log("DB is coected");
    }
    
}); 

router.get('/',function(req,res){
    res.send("Welcome to ome page")
});

router.post('/user',function(req,res){
    var user=new userModel();
    console.log(req.body);
    user.userName=req.body.userName;
    user.password=req.body.password;
    user.email=req.body.email;

    if(req.body.userName==null || req.body.userName==''||req.body.password==''||req.body.password==null ||req.body.email==null||req.body.email==''){
        res.send('please esre serame,email or password were provided')
    }else{

        user.save(function(err,docs){
            if(!err){
                console.log('after save',req.body);
                res.send(docs);
            }
        });
    }    
   
});
router.post('/authenticate',function(req,res){
    userModel.findOne({userName:req.body.userName},function(err,user){
        if(err){
            throw err;
        }
        if(!user){
            res.json({success:false,message:"could not authenticate user"});
        }else if(user){
            if(req.body.password){
                   var validPassword= user.comparePassword(req.body.password);
            }else{
                res.json({success:false,message:"could not provided password"});
            }

            if(!validPassword){
                res.json({success:false,message:"could not authenticate password"});
            }else{
               var token= jwt.sign({userName:user.userName,email:user.email},'secretprivatekey',{expiresIn:60});
                res.json({success:true,message:"user authenticated",token:token});
            }

        }
    });
    
});



module.exports = router;