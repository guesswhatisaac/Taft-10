document.addEventListener("DOMContentLoaded", function() {

    console.log("test");

    /*
    document.querySelector(".save-button").addEventListener("click", function(e) {
        let usernameInput = document.querySelector("input#username").value;
        let bioInput = document.querySelector("textarea#description").value;
    
        currentUserIndex = 1;

        console.log(users[1].username);

        if (currentUserIndex !== -1) { // User found
            users[currentUserIndex].username = usernameInput;
            users[currentUserIndex].bio = bioInput;
        
            console.log("User data updated!");
            console.log(users[currentUserIndex]);

            // document.getElementById('user-handle').innerHTML = usernameInput;
            // document.getElementById('description').innerHTML = bioInput;
        } else {
            console.error("User not found!");
            e.preventDefault();
        }
    });
    */
      
    document.querySelector(".cancel-button").addEventListener("click", function() {
        console.log("cancel clicked");
        window.location.href = "/cancel-edit"; // redirect to cancel-edit route
    });
    
});