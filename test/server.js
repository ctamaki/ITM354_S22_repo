var express = require('express');
var app = express();
var myParser = require("body-parser");
var mysql = require('mysql');

console.log("Connecting to localhost...");
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: "ohana",
  port: 3306,
  database: "ktuh",
  password: "radio"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

function query_admin(POST, response) {
  adminuser = POST['adminuser'];
  adminpwd = POST['adminpwd'];
  console.log(adminuser);
  console.log(adminpwd);
  query = "SELECT adminuser, adminpwd FROM admin WHERE adminuser =" + `"${adminuser}"`;
  console.log(query)
  con.query(query, function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
    if ((res_json.adminuser = adminuser)&&(res_json.adminpwd = adminpwd)) {
      response.redirect('./database.html') 
    } else {
      console.log('Wrong username or password')
      response.redirect('./admin_login.html');
    }})};
  
  function query_donation(POST, response) {
    fname = POST['fname'];
    lname = POST['lname'];
    email = POST['email'];
    phone = POST['phone'];
    damount = POST['damount'];
    shirtsize = POST['shirtsize'];
    rprefix = POST['rprefix'];
    rfname = POST['rfname'];
    rlname = POST['rlname'];
    shipaddress1 = POST['shipaddress1'];
    shipaddress2 = POST['shipaddress2'];
    shipcity = POST['shipcity'];
    shipstate = POST['shipstate'];
    shipzip = POST['shipzip'];
    paytype = POST['paytype'];
    ccnumber = POST['ccnumber'];
    expmonth = POST['expmonth'];
    expyear = POST['expyear'];
    cvv = POST['cvv'];
    if(POST['same'] ="same"){
      billaddress1 = POST['shipaddress1'];
      billaddress2 = POST['shipaddress2'];
      billcity = POST['shipcity'];
      billstate = POST['shipstate'];
      billzip = POST['shipzip']
    } else {
      billaddress1 = POST['billaddress1'];
      billaddress2 = POST['billaddress2'];
      billcity = POST['billcity'];
      billstate = POST['billstate'];
      billzip = POST['billzip'];
    }
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(phone);
    console.log(damount);
    console.log(shirtsize);
    console.log(rprefix);
    console.log(rfname);
    console.log(rlname);
    console.log(shipaddress1);
    console.log(shipaddress2);
    console.log(shipcity);
    console.log(shipstate);
    console.log(shipzip);
    console.log(paytype);
    console.log(ccnumber);
    console.log(expmonth);
    console.log(expyear);
    console.log(cvv);
    console.log(billaddress1);
    console.log(billaddress2);
    console.log(billcity);
    console.log(billstate);
    console.log(billzip);
    query = "SELECT email FROM donor WHERE email =" + `"${email}"`;
    console.log(query);
    con.query(query, function(err, result, fields) {
      if (err) throw err;
      console.log(result);
      var res_string = JSON.stringify(result);
      var res_json = JSON.parse(res_string);
      console.log(res_json);
      if (res_json.email = POST['email']) {
        add = "INSERT INTO donation VALUES ("+ `"${email}"` 
        +","+ `"${damount}"` +","+ `"${shirtsize}"` +","+ `"${rprefix}"` +","+ 
        `"${rfname}"` +","+ `"${rlname}"` +","+ `"${shipaddress1}"` +","
        + `"${shipaddress2}"` +","+ `"${shipcity}"` +","+ `"${shipstate}"` +","
        + `"${shipzip}"` +","+ `"${paytype}"` +","+ `"${ccnumber}"` +","
        + `"${expmonth}"` +","+ `"${expyear}"` +","+ `"${cvv}"` +","
        + `"${billaddress1}"` +","+ `"${billaddress2}"` +","+ `"${billcity}"` +","
        + `"${billstate}"` +","+ `"${billzip}"` +")";
        con.query(add, function(err, result, fields) {
          if (err) throw err;
          console.log(result);
        response.redirect('./confirmation.html'); });
      } else {
        add = "INSERT INTO donor VALUES" + `"${fname}"` +","+ `"${lname}"` +","+ 
        `"${email}"` +","+ `"${phone}"` + "); INSERT INTO donation VALUES"+ `"${email}"` 
        +","+ `"${damount}"` +","+ `"${shirtsize}"` +","+ `"${rprefix}"` +","+ 
        `"${rfname}"` +","+ `"${rlname}"` +","+ `"${shipaddress1}"` +","
        + `"${shipaddress2}"` +","+ `"${shipcity}"` +","+ `"${shipstate}"` +","
        + `"${shipzip}"` +","+ `"${paytype}"` +","+ `"${ccnumber}"` +","
        + `"${expmonth}"` +","+ `"${expyear}"` +","+ `"${cvv}"` +","
        + `"${billaddress1}"` +","+ `"${billaddress2}"` +","+ `"${billcity}"` +","
        + `"${billstate}"` +","+ `"${billzip}"` +")";
        console.log('Inserted donor and donation info')
        con.query(add, function(err, result, fields) {
          if (err) throw err;
          console.log(result);
        response.redirect('./confirmation.html');
      })}})};

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

app.post('/adminlogin', function(request, response) {
  let POST = request.body
  query_admin(POST, response)});

app.post('/process_donation', function (request, response) {
  let POST = request.body;
  var errors = [];
  if (/^[A-Za-z]+$/.test(POST['fname'])) {
  } else {
    errors.push('ONLY USE LETTERS FOR FIRST NAME');
  }
  if(POST['fname']=="") errors.push('PLEASE ENTER FIRST NAME');
  if (/^[A-Za-z]+$/.test(POST['lname'])) {
  } else {
    errors.push('ONLY USE LETTERS FOR LAST NAME');
  }
  if(POST['lname']=="") errors.push('PLEASE ENTER LAST NAME');
  if (POST['email']=="") errors.push('PLEASE ENTER EMAIL');
  if (POST['phone'] == "") errors.push('PLEASE ENTER PHONE');
  if (POST['damount'] == "") errors.push('PLEASE ENTER VALID DONATION AMOUNT');
  if (/^[A-Za-z]+$/.test(POST['rfname'])) {
  } else {
    errors.push('ONLY USE LETTERS FOR FIRST NAME');
  }
  if(POST['rfname']=="") errors.push('PLEASE ENTER FIRST NAME');
  if (/^[A-Za-z]+$/.test(POST['rlname'])) {
  } else {
    errors.push('ONLY USE LETTERS FOR LAST NAME');
  }
  if(POST['rlname']=="") errors.push('PLEASE ENTER LAST NAME');
  if(POST['shipaddress1'] ="") errors.push('PLEASE ENTER ADDRESS LINE 1');
  if(POST['shipcity']=="") errors.push('PLEASE ENTER SHIPPING ADDRESS CITY');
  if(POST['shipzip']=="") errors.push('PLEASE ENTER SHIPPING ADDRESS ZIP CODE');
  if (errors.length == 0) {
    query_donation(POST, response);
  } 
else {
    if (errors.length > 0) {
        console.log(errors.length);
        response.redirect('./donation_page.html');
    }
}
});


app.listen(8080, () => console.log(`listening on port 8080`));