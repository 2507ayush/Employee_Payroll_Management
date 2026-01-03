$(document).ready(function () {

    const empForm = $("#empform");
    if (!empForm.length) return;

    /* ===================== FORM SUBMIT ===================== */

    empForm.on("submit", function (e) {
        e.preventDefault();

        let name = $('#name').val().trim();
        let profile = $("input[name='profile']:checked").val();
        let gender = $("input[name='gender']:checked").val();

        let department = [];
        $("input[name='department']:checked").each(function () {
            department.push($(this).val());
        });

        let salary = $('#salary').val();
        let day = $("#day").val();
        let month = $("#month").val();
        let year = $("#year").val();

        if (
            name === "" ||
            !profile ||
            !gender ||
            department.length === 0 ||
            !salary ||
            !day || !month || !year
        ) {
            alert("Please fill all the fields");
            return;
        }

        let startDate = `${day} ${month} ${year}`;

        let deptHTML = "";
        department.forEach(dep => {
            deptHTML += `<span class="badge bg-warning text-dark me-1">${dep}</span>`;
        });

        let newRow = `
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
        let editIndex = localStorage.getItem("editIndex");

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

    let editEmployee = JSON.parse(localStorage.getItem("editEmployee"));
    if (!editEmployee) return;

    $("#name").val(editEmployee.name);
    $("#salary").val(editEmployee.salary);

    $("input[name='gender']").each(function () {
        $(this).prop("checked", $(this).val() === editEmployee.gender);
    });

    $("input[name='department']").each(function () {
        $(this).prop("checked", editEmployee.department.includes($(this).val()));
    });

    let [day, month, year] = editEmployee.startDate.split(" ");
    $("#day").val(day);
    $("#month").val(month);
    $("#year").val(year);

});
