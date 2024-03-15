const PORT = 3005; // TODO: Change to 3000 before submitting

const express = require('express'),
      hbs = require('express-handlebars'),
      bodyParser = require('body-parser'),
      app = express();

const layoutsDir = __dirname + '/views/layouts/';
const partialsDir = __dirname + '/views/partials/'; 


/************************************************************************************
 *                                      USERS
************************************************************************************/

let userObj = "";
let currentUserName = " "; 
let currentUserPFP = " ";
let hasUser = false; // checks if a user is currently logged in
let username = "";
let isIncorrectPass = false;

let users = [
    {
        username: '@kweenyasmin',
        email: 'asistido_yasmin@gmail.com',
        lastname: 'Asistido',
        firstname: 'Yasmin',
        bio: 'To be or not to be.',
        phoneNum: '09143227896',
        password: '2kuyukoT',
        profilePicture: "/global-assets/header/icon.jpg",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@shanecloma',
        email: 'cloma_shane@gmail.com',
        lastname: 'Cloma',
        firstname: 'Shane',
        bio: 'No pain, no gain!',
        phoneNum: '09808065541',
        password: 'iLovemyWIF3Y',
        profilePicture: "/global-assets/header/icon.jpg",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@romanisaac',
        email: 'roman_isaac@gmail.com',
        lastname: 'Roman',
        firstname: 'Isaac',
        bio: 'Love is like a rosary, full of mystery.',
        phoneNum: '09066684661',
        password: 'valoGodz123',
        profilePicture: "/global-assets/header/isaac-pic.jpg",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@kathmeow',
        email: 'cruz_kathleen@gmail.com',
        lastname: 'Cruz',
        firstname: 'Kathleen',
        bio: 'Time is gold.',
        phoneNum: '09702432277',
        password: 'BULDAK22enjoyer',
        profilePicture: "/global-assets/header/kathleen-pic.png",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@alexisae',
        email: 'arcega_alexis@gmail.com',
        lastname: 'Arcega',
        firstname: 'Alexis',
        bio: 'Teamwork makes the dream work.',
        phoneNum: '09317573077',
        password: 'yashFOREVERloversS143',
        profilePicture: "/global-assets/header/alexis-pic.jpeg",
        isOwner: false,
        numReviews: 0
    },
    {
        username: '@bashruiz',
        email: 'asistido_yasmin@gmail.com',
        lastname: 'Ruiz',
        firstname: 'Yashel',
        bio: 'Shark is life!',
        phoneNum: '09339464368',
        password: 'BABYsharkdududu',
        profilePicture: "/global-assets/header/yash.jpg",
        isOwner: true,
        numReviews: 0
    },
    {
        username: '@hannissaad',
        email: 'vinuya_hannah@gmail.com',
        lastname: 'Vinuya',
        firstname: 'Hannah',
        bio: 'Slip in to the diamond life.',
        phoneNum: '09145134782',
        password: 'iLoveMYSHANIA22',
        profilePicture: "/global-assets/header/hannah-pic.jpg",
        isOwner: true,
        numReviews: 0
    },
    {
        username: '@jeylinnumbawan',
        email: 'sandoval_jalene@gmail.com',
        lastname: 'Sandoval',
        firstname: 'Jalene',
        bio: 'Stay delulu until it becomes truelulu.',
        phoneNum: '09798243924',
        password: 'JaLeeforevah',
        profilePicture: "/global-assets/header/jal-pic.jpg",
        isOwner: true,
        numReviews: 0
    },
    {
        username: '@onyourmark',
        email: 'lee_mark@gmail.com',
        lastname: 'Lee',
        firstname: 'Mark',
        bio: 'Be yourself.',
        phoneNum: '09091632635',
        password: 'alexisLangSapatNaILY',
        profilePicture: "/global-assets/header/mark-pic.jpg",
        isOwner: true,
        numReviews: 0
    },
    {
        username: '@mojicajosh',
        email: 'mojica_josh@gmail.com',
        lastname: 'Mojica',
        firstname: 'Josh',
        bio: 'Patience is a virtue.',
        phoneNum: '09573670854',
        password: '404KANGKONGChips',
        profilePicture: "/global-assets/header/josh-pogi.jpg",
        isOwner: true,
        numReviews: 0
    },
]

/************************************************************************************
 *                                  ESTABLISHMENTS
************************************************************************************/

// insert variables here


app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'home',
    layoutsDir: layoutsDir,
    partialsDir: partialsDir
}));

app.set('view engine', 'hbs');
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded()); 
// app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.urlencoded({ extended: true })); 

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// home
app.get('/', (req, res) => {
    res.render('main', {
        title: 'Taft 10',
        css: '/home-page-section/css/home-index.css',
        userExists: hasUser,
        currUsername: currentUserName,
        addcss: false,
        needHeader: true,
        needHeader2: false,
        needFooter: true,
        searchIcon: '/global-assets/header/search-icon.png',
        taft10Logo: '/global-assets/header/taft-10.png',
        ateRica: '/home-page-section/assets/ate-rica.png',
        chefBab: '/home-page-section/assets/chef-bab.png',
    });
    isIncorrectPass = false;
});

// home 
app.get('/home', (req, res) => {
    console.log("Request received for /home");
    res.redirect('/');
});

app.get('/log-out', (req, res) => {
    hasUser = false;
    currentUserName = " ";
    console.log("Request received for /log-out");
    res.redirect('/');
})

// sign-in
app.get('/sign-in', (req, res) => {
    console.log("Request received for /sign-in");
    res.render('sign-in', {
        title: 'Sign In',
        css: '/home-page-section/css/sign-up-in-index.css',
        js: '/home-page-section/js/sign-in.js',
        userExists: false,
        needHeader: false,
        needHeader2: false,
        needFooter: false,
        passwordIncorrect: isIncorrectPass
    });
});

// sign-in
app.post('/sign-in', (req, res) => {
    console.log("Post Request received for /sign-in");

    let usernameInput = req.body.username;
    let passwordInput = req.body.password;
    let accountExists = false;
    let userIndex = -1;

    console.log(usernameInput); 
    console.log(passwordInput);

    // check if account exists and if password is correct
    for(let i = 0; i < users.length; i++) {
        if(('@' + usernameInput) === users[i].username) {
            if(passwordInput === users[i].password) {
                accountExists = true;
                userIndex = i;
            } else {
                console.log("wrong password input");
            }
        }
    }

    if(accountExists) {
        console.log("Sign-in successful");
        hasUser = true; 
        isIncorrectPass = false;
        currentUserName = '@' + usernameInput;
        currentUserPFP = users[userIndex].profilePicture;
        userObj = users[userIndex];
        res.redirect('/home');
    } else {
        console.log("account does not exist");
        isIncorrectPass = true;
        res.redirect('/sign-in');
    }
    
});

// sign-up
app.get('/sign-up', (req, res) => {
    console.log("Request received for /sign-up");
    res.render('sign-up', {
        title: 'Sign Up',
        css: '/home-page-section/css/sign-up-in-index.css',
        css2: '/base-index.css',
        js: '/home-page-section/js/sign-up.js',
        userExists: false,
        needHeader: false,
        needHeader2: false,
        needFooter: false,
    });
});

// sign-up
app.post('/sign-up', (req, res) => {
    console.log("Post Request received for /sign-up");
    console.log(req.body);

    const newUser = { 
        username: '@' + req.body.username,
        email: req.body.email,
        lastname: req.body.lname,
        firstname: req.body.fname,
        bio: req.body.description,
        phoneNum: req.body.number,
        password: req.body.password,
        profilePicture: req.body.file,
        isOwner: req.body.checkbox,
        numReviews: 0
    }

    users.push(newUser);
    userObj = newUser;
    currentUserName = '@' + req.body.username;
    username = '@' + req.body.username;

    hasUser = true; 
    currentUserPFP = req.body.file;

    res.redirect('/home');
    
    console.log("Success sign-up");

    // const { username, email, lname, fname, description, number, password, file, checkbox } = req.body;
    // console.log(username, email, lname, fname, description, number, password, file, checkbox);

});

// recover-account
app.get('/forgot-pw', (req, res) => {
    console.log("Request received for /forgot-pw");
    res.render('forgot-pw', {
        title: 'Recover Account',
        css: '/home-page-section/css/sign-up-in-index.css',
        js: '',
        userExists: false,
        needHeader: false,
        needHeader2: false,
        needFooter: false,
    });
});

app.post('/forgot-pw', (req, res) => {
    console.log("POST Request received for /forgot-pw");
    console.log(req.body);
    res.redirect("/success-msg");
});

app.get('/success-msg', (req, res) => {
    console.log("Request received for /success-msg");
    res.render('forgot-pw-response', {
        title: 'Recover Account Success',
        css: '/home-page-section/css/sign-up-in-index.css',
        js: '/home-page-section/js/sign-up.js',
        needHeader: false,
        needHeader2: false,
        needFooter: false,
        isOwner: userObj.isOwner

    });
});
  
// profile
app.get('/profile', (req, res) => {
    console.log("Request received for /profile");
    res.render('view-profile', {
        title: 'View Account Success',
        css: '/view-profile-section/css/profile-index.css',
        css2: '/base-index.css',
        css3: '/view-establishments-section/css/est-index.css',
        currentUserPic: '/global-assets/header/icon.jpg',
        myName: '<h1>' + userObj.firstname + " " + userObj.lastname + '</h1>',
        numReviews: userObj.numReviews + ' reviews',
        userDescription: userObj.bio,
        needHeader: false,
        needHeader2: true,
        needFooter: true,
        isOwner: userObj.isOwner,
        searchIcon: '/global-assets/header/search-icon.png',
        taft10Logo: '/global-assets/header/taft-10.png'
    });
    console.log(userObj.firstname + " " + userObj.lastname);
    console.log()
});

// edit profile get
app.get('/edit', (req, res) => {
    console.log("Request received for /edit");
    res.render('edit-profile', {
        title: 'Edit Profile',
        css: '/home-page-section/css/sign-up-in-index.css',
        css2: '/base-index.css',
        js: '/home-page-section/js/sign-up.js',
        userExists: false,
        needHeader: false,
        needHeader2: false,
        needFooter: false,
    });
});


// edit profile post
app.post('/edit', (req, res) => {
    console.log("Post Request received for /edit");
    console.log(userObj);

    const newUser = { 
        username: '@' + req.body.username,
        email: req.body.email,
        lastname: req.body.lname,
        firstname: req.body.fname,
        bio: req.body.description,
        phoneNum: req.body.number,
        password: req.body.password,
        profilePicture: req.body.file,
        isOwner: req.body.checkbox,
        numReviews: 0
    }

    users.push(newUser);
    userObj = newUser;
    currentUserName = '@' + req.body.username;
    username = '@' + req.body.username;

    hasUser = true; 
    currentUserPFP = req.body.file;

    res.redirect('/profile');
    
    console.log("Success edit");

    // const { username, email, lname, fname, description, number, password, file, checkbox } = req.body;
    // console.log(username, email, lname, fname, description, number, password, file, checkbox);

});



// view all establishments
app.get('/all-establishments', (req, res) => {
    console.log("Request received for /all-establishments");
    res.render('all-establishments', {
        title: 'All Establishments',
        css: '/view-establishments-section/css/est-index.css',
        css2: '/base-index.css',
        css3: '/view-establishments-section/css/add-review.css',
        css4: '/view-establishments-section/css/view-review.css',
        js: '/view-establishments-section/js/est-index.js',
        userExists: hasUser,
        currUsername: currentUserName,
        needHeader: false,
        needHeader2: true,
        needFooter: true,
        searchIcon: '/global-assets/header/search-icon.png',
        taft10Logo: '/global-assets/header/taft-10.png'
    });
});

// view taft picks
app.get('/taft-picks', (req, res) => {
    console.log("Request received for /taft-picks");
    res.render('taft-picks', {
        title: 'Taft Picks',
        css: '/view-establishments-section/css/est-index.css',
        css2: '/base-index.css',
        css3: '/view-establishments-section/css/add-review.css',
        css4: '/view-establishments-section/css/view-review.css',
        js: '/view-establishments-section/js/est-index.js',
        userExists: hasUser,
        currUsername: currentUserName,
        needHeader: false,
        needHeader2: true,
        needFooter: true,
        searchIcon: '/global-assets/header/search-icon.png',
        taft10Logo: '/global-assets/header/taft-10.png'
    });
});

// port
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});