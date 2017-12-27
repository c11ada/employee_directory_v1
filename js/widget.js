$(document).ready(function() {
    
    let ajaxResult;
    let employees;
    let employeeIndex;
    let filteredEmployees;
    let resultCount = 12;
    let url = "https://randomuser.me/api/?results=" + resultCount + "&nat=us,dk,fr,gb";

    $.ajax({
        url: url,
        dataType: "json",
        success: function(data) {
            // console.log(data.results);
            employees = data.results;
            ajaxResult = data.results;
            // console.log(employees);

            $.each(employees, function(index,employee){
                renderEmployee(employee);
            }); 
        }
    });

    const employeeClick = (employee) => {
        // console.log(employee);
        employeeIndex = $(".employee").index(employee);
        // console.log(employees[employeeIndex]);
        const employeeModal = employees[employeeIndex];

        renderEmplyeeCard(employeeModal);

        $("#myModal").css("display","block");
    };

    $(".close").click(function(){
        $("#myModal").css("display","none")
    });

    $("#previous").click(function(){
        employeeIndex--

        if(employeeIndex < 0)
        {
            employeeIndex = employees.length - 1;
        }

        renderEmplyeeCard(employees[employeeIndex]);
    });

    $("#next").click(function(){
        employeeIndex++;

        if(employeeIndex > employees.length -1)
        {
            employeeIndex = 0;
        }

        renderEmplyeeCard(employees[employeeIndex]);
    });

    $("#search-btn").click(function(){
        let searchVal = $("#search input").val();
        searchEmployee(searchVal);
    });

    const renderEmplyeeCard = (employeeModal) => {
        if(employeeModal.login.username){
            $("#modal-un").text(employeeModal.login.username);
        }
        if(employeeModal.picture.large) {
            $("#modal-image").attr("src",employeeModal.picture.large);
        }
        if(employeeModal.name.first || employeeModal.name.last) {
            $("#modal-name").text(employeeModal.name.first + " " + employeeModal.name.last);
        }

        if(employeeModal.email) {
            $("#modal-email").text(employeeModal.email);
        }

        if(employeeModal.cell) {
            $("#modal-phone").text(employeeModal.cell);
        }

        if(employeeModal.location) {
            let addressText = "";
            $.each(employeeModal.location, function(index,location){
                addressText += location + " ";
            });
            $("#modal-address").text(addressText);
        }

        if(employeeModal.dob) {
            const DOB = new Date(employeeModal.dob.split(" ")[0]).toLocaleDateString();
            $("#modal-dob").text(DOB);
        }
    };

    const renderEmployee = (employee) => {
        let employeeDiv = $("<div>", {"class":"employee"}); 
        employeeDiv.click(function(){
            employeeClick($(this));
        }); 
        
        employeeDiv.hover(function(){
            $(this).toggleClass("employee-hover");
        });

        let img = $("<img>");
        img.attr("src",employee.picture.large);
        let employeeDetails = $("<div>", {"class":"details"});
        let h3 = $("<h3>");
        h3.text(employee.name.first + " " + employee.name.last);
        let emailP = $("<p>");
        emailP.text(employee.email);
        let locationP = $("<p>");
        locationP.text(employee.location.city);
        employeeDetails.append(h3);
        employeeDetails.append(emailP);
        employeeDetails.append(locationP)
        employeeDiv.append(img);
        employeeDiv.append(employeeDetails);
        $("#employees").append(employeeDiv);
    }

    const searchEmployee = (searchVal) => {
        employees = [];

        $.each(ajaxResult, function(index,employee){
            let name = employee.name.last + " " + employee.name.first;
            let uname = employee.login.username;

            if (name.includes(searchVal) || uname.includes(searchVal)){
                employees.push(employee);
            } 
        });

        if(employees.length > 0)
        {
            $(".employee").remove();
            $.each(employees, function(index,employee){
                renderEmployee(employee);
            });
        }

    };

});
