const User = function() {
    // TODO make a constructor
}

document.addEventListener('DOMContentLoaded', function() {
    // FORM INPUTS
    document.querySelector("#sign-in-submit-button").addEventListener("click", function(e){
        let usernameInput =  document.querySelector("input#username").value;
        let passwordInput = document.querySelector("input#password").value;
        let checkboxInput = $("#checkbox").is(":checked");
    
        // for checking
        console.log(usernameInput);
        console.log(passwordInput);
        console.log(checkboxInput);
    });


    // TOGGLE PASSWORD
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");

    togglePassword.addEventListener("click", function () {
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("bi-eye");
    });

    const form = document.querySelector("form");
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    
});


