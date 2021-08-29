const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');
const https = require('https');
const { url } = require('inspector');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname+ '/signup.html');
    
})

app.post('/', function(req, res){
    const firstName = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
  
    

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastname
    
                }
            }
        ]
    }
    var Option = {
        method: "POST",
        auth: "dayo:a694ab99c921fcc5cdad991bd52227887-us5"
    }
    var jsonData = JSON.stringify(data);
    
    const url = "https://us5.api.mailchimp.com/3.0/lists/6e739e1d23"


    const request = https.request(url, Option, function(response){

        if (response.statusCode === 200){
            // console.log("Successfully subscribed!");
            res.sendFile(__dirname+ '/success.html');
        }else{
            // console.log("Your Subscription was not successfull, please try again!");
            res.sendFile(__dirname+ '/failure.html');
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

    
})

app.post('/failure', function(req, res){
    res.redirect('/')
})






app.listen(3000, function(){
    console.log('Server is running on Port 3000.');
})

