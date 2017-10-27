$(document).ready(function() {

    let employees;
    let resultCount = 12;
    let url = "https://randomuser.me/api/?results=" + resultCount;

    $.ajax({
        url: url,
        dataType: "json",
        success: function(data) {
            // console.log(data.results);
            employees = data.results;
            // console.log(employees);
            let ul = $("<ul>");

            $.each(employees, function(index,employee){
                let li = $("<li>");
                let img = $("<img>");
                img.attr("src",employee.picture.large);
                let div = $("<div>");
                let h3 = $("<h3>");
                h3.text(employee.name.first + " " + employee.name.last);
                let emailSpan = $("<p>");
                emailSpan.text(employee.email);
                let locationSpan = $("<p>");
                locationSpan.text(employee.location.city);
                div.append(h3);
                div.append(emailSpan);
                div.append(locationSpan)
                li.append(img);
                li.append(div);
                ul.append(li);
            });

            $("#employees").append(ul);
        }
    });

});
