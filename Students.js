let students = JSON.parse(localStorage.getItem("students")) || [];

// Show Form
function showForm() {
    document.getElementById("studentForm").style.display = "block";
}

// Cancel Form
function cancelForm() {
    document.getElementById("studentForm").style.display = "none";

    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("room").value = "";
    document.getElementById("year").value = "";
    document.getElementById("status").value = "Active";
}

// Save
function saveStudent() {

    let student = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        room: document.getElementById("room").value,
        year: document.getElementById("year").value,
        status: document.getElementById("status").value
    };

    if(student.id==="" || student.name===""){
        alert("Please fill all fields");
        return;
    }

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    cancelForm();
}

// Display
function displayStudents(){

    let table=document.getElementById("studentTableBody");

    if(!table) return;

    table.innerHTML="";

    students.forEach((student,index)=>{

        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.room}</td>
            <td>${student.year}</td>
            <td>${student.status}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// Edit
function editStudent(index){

    showForm();

    document.getElementById("id").value = students[index].id;
    document.getElementById("name").value = students[index].name;
    document.getElementById("department").value = students[index].department;
    document.getElementById("room").value = students[index].room;
    document.getElementById("year").value = students[index].year;
    document.getElementById("status").value = students[index].status;

    students.splice(index,1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

// Delete
function deleteStudent(index){

    if(confirm("Delete this student?")){

        students.splice(index,1);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();
    }
}

// Search
function searchStudent(){

    let input=document.getElementById("searchStudent").value.toUpperCase();

    let tr=document.getElementById("studentTableBody").getElementsByTagName("tr");

    for(let i=0;i<tr.length;i++){

        let td=tr[i].getElementsByTagName("td")[1];

        if(td){

            let txt=td.textContent || td.innerText;

            tr[i].style.display =
            txt.toUpperCase().indexOf(input)>-1 ? "" : "none";
        }
    }
}

// Load
document.addEventListener("DOMContentLoaded", displayStudents);