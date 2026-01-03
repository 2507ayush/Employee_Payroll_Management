document.addEventListener("DOMContentLoaded", function () {

    const tableBody = document.getElementById("employeeTableBody");
    if (!tableBody) return;

    /* ===================== LOAD TABLE ===================== */

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.reverse().forEach(row => {
        tableBody.insertAdjacentHTML("beforeend", row);
    });

    /* ===================== DELETE & EDIT ===================== */

    tableBody.addEventListener("click", function (e) {

        // ---------- DELETE ----------
        const deleteBtn = e.target.closest(".delete-btn");
        if (deleteBtn) {
            if (!confirm("Are you sure you want to delete this employee?")) return;

            const row = deleteBtn.closest("tr");
            const rowIndex = Array.from(tableBody.children).indexOf(row);

            let employees = JSON.parse(localStorage.getItem("employees")) || [];
            employees.splice(rowIndex, 1);
            localStorage.setItem("employees", JSON.stringify(employees));

            row.remove();
            return;
        }

        // ---------- EDIT ----------
        const editBtn = e.target.closest(".edit-btn");
        if (!editBtn) return;

        const row = editBtn.closest("tr");

        const editData = {
            name: row.cells[0].innerText.trim(),
            gender: row.cells[1].innerText.trim(),
            department: row.cells[2].innerText.split(/\s+/),
            salary: row.cells[3].innerText.replace("₹", "").trim(),
            startDate: row.cells[4].innerText.trim()
        };

        const rowIndex = Array.from(tableBody.children).indexOf(row);

        localStorage.setItem("editEmployee", JSON.stringify(editData));
        localStorage.setItem("editIndex", rowIndex);

        window.location.href = "index.html";
    });

    /* ===================== SEARCH ===================== */

    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {
        const searchValue = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll("#employeeTableBody tr");

        rows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(searchValue)
                ? ""
                : "none";
        });
    });

});
