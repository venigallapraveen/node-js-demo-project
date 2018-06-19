const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000 ;
let app = express();

app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

console.log(__dirname);



app.use((req,res,next)=>{

    var now = new Date().toString();
    var log = `${log} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log("unable to copy");
        }
    });

    next();

});


// app.use((req,res,next)=>{
//
//
//     res.render('maintainance.hbs');
//
//
// });

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=> {

    res.render('home.hbs',{
        pageTitle : 'home page',
        welcomeMessage : 'welcome my home page'
    });

});




app.get('/about',(req,res)=> {
    //res.send('About page');

    res.render('about.hbs',{
        pageTitle : 'about page'
    });
});

app.listen(port),()=>{
    console.log(`server is up on port : ${port}`);
};