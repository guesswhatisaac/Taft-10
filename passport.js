const { authenticate } = require('passport')
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy

async function initialize(passport, getUserByUsername) {
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(username)
        
        if(user === null) {
            return done(null, false, { message: 'No user found'})
        }

        try {
            // if (await bcrypt.compare(password, user.password)) {

            // } else {
            //    return done(null, false, { message: 'Password incorrect' })
            // }
        } catch(e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ username: 'username'}), authenticateUser)

    passport.serializeUser((user, done) => {  })
    passport.deserializeUser((id, done) => {  })
}

module.exports = initialize