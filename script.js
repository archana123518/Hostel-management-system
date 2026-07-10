// =========================
// HOSTEL MANAGEMENT SYSTEM
// LOGIN + DASHBOARD
// =========================

// LOGIN
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

// SHOW / HIDE PASSWORD
function togglePassword() {

    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

// LOGOUT
function logout() {

    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

// =========================
// DASHBOARD
// =========================

function loadDashboard() {

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    let fees = JSON.parse(localStorage.getItem("fees")) || [];

    // Total Students
    let totalStudents = document.getElementById("totalStudents");
    if (totalStudents) {
        totalStudents.innerText = students.length;
    }

    // Occupied Rooms
    let occupied = rooms.filter(room => room.status === "Occupied").length;

    let occupiedRooms = document.getElementById("occupiedRooms");
    if (occupiedRooms) {
        occupiedRooms.innerText = occupied;
    }

    // Vacant Rooms
    let vacant = rooms.filter(room => room.status === "Available").length;

    let vacantRooms = document.getElementById("vacantRooms");
    if (vacantRooms) {
        vacantRooms.innerText = vacant;
    }

    // Pending Payments
    let pending = fees.filter(fee => fee.status === "Pending").length;

    let pendingPayments = document.getElementById("pendingPayments");
    if (pendingPayments) {
        pendingPayments.innerText = pending;
    }
}

document.addEventListener("DOMContentLoaded", loadDashboard);