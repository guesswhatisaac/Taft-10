// main js file
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const defaultHeader =   "<div class='header-buttons'>" +
                            "<a href='sign-up-view.html'><button class=button id='sign-up'> Sign Up </button></a>" +
                            "<a href='sign-in-view.html'><button class=button id='sign-in'> Sign In </button></a>" +
                        "</div>";

app.use(express.static("home-page-section"));
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");
exphbs.registerPartials

// home 
app.get('/home', (req, res) => {
    console.log("Request received for home");
    console.log("test 1");
});

app.get('/sign-in', (req, res) => {
    console.log("Request received for /sign-in");
    //res.sendFile(__dirname + '/home-page-section/html/sign-in-view.html');
});

app.get('/sign-up', (req, res) => {
    console.log("Request received for /sign-up");
    //res.sendFile(__dirname + '/home-page-section/html/sign-up-view.html');
});

app.listen(3001);
