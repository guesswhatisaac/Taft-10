document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");

    togglePassword.addEventListener("click", function () {
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("bi-eye");
    });

    const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
    const confirmPassword = document.querySelector("#confirm-password");

    toggleConfirmPassword.addEventListener("click", function () {
        const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
            confirmPassword.setAttribute("type", type);
            this.classList.toggle("bi-eye");
    });

    const form = document.querySelector("form");
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    });
});