let rooms = JSON.parse(localStorage.getItem("rooms")) || [];

// Show Form
function showRoomForm() {
    document.getElementById("roomForm").style.display = "block";
}

// Cancel Form
function cancelRoomForm() {
    document.getElementById("roomNo").value = "";
    document.getElementById("capacity").value = "";
    document.getElementById("roomStatus").selectedIndex = 0;
    document.getElementById("roomForm").style.display = "none";
}

// Display Rooms
function displayRooms() {
    let table = document.getElementById("roomTableBody");
    table.innerHTML = "";

    rooms.forEach((room, index) => {
        let row = table.insertRow();

        row.insertCell(0).innerHTML = room.roomNo;
        row.insertCell(1).innerHTML = room.capacity;
        row.insertCell(2).innerHTML = room.status;
        row.insertCell(3).innerHTML = `
            <button onclick="editRoom(${index})">Edit</button>
            <button onclick="deleteRoom(${index})">Delete</button>
        `;
    });
}

// Save Room
function saveRoom() {

    let roomNo = document.getElementById("roomNo").value;
    let capacity = document.getElementById("capacity").value;
    let status = document.getElementById("roomStatus").value;

    if (roomNo === "" || capacity === "") {
        alert("Please fill all fields");
        return;
    }

    rooms.push({
        roomNo: roomNo,
        capacity: capacity,
        status: status
    });

    localStorage.setItem("rooms", JSON.stringify(rooms));

    displayRooms();

    cancelRoomForm();
}

// Delete Room
function deleteRoom(index) {

    if (confirm("Delete this room?")) {
        rooms.splice(index, 1);
        localStorage.setItem("rooms", JSON.stringify(rooms));
        displayRooms();
    }
}

// Edit Room
function editRoom(index) {

    document.getElementById("roomForm").style.display = "block";

    document.getElementById("roomNo").value = rooms[index].roomNo;
    document.getElementById("capacity").value = rooms[index].capacity;
    document.getElementById("roomStatus").value = rooms[index].status;

    rooms.splice(index, 1);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    displayRooms();
}

// Search Room
function searchRoom() {

    let input = document.getElementById("searchRoom").value.toUpperCase();
    let table = document.getElementById("roomTableBody");
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {

        let td = tr[i].getElementsByTagName("td")[0];

        if (td) {

            let txt = td.textContent || td.innerText;

            if (txt.toUpperCase().indexOf(input) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Load Rooms
displayRooms();