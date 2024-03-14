
// main js file
// discard ko muna to
// const express = require('express');
// const exphbs = require('express-handlebars');
// const app = express();
// app.use(express.static("home-page-section"));
// app.engine("hbs", exphbs.engine({extname: 'hbs'}));
// app.set("view engine", "hbs");
// app.set("views", "./views");
// exphbs.registerPartials

const PORT = 3000;

const express     = require( 'express'),
      hbs         = require( 'express-handlebars' ),
      app         = express();

app.engine('hbs', hbs.engine({ 
    extname: 'hbs', 
    defaultLayout: 'home', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');

// home 
app.get('/home', (req, res) => {
    console.log("Request received for home");
    res.render('home', {
        title: "Taft 10"
    })
});

app.get('/sign-in', (req, res) => {
    console.log("Request received for /sign-in");
    //res.sendFile(__dirname + '/home-page-section/html/sign-in-view.html');
});

app.get('/sign-up', (req, res) => {
    console.log("Request received for /sign-up");
    //res.sendFile(__dirname + '/home-page-section/html/sign-up-view.html');
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});