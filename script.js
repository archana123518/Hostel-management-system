console.log("Hostel Management System Started");

function togglePassword(){
    const password = document.getElementById("password");

    if(password.type === "password"){
        password.type = "text";
    }else{
        password.type = "password";
    }
}

function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";

    } else {
        alert("Invalid Username or Password");
    }
}

function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
if (window.location.pathname.includes("index.html")) {

    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "dashboard.html";
    }

}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}