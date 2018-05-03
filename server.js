const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
//register partials
hbs.registerPartials(__dirname + '/views/partials', () => {
    console.log("Registering partials is done")
});
//add view engine
app.set('view engine','hbs');



app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method}${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs',{
//         pageTitle: 'Maintainence Page'
//     });
// });

//express middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(str)=>{
    return str.toUpperCase();
});


app.get('/',(req,res)=>{
    // res.send('<h1>Hello World Express</h1>');
    // res.send({
    //     name:'Pavitar',
    //     likes:[
    //         'biking',
    //         'swimming',
    //         'trekking'
    //     ]
    // })
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome User'
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'Injected Page'
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Error in fulfilling this request'
    });
});
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Projects Page'
    });
});
app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});