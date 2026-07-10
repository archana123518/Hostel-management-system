let messBills = JSON.parse(localStorage.getItem("messBills")) || [];

// Show Form
function showMessForm() {
    document.getElementById("messForm").style.display = "block";
}

// Cancel Form
function cancelMessForm() {
    document.getElementById("messId").value = "";
    document.getElementById("messName").value = "";
    document.getElementById("messMonth").value = "";
    document.getElementById("messAmount").value = "";
    document.getElementById("messStatus").selectedIndex = 0;

    document.getElementById("messForm").style.display = "none";
}

// Save Bill
function saveMessBill() {

    let id = document.getElementById("messId").value;
    let name = document.getElementById("messName").value;
    let month = document.getElementById("messMonth").value;
    let amount = document.getElementById("messAmount").value;
    let status = document.getElementById("messStatus").value;

    if (id === "" || name === "" || month === "" || amount === "") {
        alert("Please fill all fields");
        return;
    }

    messBills.push({
        id: id,
        name: name,
        month: month,
        amount: amount,
        status: status
    });

    localStorage.setItem("messBills", JSON.stringify(messBills));

    displayMessBills();

    cancelMessForm();
}

// Display Bills
function displayMessBills() {

    let table = document.getElementById("messTableBody");

    if (!table) return;

    table.innerHTML = "";

    messBills.forEach((bill, index) => {

        table.innerHTML += `
        <tr>
            <td>${bill.id}</td>
            <td>${bill.name}</td>
            <td>${bill.month}</td>
            <td>₹${bill.amount}</td>
            <td>${bill.status}</td>
            <td>
                <button onclick="editMessBill(${index})">Edit</button>
                <button onclick="deleteMessBill(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// Edit Bill
function editMessBill(index) {

    showMessForm();

    document.getElementById("messId").value = messBills[index].id;
    document.getElementById("messName").value = messBills[index].name;
    document.getElementById("messMonth").value = messBills[index].month;
    document.getElementById("messAmount").value = messBills[index].amount;
    document.getElementById("messStatus").value = messBills[index].status;

    messBills.splice(index, 1);

    localStorage.setItem("messBills", JSON.stringify(messBills));

    displayMessBills();
}

// Delete Bill
function deleteMessBill(index) {

    if (confirm("Delete this bill?")) {

        messBills.splice(index, 1);

        localStorage.setItem("messBills", JSON.stringify(messBills));

        displayMessBills();
    }
}

// Search
function searchMess() {

    let input = document.getElementById("messSearch").value.toUpperCase();

    let rows = document.querySelectorAll("#messTableBody tr");

    rows.forEach(function(row) {

        let name = row.cells[1].innerText.toUpperCase();

        row.style.display = name.includes(input) ? "" : "none";
    });
}

// Load
document.addEventListener("DOMContentLoaded", displayMessBills);