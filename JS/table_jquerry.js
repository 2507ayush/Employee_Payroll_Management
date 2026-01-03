$(document).ready(function () {

    const tableBody = $("#employeeTableBody");
    if (!tableBody.length) return;

    /* ===================== LOAD TABLE ===================== */

    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.reverse().forEach(row => {
        tableBody.append(row);
    });

    /* ===================== DELETE + EDIT ===================== */

    tableBody.on("click", function (e) {

        /* ---------- DELETE ---------- */
        if ($(e.target).closest(".delete-btn").length) {

            if (!confirm("Are you sure you want to delete this employee?")) return;

            let row = $(e.target).closest("tr");
            let index = row.index();

            let employees = JSON.parse(localStorage.getItem("employees")) || [];
            employees.splice(index, 1);
            localStorage.setItem("employees", JSON.stringify(employees));

            row.remove();
        }

        /* ---------- EDIT ---------- */
        if ($(e.target).closest(".edit-btn").length) {

            let row = $(e.target).closest("tr");

            let editData = {
                name: row.find("td:eq(0)").text().trim(),
                gender: row.find("td:eq(1)").text().trim(),
                department: row.find("td:eq(2)").text().trim().split(/\s+/),
                salary: row.find("td:eq(3)").text().replace("₹", "").trim(),
                startDate: row.find("td:eq(4)").text().trim()
            };

            let index = row.index();

            localStorage.setItem("editEmployee", JSON.stringify(editData));
            localStorage.setItem("editIndex", index);

            window.location.href = "index.html";
        }
    });

    /* ===================== SEARCH ===================== */

    $("#searchInput").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#employeeTableBody tr").each(function () {
            $(this).toggle($(this).text().toLowerCase().includes(value));
        });
    });

});
