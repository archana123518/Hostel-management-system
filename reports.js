let fees = JSON.parse(localStorage.getItem("fees")) || [];

// Display Reports
function displayReports() {

    let table = document.getElementById("reportTableBody");

    if (!table) return;

    table.innerHTML = "";

    fees.forEach((fee) => {

        table.innerHTML += `
        <tr>
            <td>${fee.id}</td>
            <td>${fee.name}</td>
            <td>${fee.department}</td>
            <td>${fee.type}</td>
            <td>₹${fee.amount}</td>
            <td>${fee.date}</td>
            <td>${fee.status}</td>
        </tr>
        `;
    });
}

// Search Report
function searchReport() {

    let input = document.getElementById("reportSearch").value.toUpperCase();

    let rows = document.querySelectorAll("#reportTableBody tr");

    rows.forEach(function(row) {

        let name = row.cells[1].innerText.toUpperCase();

        if (name.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

// Load Reports
document.addEventListener("DOMContentLoaded", displayReports);