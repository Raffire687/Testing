$(document).ready(function () {
    const loginForm = $("#loginForm");
    const registerForm = $("#registerForm");
    const toggleForm = $("#toggleForm");
    const formTitle = $("#formTitle");
    const successPopup = $("#successPopup");
    const errorPopup = $("#errorPopup");

    function showPopup(message, isSuccess = true) {
        let popup = isSuccess ? successPopup : errorPopup;
        popup.text(message).fadeIn().delay(2000).fadeOut();
    }

    // Handle Login Form Submission
    loginForm.submit(function (event) {
        event.preventDefault();

        let username = $("#username").val().trim();
        let password = $("#password").val().trim();

        if (username === "" || password === "") {
            showPopup("Please enter both username and password.", false);
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(user => user.username === username && user.password === password);

        if (user) {
            showPopup("Successfully Logged In! Redirecting...", true);
            setTimeout(() => window.location.href = "admin.html", 2000);
        } else {
            showPopup("Invalid credentials. Try again.", false);
        }
    });

    // Handle Registration Form Submission
    registerForm.submit(function (event) {
        event.preventDefault();

        let regUsername = $("#regUsername").val().trim();
        let regEmail = $("#regEmail").val().trim();
        let regPassword = $("#regPassword").val();
        let confirmPassword = $("#confirmPassword").val();

        if (!regUsername || !regEmail || !regPassword || !confirmPassword) {
            showPopup("All fields are required.", false);
            return;
        }

        if (regPassword !== confirmPassword) {
            showPopup("Passwords do not match.", false);
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.username === regUsername)) {
            showPopup("Username already taken.", false);
            return;
        }

        users.push({ username: regUsername, email: regEmail, password: regPassword });
        localStorage.setItem("users", JSON.stringify(users));

        showPopup("Registration successful! You can now log in.", true);
        setTimeout(() => {
            registerForm.hide();
            loginForm.show();
            formTitle.text("Login");
            toggleForm.text("Don't have an account? Register");
        }, 2000);
    });

    // Toggle Between Login and Register Forms
    toggleForm.click(function () {
        loginForm.toggle();
        registerForm.toggle();
        formTitle.text(registerForm.is(":visible") ? "Register" : "Login");
        toggleForm.text(registerForm.is(":visible") ? "Already have an account? Login" : "Don't have an account? Register");
    });
});
