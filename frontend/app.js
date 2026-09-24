const API = "/api/students/";

async function loadStudents() {
    const response = await fetch(API);
    const students = await response.json();

    document.getElementById("students").innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.age}</td>
            <td><button onclick="deleteStudent(${student.id})">Delete</button></td>
        </tr>
    `).join("");
}

async function deleteStudent(id) {
    await fetch(`${API}${id}/`, { method: "DELETE" });
    loadStudents();
}

document.getElementById("studentForm").addEventListener("submit", async event => {
    event.preventDefault();

    const payload = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: Number(document.getElementById("age").value)
    };

    const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    document.getElementById("message").textContent =
        response.ok ? "Student added successfully." : "Unable to add student.";

    if (response.ok) event.target.reset();
    loadStudents();
});

loadStudents();
