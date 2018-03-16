let express=require('express');
let bodyParser=require('body-parser');
let morgan=require('morgan');
let path=require('path');
let router=require('./app/routes/api');





let app=express();
let port=process.env.PORT||3000

//()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))


app.use(morgan('dev'));

// Register all our routes with /api
app.use('/api', router);
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'))
});
app.listen(port,function(){
    console.log("Sertver is rig ",port)
});