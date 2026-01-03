document.addEventListener("DOMContentLoaded", function () {

    const empForm = document.getElementById("empform");
    if (!empForm) return;

    /* ===================== SUBMIT FORM ===================== */

    empForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // ---------- Get Values ----------
        const name = document.getElementById("name").value.trim();
        const profileInput = document.querySelector("input[name='profile']:checked");
        const genderInput = document.querySelector("input[name='gender']:checked");

        const departmentInput = document.querySelectorAll("input[name='department']:checked");
        const department = Array.from(departmentInput).map(dep => dep.value);

        const salary = document.getElementById("salary").value;
        const day = document.getElementById("day").value;
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;

        // ---------- Reset Errors ----------
        ["n","p","g","depa","sal","strt"].forEach(id => {
            document.getElementById(id).style.display = "none";
        });

        // ---------- Validation ----------
        if (name === "") document.getElementById("n").style.display = "block";
        if (!profileInput) document.getElementById("p").style.display = "block";
        if (!genderInput) document.getElementById("g").style.display = "block";
        if (department.length === 0) document.getElementById("depa").style.display = "block";
        if (!salary) document.getElementById("sal").style.display = "block";
        if (!day || !month || !year) document.getElementById("strt").style.display = "block";

        if (!name || !profileInput || !genderInput || department.length === 0 || !salary || !day || !month || !year) {
            return;
        }

        // ---------- Prepare Data ----------
        const profile = profileInput.value;
        const gender = genderInput.value;
        const startDate = `${day} ${month} ${year}`;

        let deptHTML = "";
        department.forEach(dep => {
            deptHTML += `<span class="badge text-dark me-1" style="background-color:#E9FEA5">${dep}</span>`;
        });

        const newRow = `
            <tr>
                <td style="text-align:left;">
                    <img src="${profile}" style="width:40px;">
                    ${name}
                </td>
                <td>${gender}</td>
                <td>${deptHTML}</td>
                <td>₹${salary}</td>
                <td>${startDate}</td>
                <td>
                    <button class="btn btn-sm delete-btn">🗑</button>
                    <button class="btn btn-sm edit-btn">✏️</button>
                </td>
            </tr>
        `;

        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        const editIndex = localStorage.getItem("editIndex");

        if (editIndex !== null) {
            employees[editIndex] = newRow;
            localStorage.removeItem("editIndex");
            localStorage.removeItem("editEmployee");
        } else {
            employees.push(newRow);
        }

        localStorage.setItem("employees", JSON.stringify(employees));
        window.location.href = "table.html";
    });

    /* ===================== PREFILL FORM (EDIT) ===================== */

    const editEmployee = JSON.parse(localStorage.getItem("editEmployee"));
    if (!editEmployee) return;

    document.getElementById("name").value = editEmployee.name;
    document.getElementById("salary").value = editEmployee.salary;

    document.querySelectorAll("input[name='gender']").forEach(radio => {
        radio.checked = radio.value === editEmployee.gender;
    });

    document.querySelectorAll("input[name='department']").forEach(cb => {
        cb.checked = editEmployee.department.includes(cb.value);
    });

    const [day, month, year] = editEmployee.startDate.split(" ");
    document.getElementById("day").value = day;
    document.getElementById("month").value = month;
    document.getElementById("year").value = year;

});
