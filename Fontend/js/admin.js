





$(document).ready(function(){

    $(function() {  //run with page load
        console.log("AutoLoad");
        employeeList();
        loadReports();
        contactUsLoad();
        $("#paymentPart").hide();
        $("#banUserPart").hide();
    });




    //function printPage(){
        $("#printThePage").click(function(){
            console.log($("#addEmployeeName").val()+" p")
    
            $("#emailPrint").html(sessionStorage.getItem("printEmail"));
            $("#namePrint").html(sessionStorage.getItem("printName"));
            $("#typePrint").html(sessionStorage.getItem("printType"));
            $("#phonePrint").html(sessionStorage.getItem("printPhone"));
            $("#salaryPrint").html(sessionStorage.getItem("printSalary"));
            $("#passwordPrint").html(sessionStorage.getItem("printPass"));
    
        });
        //}

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
                        url:"http://localhost:4747/api/employee",
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
    
    



 




    function employeeList(){
   // $("#loadbtn").click(function(){

        $.ajax({
        url:"http://localhost:4747/api/employee",
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
                    str+="<tr><td>"+
                    //'<img src="../../Backend/BloodDonation/Content/img/'+data[i].ProPic+'" width="75px" height="80px"></img>'
                    '<img src="../img/'+data[i].ProPic+'" width="75px" height="80px"></img>'
                    +"</td><td>"+data[i].Name
                    +"</td><td>"+data[i].Phone
                    +"</td><td>"+data[i].Email
                    +"</td><td>"+data[i].Address
                    +"</td><td>"+data[i].DOB
                    +"</td><td>"+data[i].Type
                  
                    +"</td></td>";
                }
//"<img src=."+/img/arguments.png+">" 
                $("#tblCategoryList tbody").html(str);
            }
            else
            {
                $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
            }
        }
    });
   //});  

}




    $("#serachBtn").click(function(){

   
        $.ajax({
        url:"http://localhost:4747/api/employee/"+$("#serachEamil").val(),
        method:"GET",
        headers:"Content-Type:application/json",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;

                    if(data.Name != null){
                        

                        sessionStorage.setItem("actionOFemployee", data.userId);
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
        url:"http://localhost:4747/api/employeeTypeChange/"+sessionStorage.getItem("actionOFemployee"),
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
                        sessionStorage.setItem("actionOFemployee", data.userId);
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
        url:"http://localhost:4747/api/salary",
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
                    $("#paymentPart").hide();

                    str+="<tr><td>"
                    +data[i].userInfo.userId
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
        url:"http://localhost:4747/api/salary/"+$("#inputIDsalary").val(),
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
                if(data.length > 0){
                    $("#msgSalarySearchError").html("");
                    $("#paymentPart").show();
                    for (var i = 0; i < data.length; i++) {
                        
                        str+="<tr><td>"
                        +data[i].userInfo.userId
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
                    $("#paymentPart").hide();
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


    function payMentDone(action){
        $.ajax({
            url:"http://localhost:4747/api/salary/"+$("#inputIDsalary").val()+"/"+$("#payMonthName").val()+"/"+$("#payYearhName").val()+"/"+action,
            method:"POST",
            headers:"Content-Type:application/json",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    var str='';
                    var data=xmlHttp.responseJSON;
    
                    console.log(data.February);
                    if(data != null){    
                    
                            str+="<tr><td>"
                            +data.userInfo.userId
                            +"</td><td>"+data.userInfo.Name
                            +"</td><td>"+data.January
                            +"</td><td>"+data.February
                            +"</td><td>"+data.March
                            +"</td><td>"+data.April
                            +"</td><td>"+data.May
                            +"</td><td>"+data.June
                            +"</td><td>"+data.July
                            +"</td><td>"+data.August
                            +"</td><td>"+data.September
                            +"</td><td>"+data.October
                            +"</td><td>"+data.November
                            +"</td><td>"+data.December
                            +"</td><td>"+data.Year
                            +"</td></tr>";
                        
                        $("#payMsg").html("Salary Updated!");
                    }else{
                        $("#payMsg").html("Data not FOUND!");
                    }
    
                    $("#tblSalaryList tbody").html(str);
                }
                    
                    
                else
                {
                    $("#payMsg").html("Data not Found!");
                }
            }
        });
    }



    $("#payBtn").click(function(){
        if (confirm('Do You want to Continue?')) {
            payMentDone("yes");
        }
       
      
    });

    $("#cenclePayBtn").click(function(){
        if (confirm('Do You want to Continue?')) {
            payMentDone("no");
        }
       
      
    });


    function loadReports(){
       
        $.ajax({
            url:"http://localhost:4747/api/allReports",
            method:"GET",
            headers:"Content-Type:application/json",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
    
                    var str='';
                    var data=xmlHttp.responseJSON;
                    console.log(data);
                    if(data != null){    
                        for (var i = 0; i < data.length; i++) {        
                        str+="<tr><td>"
                        +data[i].Report1
                        +"</td><td>"+data[i].DonorID
                        +"</td><td>"+data[i].UserID
                        +"</td></tr>";
                        }
                    }
                    $("#tblReportList tbody").html(str);
                }
                
                else
                {
                    $("#payMsg").html("Data not Found!");
                }
            }
        });
    }
    
    

    $("#searchFORbanBtn").click(function(){
        let temp = 0;
        $("#serachErrorReports").html("");
        $.ajax({
        url:"http://localhost:4747/api/allReports",
        method:"GET",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;
                if(data.length > 0){
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].DonorID == $("#searchFORban").val()){
                            str+="<tr><td>"
                            +data[i].Report1
                            +"</td><td>"+data[i].DonorID
                            +"</td><td>"+data[i].UserID
                            +"</td></tr>";
                            temp++;
                        }        
                    }
                    if(temp<=0){
                        $("#banUserPart").hide();
                        $("#serachErrorReports").html("User Not Found!");
                    } 
                    else{
                        $("#serachErrorReports").html("");
                        $("#tblReportList tbody").html(str);
                        banUserInfoLoad($("#searchFORban").val());
                    }

                }
    
            }

            else
            {
                $("#serachErrorReports").html("No Data Found!");
            }
        }
    });
    });
    



function banUserInfoLoad(value){
    $("#BanUnbanMsg").html("");
    $("#banUserPart").show();
    $.ajax({
        url:"http://localhost:4747/api/banUserInfo/"+value,
        method:"GET",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;
                if(data != null){    
                    
                    str+="<tr><td>"+
                    '<img src="../img/'+data.ProPic+'" width="75px" height="80px"></img>'
                    +"</td><td>"+data.Name
                    +"</td><td>"+data.Email
                    +"</td><td>"+data.Phone
                    +"</td><td>"+data.Address
                    +"</td><td>"+data.DOB
                    +"</td><td>"+data.BanStatus
                    +"</td></tr>";

                    $("#tblBanUserInfo tbody").html(str);
            }else{
                $("#serachErrorReports").html("User Not Found!");
            }

            }
        }
    });
}

$("#banUnbanBtn").click(function(){
    if (confirm('Aru sure to continue?')) {
        $.ajax({
            url:"http://localhost:4747/api/banUnbanUser/"+$("#searchFORban").val(),
            method:"POST",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    banUserInfoLoad($("#searchFORban").val());
                    $("#BanUnbanMsg").html("User Ban/Unban Request Sucess!");
                }
                    
                else
                {
                    $("#BanUnbanMsg").html("Error occur!");
                }
            }
        });
    
    } else {
        alert('Action canceled!');
    }

      
    });


    function myFunction(){
        console.log("hello");
    }
    function contactUsLoad(){
        $.ajax({
            url:"http://localhost:4747/api/contactUsList",
            method:"GET",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    var str='';
                    var data=xmlHttp.responseJSON;
                    console.log(data);
                    if(data != null){    
                        for (var i = 0; i < data.length; i++) {     
                            str+="<tr><td>"
                            +data[i].Email
                            +"</td><td>"+data[i].Name
                            +"</td><td>"+data[i].Massage
                            +"</td><td>"+data[i].Type
                            +"</td><td>"+'<a href="mailto:'+data[i].Email+'" target="_blank">Replay</a>'
                            //+"</td><td>"+'<button click="'+myFunction()+'">Click</button>'
                            +"</td></tr>";
                        }
                    
                        $("#tblContactUsList tbody").html(str);
                }else{
                    $("#serachErrorReports").html("User Not Found!");
                }
    
                }
            }
        });
    }

    $("#filterContactUsBtn").click(function(){
        $.ajax({
            url:"http://localhost:4747/api/contactUsList",
            method:"GET",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    var str='';
                    var data=xmlHttp.responseJSON;
                    console.log(data);
                    if(data != null){    
                        for (var i = 0; i < data.length; i++) {   
                            if(data[i].Type == $("#filterContactUsDropdown").val()){  
                                str+="<tr><td>"
                                +data[i].Email
                                +"</td><td>"+data[i].Name
                                +"</td><td>"+data[i].Massage
                                +"</td><td>"+data[i].Type
                                +"</td><td>"+'<a href="mailto:'+data[i].Email+'" target="_blank">Replay</a>'
                                +"</td></tr>";
                            }
                        }
                    
                        $("#tblContactUsList tbody").html(str);
                }
    
                }
            }
        });
    });
});