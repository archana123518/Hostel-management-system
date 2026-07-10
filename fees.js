let fees = JSON.parse(localStorage.getItem("fees")) || [];

// Show Form
function showFeeForm() {
    document.getElementById("feeForm").style.display = "block";
}

// Cancel Form
function cancelFeeForm() {
    document.getElementById("feeId").value = "";
    document.getElementById("feeName").value = "";
    document.getElementById("feeDepartment").value = "";
    document.getElementById("feeType").value = "";
    document.getElementById("feeAmount").value = "";
    document.getElementById("feeDate").value = "";
    document.getElementById("feeStatus").selectedIndex = 0;

    document.getElementById("feeForm").style.display = "none";
}

// Save Payment
function saveFee() {

    let id = document.getElementById("feeId").value;
    let name = document.getElementById("feeName").value;
    let department = document.getElementById("feeDepartment").value;
    let type = document.getElementById("feeType").value;
    let amount = document.getElementById("feeAmount").value;
    let date = document.getElementById("feeDate").value;
    let status = document.getElementById("feeStatus").value;

    if (id === "" || name === "" || department === "" ||
        type === "" || amount === "" || date === "") {

        alert("Please fill all fields");
        return;
    }

    fees.push({
        id: id,
        name: name,
        department: department,
        type: type,
        amount: amount,
        date: date,
        status: status
    });

    localStorage.setItem("fees", JSON.stringify(fees));

    displayFees();

    cancelFeeForm();
}

// Display Payments
function displayFees() {

    let table = document.getElementById("feeTableBody");

    if (!table) return;

    table.innerHTML = "";

    fees.forEach((fee, index) => {

        table.innerHTML += `
        <tr>
            <td>${fee.id}</td>
            <td>${fee.name}</td>
            <td>${fee.department}</td>
            <td>${fee.type}</td>
            <td>₹${fee.amount}</td>
            <td>${fee.date}</td>
            <td>${fee.status}</td>
            <td>
                <button onclick="editFee(${index})">Edit</button>
                <button onclick="deleteFee(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// Edit Payment
function editFee(index) {

    showFeeForm();

    document.getElementById("feeId").value = fees[index].id;
    document.getElementById("feeName").value = fees[index].name;
    document.getElementById("feeDepartment").value = fees[index].department;
    document.getElementById("feeType").value = fees[index].type;
    document.getElementById("feeAmount").value = fees[index].amount;
    document.getElementById("feeDate").value = fees[index].date;
    document.getElementById("feeStatus").value = fees[index].status;

    fees.splice(index, 1);

    localStorage.setItem("fees", JSON.stringify(fees));

    displayFees();
}

// Delete Payment
function deleteFee(index) {

    if (confirm("Delete this payment?")) {

        fees.splice(index, 1);

        localStorage.setItem("fees", JSON.stringify(fees));

        displayFees();
    }
}

// Search Payment
function searchFee() {

    let input = document.getElementById("feeSearch").value.toUpperCase();

    let rows = document.querySelectorAll("#feeTableBody tr");

    rows.forEach(function(row) {

        let name = row.cells[1].innerText.toUpperCase();

        row.style.display = name.includes(input) ? "" : "none";
    });
}

// Load
document.addEventListener("DOMContentLoaded", displayFees);