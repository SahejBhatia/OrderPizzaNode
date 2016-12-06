var express = require('express');
var bodyParser = require('body-parser');
var data = require('./data.json');
var jsonfile = require('jsonfile')
var cal = require('./priceCalculator.js');

var app = express();

var path = __dirname + '/views/';
var file = './order.json';
var obj = {name: 'JP'};

app.use(bodyParser.urlencoded({extended : false}));

app.set('view engine', 'jade');

//[get] for url : root

app.get('/', function(req, res){
    
    res.render('index', {pageTitle : "Order Online", jsondata : data});

});

//get request to /ConfirmOrder
app.get('/ConfirmOrder', function(req,res){
       
    res.render('index', {pageTitle : "Order Online", jsondata : data, success : "Your order was placed succssfully"});

});

/*[post] request for url /confirm order coming from root*/

app.post('/ConfirmOrder', function(req, res){

    if(req.body.qty.length ===0 || req.body.size.length ===0 || req.body.crust.length ===0 || req.body.name.length ===0 || req.body.address.length ===0 || req.body.phone.length ===0){
        
        res.render('error', {pageTitle : "Error", msg: "Please try again, some data was missing , Please try again"});
    }else{
          jsonfile.writeFile(file, req.body, function (err) {
            console.error(err)
        });

        var len =0;

        if(req.body.toppings != null){
            if(req.body.toppings.length> 0){
                len = req.body.toppings.length;
            }
        }
        
        var calPrice = cal.TotalPrice(req.body.qty,len);
        
       
        res.render('confirmOrder', {pageTitle : "Confirm Your Order", formData : req.body, price:calPrice });
    }
    
    

    //DATA VALIDATION 
/*

    console.log(req.body);
    console.log(typeof(req.body.qty));
    console.log(req.body.qty);

    if(req.body.name.length ===0){
        console.log(" name was empty");
    }

BEFORE FORM IS SUBMITTED OR ON POST - IF DATA IS NOT VAILD - SEND IT BACK TO THE ROOT PAGE 0> ASK USER TO FIX IT 



/CONFIRM ORDER PAGE MUST SHOW THE PRICE FOR THE ORDER - to do 
            ALSO CONTAINS TWO BUTTONS  done
                        ONE TO CANCEL AND ONE TO  CONFIRM  done 
                        CANCEL RETURNS YOU TO THE PREIVIOUS PAGE done 


                        to do : 
                            CONFIRMING DISPLATS AN ORDER CONFIRMATION MESSAGE , APPROXIMATE TIME OF DELIVERY 
                                
                                SAVE THIS  ORDER OF INFORMATION AS JSON FILE TO FOLDER WHEN ORDER IS CONFIRMED 
                            +
USE REQUEST.BODY TO ACCESESS ELEMENTS OF YOUR FORM IN THE CONTROLLER 

                            +
CREATE PRICE CALCULATOR MODULE: only contains the code to calculate the total price . i.e : items of pizza * price  



*/ 
});

app.listen(3000, function(){
    console.log("Listening...");
});

