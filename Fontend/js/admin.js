$(document).ready(function(){

    $("#addEmployeeBtn").click(function(){
    
        var validation = false;
        var file = $("#addEmployeeProPic").get(0).files;


        if($("#addEmployeeName").val() != "" && $("#addEmployeeEmail").val() != ""
        && $("#addEmployeePhone").val() != "" && $("#addEmployeeAddress").val() != ""
        && $("#addEmployeeDOB").val() != "" && $("#addEmployeeType").val() != ""
        && $("#addEmployeeBloodGroup").val() != "" && $("#addEmployeeSalary").val() != ""){
            validation = true;


        }else{
            console.log('HH')
            validation = false;
            $("#msgAddEmpplyee").html("Please fill up all text box");
        }
        

        if(validation == true){
            if(file[0].type == "image/jpeg" || file[0].type == "image/jpg" ||file[0].type == "image/png"){
                $("#msgAddEmpplyee").html("");
                
         


                    $.ajax({
                        url:"https://localhost:44399/api/employee",
                        method:"POST",
                        headers:"Content-Type:application/json",
                        data:{
                            "Name":$("#addEmployeeName").val(),
                            "Email":$("#addEmployeeEmail").val(),
                            "Phone":$("#addEmployeePhone").val(),
                            "Address":$("#addEmployeeAddress").val(),
                            "DOB":$("#addEmployeeDOB").val(),
                            "Type":$("#addEmployeeType").val(),
                            "Salary":$("#addEmployeeSalary").val(),
                            "BloodGroup":$("#addEmployeeBloodGroup").val(),
                            "ProPic":file[0].name


                        },
                        
                        complete:function(type){

                            if(type.responseJSON=="none")
                            {
                                // $("#msgAddEmpplyee").html(xmlHttp.status+":"+xmlHttp.statusText+": not sent!");
                                $("#msgAddEmpplyee").html("Not Added! Server side error!!");
                    
                            }
                            else if(type.responseJSON=="emailExist"){
                                $("#msgAddEmpplyee").html("Email Already Exist!");
                            }
                            else
                            {

                                $("#msgAddEmpplyee").html("Data Added!");
                            
                                sessionStorage.setItem("printEmail", $("#addEmployeeEmail").val());
                                sessionStorage.setItem("printName", $("#addEmployeeName").val());
                                sessionStorage.setItem("printPhone", $("#addEmployeePhone").val());
                                sessionStorage.setItem("printType", $("#addEmployeeType").val());
                                sessionStorage.setItem("printSalary", $("#addEmployeeSalary").val());
                                sessionStorage.setItem("printPass",type.responseJSON);
                                
                                window.location.href = "printPage.html";
                            }
                        }
                    });
        }
        else{
            validation = false;
            $("#msgAddEmpplyee").html("Picture type should be jpg/jpeg/png");
        }

    }


    //     var data = new FormData();
    //     var files = $("#addEmployeeProPic").get(0).files;
    //   // Add the uploaded image content to the form data collection
    //   if (files.length > 0) {
    //        data.append("UploadedImage", files[0]);
    //   }

    // console.log(file[0]);
    //     var data = new FormData;
    //     data.append("ImageFile", file[0]);
        // data.append("ProductName", "SamsungA8");

 });
    
    



    $("#printThePage").click(function(){

        console.log($("#addEmployeeName").val()+" p")

        $("#emailPrint").html(sessionStorage.getItem("printEmail"));
        $("#namePrint").html(sessionStorage.getItem("printName"));
        $("#typePrint").html(sessionStorage.getItem("printType"));
        $("#phonePrint").html(sessionStorage.getItem("printPhone"));
        $("#salaryPrint").html(sessionStorage.getItem("printSalary"));
        $("#passwordPrint").html(sessionStorage.getItem("printPass"));

    });



    function promotion(){
        console.log("prom");
    }


    $("#loadbtn").click(function(){
    
        $.ajax({
        url:"https://localhost:44399/api/employee",
        method:"GET",
        // headers:{
        //     "Authorization":"Basic "+btoa("admin:123")
        // },
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;
                for (var i = 0; i < data.length; i++) {
                    
                    str+="<tr><td>"
                    +data[i].Name
                    +"</td><td>"+data[i].Phone
                    +"</td><td>"+data[i].Email
                    +"</td><td>"+data[i].Address
                    +"</td><td>"+data[i].DOB
                    +"</td><td>"+data[i].Type
                    +"</td><td><button onclick="+promotion()+"></button>"
                    +"</td></tr>";
                }

                $("#tblCategoryList tbody").html(str);
            }
            else
            {
                $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
            }
        }
    });
    });



    $("#serachBtn").click(function(){

   
        $.ajax({
        url:"https://localhost:44399/api/employee/"+$("#serachEamil").val(),
        method:"GET",
        headers:"Content-Type:application/json",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;

                    if(data.Name != null){
                        sessionStorage.setItem("actionOFemployee", data.userID);
                        str+="<tr><td>Name: "
                        +data.Name
                        +"</td><tr><td>Phone: "+data.Phone
                        +"</td></tr><td>Email: "+data.Email
                        +"</td><tr><td>Address: "+data.Address
                        +"</td></tr><td>DOB: "+data.DOB
                        +"</td><tr><td>Type: "+data.Type
                        +"</td></tr>";
                    }else{
                        str+="<tr><td>Data Not Found!"+"</td></tr>";
                    }
            
                $("#prmotionTable tbody").html(str);
            }
            else
            {
                $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);


            }
        }
        });
    });


    $("#changeTypeBtn").click(function(){
    
        $.ajax({
        url:"https://localhost:44399/api/employeeTypeChange/"+sessionStorage.getItem("actionOFemployee"),
        method:"GET",
        headers:"Content-Type:application/json",
        // data:{
        //     "Type":"admin"
        // },
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;

                    if(data.Name != null){
                        sessionStorage.setItem("actionOFemployee", data.userID);
                        str+="<tr><td>Name: "
                        +data.Name
                        +"</td><tr><td>Phone: "+data.Phone
                        +"</td></tr><td>Email: "+data.Email
                        +"</td><tr><td>Address: "+data.Address
                        +"</td></tr><td>DOB: "+data.DOB
                        +"</td><tr><td>Type: "+data.Type
                        +"</td></tr>";
                    }else{
                        str+="<tr><td>Data Not Found!"+"</td></tr>";
                    }

            
                $("#prmotionTable tbody").html(str);

                $("#warningMsgChnageType").html("Type Chnaged to "+data.Type);
            }
            else
            {
                $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);


            }
        }
    });
    });



    $("#loadSalaryBtn").click(function(){
    
        $.ajax({
        url:"https://localhost:44399/api/salary",
        method:"GET",
        // headers:{
        //     "Authorization":"Basic "+btoa("admin:123")
        // },
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;

                console.log(data);
                
                for (var i = 0; i < data.length; i++) {
                    
                    str+="<tr><td>"
                    +data[i].userInfo.userID
                    +"</td><td>"+data[i].userInfo.Name
                    +"</td><td>"+data[i].January
                    +"</td><td>"+data[i].February
                    +"</td><td>"+data[i].March
                    +"</td><td>"+data[i].April
                    +"</td><td>"+data[i].May
                    +"</td><td>"+data[i].June
                    +"</td><td>"+data[i].July
                    +"</td><td>"+data[i].August
                    +"</td><td>"+data[i].September
                    +"</td><td>"+data[i].October
                    +"</td><td>"+data[i].November
                    +"</td><td>"+data[i].December
                    +"</td><td>"+data[i].Year
                    +"</td></tr>";
                }
               

                $("#tblSalaryList tbody").html(str);
            }
            else
            {
                $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
            }
        }
    });
    });


    $("#searchSalary").click(function(){
    
        $.ajax({
        url:"https://localhost:44399/api/salary/"+$("#inputIDsalary").val(),
        method:"GET",
        // headers:{
        //     "Authorization":"Basic "+btoa("admin:123")
        // },
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;

                if(data != null){
                    for (var i = 0; i < data.length; i++) {
                    
                        str+="<tr><td>"
                        +data[i].userInfo.userID
                        +"</td><td>"+data[i].userInfo.Name
                        +"</td><td>"+data[i].January
                        +"</td><td>"+data[i].February
                        +"</td><td>"+data[i].March
                        +"</td><td>"+data[i].April
                        +"</td><td>"+data[i].May
                        +"</td><td>"+data[i].June
                        +"</td><td>"+data[i].July
                        +"</td><td>"+data[i].August
                        +"</td><td>"+data[i].September
                        +"</td><td>"+data[i].October
                        +"</td><td>"+data[i].November
                        +"</td><td>"+data[i].December
                        +"</td><td>"+data[i].Year
                        +"</td></tr>";
                    }
    
                    
                }else{
                    $("#msgSalarySearchError").html("Data not FOUND!");
                }

                $("#tblSalaryList tbody").html(str);

            }
                
                
            else
            {
                $("#msgSalarySearchError").html("Data not FOUND!");
            }
        }
    });
    });
    

    
});