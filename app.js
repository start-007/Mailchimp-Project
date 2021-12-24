const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");

const app=express();


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName=req.body.firstName;
    var lastName=req.body.lastName;
    var email=req.body.email;
    var data={
        members:[
            {   
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                },
                email_address:email,
                status:"subscribed"

            }
        ]
    };
    var jsonData=JSON.stringify(data);
    var options={
        url:"https://us20.api.mailchimp.com/3.0/lists/ca56f1c8e9",
        method:"POST",
        headers:{
            "Authorization":"starteja e664858c49901c42c96e37a7352765e4-us20"
        },
        body:jsonData
    };

    request(options,function(error,response,body){
            if(response.statusCode==200)
                res.sendFile(__dirname+"/success.html");
            else
                res.sendFile(__dirname+"/failure.html");
        
    });
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){

    console.log("Server at 3000 port started");

});

//e664858c49901c42c96e37a7352765e4-us20

// ca56f1c8e9

//https://murmuring-reaches-62182.herokuapp.com/