Taft 10: Food Review Platform
==============================
A community platform where food lovers come together to share their experiences, recommendations, and tips.

--------------------------------------------------------------------------------

🌟 PROJECT OVERVIEW
------------------

"Taft 10" is a full-stack web application that serves as a platform for food reviews. It allows users to create accounts, browse food establishments, and post their own reviews. The platform also provides features for establishment owners to manage their pages and reply directly to customer feedback. Key functionalities include user authentication (sign-up, sign-in, sign-out), profile editing, and full CRUD (Create, Read, Update, Delete) operations for both reviews and establishments.

The live website can be viewed here: https://taft10.onrender.com/guest-view


🎯 MOTIVATION
------------

This project was developed to:

  * Build a complete full-stack web application from scratch.
  * Implement robust user authentication and session management using Passport.js.
  * Practice creating and managing a database schema with MongoDB and Mongoose.
  * Develop a dynamic, server-rendered front-end using Handlebars.
  * Create a practical, real-world application that facilitates community interaction.


🛠️ TECHNOLOGIES USED
-------------------

  * Front-End: HTML, CSS, JavaScript, Handlebars.js
  * Back-End: Node.js, Express.js
  * Database: MongoDB, Mongoose
  * Authentication & Middleware: Passport.js, express-session, bcryptjs, body-parser, multer


🚀 GETTING STARTED
-----------------

To get a local copy of the project up and running, follow these steps.

### Prerequisites

  * Node.js and npm: Ensure you have Node.js installed, which includes the npm package manager.
  * MongoDB: You must have a local MongoDB instance running. You can download the Community Server and Compass GUI from the official MongoDB website.

### Installation & Setup

1.  Download and extract the source files or clone the repository.
2.  Navigate to the project's root directory in your terminal.
3.  Install the required dependencies by running:

        npm i

4.  Populate the database with initial establishment data by running this command once:

        npm run populate

5.  Start the local server:

        npm start


🌐 USAGE
-------

Once the server is running, you can access the website in your browser.

  * Deployed Version:
    Navigate to https://taft10.onrender.com/guest-view to use the live application.

  * Local Version:
    Navigate to http://localhost:3000 to use your local instance of the application.

From the website, you can:
  * Browse establishments and reviews as a guest.
  * Sign up for an account to post your own reviews.
  * Log in as an establishment owner to manage your page and reply to comments.
