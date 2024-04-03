if (process.env.NPDE_ENV !== 'production') {
    require('dotenv').config()
}

const PORT = 3000; // TODO: Change to 3000 before submitting

const express = require('express'),
      hbs = require('express-handlebars'),
      bodyParser = require('body-parser'),
      bcrypt = require('bcrypt'),
      passport = require('passport'),
      flash = require('express-flash'),
      session = require('express-session'),
      methodOverride = require('method-override'),
      app = express();

const layoutsDir = __dirname + '/views/layouts/';
const partialsDir = __dirname + '/views/partials/'; 

const { connect } = require('./src/models/conn.js');
const User = require("./src/models/User");
const Review = require("./src/models/Review.js")

const initializePassport = require('./passport');

const getUsername = (req) => {
    return req.user.username; 
};

initializePassport(passport, 
    async (username) => {
    try {
        const user = await User.findOne({ username: '@' + username }).exec();
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        return null; 
    }}, 
    async (id) => {
        try {
            const user = await User.findOne({ id: id }).exec();
            return user;
        } catch (error) {
            console.error("Error finding id:", error);
            return null; 
        }
    }
);

let userObj = "";
let currentUserName = " "; 
let currentUserPFP = " ";
let hasUser = false; // checks if a user is currently logged in
let username = "";
let printUsernameErr = false;
let printEditErr = false;

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
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded()); 
// app.use(bodyParser.urlencoded({ extended: false })); 

app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }

    res.redirect('/guest-view')
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}

// home with current user
app.get('/', checkAuthenticated, (req, res) => {
    if(!req.user) {
        hasUser = false;
    } else {
        hasUser = true;
    }

    res.render('main', {
        title: 'Taft 10',
        css: '/home-page-section/css/home-index.css',
        userExists: hasUser,
        currUsername: req.user.username,
        addcss: false,
        needHeader: true,
        needHeader2: false,
        needFooter: true,
        searchIcon: '/global-assets/header/search-icon.png',
        taft10Logo: '/global-assets/header/taft-10.png',
        ateRica: '/home-page-section/assets/ate-rica.png',
        chefBab: '/home-page-section/assets/chef-bab.png',
    });

    console.log("curr un: " + req.user.username);
    console.log("has user: " + hasUser);
    console.log("is owner: " + req.user.isOwner);
});

/****************************************************************
 *                    HOME, SIGN-IN, SIGN-UP
 ***************************************************************/

// home without current user <- redirect here
app.get('/guest-view', checkNotAuthenticated, (req, res) => {
    res.render('main', {
        title: 'Taft 10',
        css: '/home-page-section/css/home-index.css',
        userExists: false,
        currUsername: null,
        addcss: false,
        needHeader: true,
        needHeader2: false,
        needFooter: true,
        searchIcon: '/global-assets/header/search-icon.png',
        taft10Logo: '/global-assets/header/taft-10.png',
        ateRica: '/home-page-section/assets/ate-rica.png',
        chefBab: '/home-page-section/assets/chef-bab.png',
    });

    console.log("has user: " + hasUser);
});

// home 
app.get('/home', checkAuthenticated, (req, res) => {
    console.log("Request received for /home");
    res.redirect('/');
});

// log-out
app.get('/log-out', (req, res) => {
    console.log("Request received for /log-out");
    printUsernameErr = false;
    hasUser = false;
    
    req.logOut(function(err) {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send("Error logging out");
        }
        
        res.redirect('/guest-view');
    });
});

// sign-in
app.get('/sign-in', checkNotAuthenticated, async (req, res) => {
    console.log("Request received for /sign-in");
    res.render('sign-in', {
        title: 'Sign In',
        css: '/home-page-section/css/sign-up-in-index.css',
        js: '/home-page-section/js/sign-in.js',
        userExists: false,
        needHeader: false,
        needHeader2: false,
        needFooter: false,
    });
});

// sign-in
app.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign-in',
    failureFlash: true
}));

// sign-up
app.get('/sign-up', checkNotAuthenticated, async (req, res) => {
    console.log("Get Request received for /sign-up");
    console.log(printUsernameErr);
    res.render('sign-up', {
        title: 'Sign Up',
        css: '/home-page-section/css/sign-up-in-index.css',
        css2: '/base-index.css',
        js: '/home-page-section/js/sign-up.js',
        userExists: false,
        needHeader: false,
        needHeader2: false,
        needFooter: false,
        isValid: printUsernameErr
    });
});

app.post('/sign-up', async (req, res) => {
    console.log("Post Request received for /sign-up");

    const { username, email, lname, fname, description, password, file, checkbox } = req.body;
    const usernameInput = '@' + username;
    const lastNameInput = lname;
    const firstNameInput = fname;
    const bioInput = description;
    const profilePictureInput = file;
    const isOwnerInput = (checkbox === 'checkbox'); 

    console.log(req.body)

    try {
        // check if the username already exists in the database
        const existingUser = await User.findOne({ username: usernameInput });
        if (existingUser) {
            console.log('Username already exists.');

            printUsernameErr = true;
            return res.redirect('/sign-up');
        }

        // generate hash for password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user
        const newUser = await User.create({
            username: usernameInput,
            email,
            lastName: lastNameInput,
            firstName: firstNameInput,
            bio: bioInput,
            password: hashedPassword,
            profilePicture: profilePictureInput,
            isOwner: isOwnerInput
        });

        console.log('Success sign-up');
        
        // log in the user after sign-up
        req.login(newUser, function(err) {
            if (err) {
                console.error("Error logging in after sign-up:", err);
                return res.status(500).send("Error logging in after sign-up.");
            }
            // redirect the user to the home page
            res.redirect('/');
        });
    } catch(error) {
        console.error("Error during sign-up:", error.message);
        return res.status(500).send("An error occurred during sign-up.");
    }
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

// forgot-pw
app.post('/forgot-pw', (req, res) => {
    console.log("POST Request received for /forgot-pw");
    console.log(req.body);
    res.redirect("/success-msg");
});

// success-msg
app.get('/success-msg', (req, res) => {
    console.log("Request received for /success-msg");
    res.render('forgot-pw-response', {
        title: 'Recover Account Success',
        css: '/home-page-section/css/sign-up-in-index.css',
        js: '/home-page-section/js/sign-up.js',
        needHeader: false,
        needHeader2: false,
        needFooter: false,
    });
});

/****************************************************************
 *                         PROFILE       
 ***************************************************************/

let reply = "";
let replies = [];
let showReply = false;
let editSuccessful = false;
  
// profile
app.get('/profile', checkAuthenticated, async (req, res) => {
    console.log("Request received for /profile");
    if(!replies) {
        showReply = true;
    }

    res.render('view-profile', {
        title: 'View Account Success',
        css: '/view-profile-section/css/profile-index.css',
        css2: '/base-index.css',
        css3: '/view-establishments-section/css/est-index.css',
        currentUserPic: '/global-assets/header/icon.jpg',
        myName: '<h1>' + req.user.firstName + " " + req.user.lastName + '</h1>',
        numReviews: userObj.numReviews + ' reviews', // TODO UPDATE THIS USING REVIEWS DATABASE
        userDescription: req.user.bio,
        isOwner: req.user.isOwner,
        userExists: hasUser,
        currUsername: req.user.username,
        needHeader: false,
        needHeader2: true,
        needFooter: true,
        searchIcon: '/global-assets/header/search-icon.png',
        taft10Logo: '/global-assets/header/taft-10.png',
        displayReplies: showReply,
        username: req.user.username,
        ownerReply: reply,
    });
});

// edit profile get
app.get('/edit', checkAuthenticated, async (req, res) => {
    console.log("Request received for /edit");
    res.render('edit-profile', {
        title: 'Edit Profile',
        css: '/view-profile-section/css/edit-profile-index.css',
        css2: '/base-index.css',
        js: '/home-page-section/js/sign-up.js',
        currentUserPic: req.user.profilePicture,
        userExists: hasUser,
        needHeader: false,
        needHeader2: false,
        needFooter: false,
        errorMsg: printEditErr,
        usernamePlaceholder: req.user.username,
        bioPlaceholder: req.user.bio
    });
});

app.post('/edit', checkAuthenticated, async (req, res) => {
    console.log("Post request received for /edit");

    try {
        let existingUsers = await User.find({ username: req.user.username });
        let currUserID = existingUsers[0]._id;
        let filter = { _id: currUserID };
        let usernameInput = req.body.username;
        let bioInput = req.body.description;

        let updateFields = {};

        if(usernameInput && bioInput) { // update username and bio
            updateFields = { username: '@' + usernameInput, bio: bioInput };
        } else if(usernameInput && !bioInput) { // update username only
            updateFields = { username: '@' + usernameInput };
        } else if(bioInput && !usernameInput) { // update bio only
            updateFields = { bio: bioInput };
        }

        if(Object.keys(updateFields).length > 0) {
            let userDoc = await User.findOneAndUpdate(filter, updateFields, {
                new: true
            });

            if(usernameInput) {
                req.user.username = '@' + usernameInput;
            }

            if(bioInput) {
                req.user.bio = bioInput;
            }

            await userDoc.save();
            console.log("Success edit");
        } else {
            console.log("No fields to update");
        }

        res.redirect('/profile');
        printEditErr = false;

    } catch(e) {
        printEditErr = true;
        console.error("Error editing profile:", e.message);
        res.redirect('/edit');
    }
});

app.get('/cancel-edit', checkAuthenticated, (req, res) => {
    console.log("Request received for /cancel-edit");
    res.redirect('/profile');
})

app.get('/reply', (req, res) => {
    console.log("Request received for /reply");
});

app.post('/reply', (req, res) => {
    console.log("POST Request received for /post");
    reply = req.body.description;
    console.log(reply);
    
    replies.push(reply);
    showReply = true;
    res.redirect('/profile');
});


/****************************************************************
 *                         ESTABLISHMENTS       
 ***************************************************************/

// view all establishments
app.get('/all-establishments', checkAuthenticated, (req, res) => {
    console.log("Request received for /all-establishments");

    res.render('all-establishments', {
        title: 'All Establishments',
        css: '/view-establishments-section/css/est-index.css',
        css2: '/base-index.css',
        css3: '/view-establishments-section/css/add-review.css',
        css4: '/view-establishments-section/css/view-review.css',
        css5: '/view-establishments-section/css/crude-index.css',
        js: '/view-establishments-section/js/est-index.js',
        userExists: hasUser,
        currUsername: req.user.username,
        needHeader: false,
        needHeader2: true,
        needFooter: true,
        searchIcon: '/global-assets/header/search-icon.png',
        taft10Logo: '/global-assets/header/taft-10.png',
    });
});

app.get('/add-review', checkAuthenticated, (req, res) => {
    console.log("Request received for /add-review"); 
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
app.listen(PORT, async function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
    try {
        await connect();
        console.log(`Now connected to MongoDB`);
    } catch (err) {
        console.log('Connection to MongoDB failed: ');
        console.error(err);
    }
});

