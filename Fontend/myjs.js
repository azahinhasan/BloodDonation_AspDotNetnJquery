// $(document).ready(function(){

//     // document.write("it works");

//     $("#loadBtn").click(function(){

//         $.ajax({
//             url:"https://localhost:44382/api/categories",
//             // success:function(){},
//             // error:function(){}
//             complete:function(xmLHttp,status){
//                 // document.write(xmLHttp.responseText);
//                 // document.write(xmLHttp.responseJSON);
//                 // console.log(xmLHttp);
//                 // console.log(xmLHttp.responseText);
//                 console.log(xmLHttp.responseJSON);
    
    
//                 if(xmLHttp.status == 200){
//                     var str='';
//                     var data = xmLHttp.responseJSON;
//                     for(var i =0; i<data.length; i++){
//                         str+="<tr><td>"+data[i].CatagoriesId+"</td><td>"+data[i].CatagoriesName+"</td></tr>";
//                     }
    
    
//                     $(".tblCategory tbody").html(str); //. for clss # for id
    
//                 }
//                 else
//                 {
//                     $("#msg").html(xmLHttp.status+":"+xmLHttp.statusText);
//                 }
            
//             }
//         });
    


//     });

   
// });




$(document).ready(function(){



$("#login").click(function(){

   
    $.ajax({
    url:"http://localhost:4747/api/login",
    method:"POST",
    headers:"Content-Type:application/json",
    data:{
        "Email":$("#inputEamil").val(),
        "Password":$("#inputPassword").val()
    },
    complete:function(type){
        console.log(type);

        if(type.responseJSON=="Admin" || type.responseJSON=="Moderator")
        {
            sessionStorage.setItem("Email", $("#inputEamil").val());
            sessionStorage.setItem("Type",type.responseJSON);

            console.log(sessionStorage.getItem("Email"));

            window.location.href = "Admin/adminHome.html";

            // console.log(Cookies.set('nameBloodDonationAZH', 3));
            // console.log(Cookies.get('nameBloodDonationAZH'));
           // window.location.href="Admin/adminHome.html";

        }
        else if(type.responseJSON=="User")
        {
            sessionStorage.setItem("Email", $("#inputEamil").val());
            sessionStorage.setItem("Type",type.responseJSON);
            //window.location.href = "Admin/adminHome.html";
        
        }
        else
        {
            $("#errorMsgLogin").html("Wrong Email or Password");
        }
        
    }
    });
});

$("#submitContactUs").click(function(){

        var validation = false;

        if($("#EmailContactUs").val() != "" && $("#NameContactUs").val() != ""
        && $("#MassageContactUs").val() != "" && $("#TypeContactUs").val() != ""){
            validation = true;

        }


        if(validation == true){
            $.ajax({
                url:"http://localhost:4747/api/contactus",
                method:"POST",
                headers:"Content-Type:application/json",
                data:{
                    "Email":$("#EmailContactUs").val(),
                    "Name":$("#NameContactUs").val(),
                    "Massage":$("#MassageContactUs").val(),
                    "Type":$("#TypeContactUs").val()
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        $("#msgContactUs").html("Thank You for Contact with Us!");
                    }
                    else
                    {
                        $("#msgContactUs").html(xmlHttp.status+":"+xmlHttp.statusText+": not sent!");
                    }
                }
            });
        }
        else{
            $("#msgContactUs").html("Please fill up all text box");
        }
      
});



        

});






//Admin_____________________











//--------------------------------------------------------


// $(document).ready(function(){
//     var catId,catIdDelete;
    
    
    
//     function loadDropDown()
//     {
//         $.ajax({
//             url:"https://localhost:44382/api/categories/",
//             method:"GET",
            
//             headers:{
//                 "Authorization":"Basic "+btoa("admin:123")
//             },
//             complete:function(xmlHttp,status){
//                 if(xmlHttp.status==200)
//                 {
//                     var str='';
//                     var data=xmlHttp.responseJSON;
//                     for (var i = 0; i < data.length; i++) {
                        
//                         str+="<option value="+data[i].CatagoriesId+">"+data[i].CatagoriesName+"</option>";
//                     }
    
//                     $("#selectCategory").html(str);
//                 }
//                 else
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                 }
//             }
//         });
//     }


//     function loadDropDownDelete()
//     {
//         $.ajax({
//             url:"https://localhost:44382/api/categories/",
//             method:"GET",
            
//             headers:{
//                 "Authorization":"Basic "+btoa("admin:123")
//             },
//             complete:function(xmlHttp,status){
//                 if(xmlHttp.status==200)
//                 {
//                     var str='';
//                     var data=xmlHttp.responseJSON;
//                     for (var i = 0; i < data.length; i++) {
                        
//                         str+="<option value="+data[i].CatagoriesId+">"+data[i].CatagoriesId+"</option>";
//                     }
    
//                     $("#selectID").html(str);
//                 }
//                 else
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                 }
//             }
//         });
//     }
    
    
    
//         $("#loadbtn").click(function(){
    
//             $.ajax({
//             url:"https://localhost:44382/api/categories",
//             method:"GET",
    
//             headers:{
//                 "Authorization":"Basic "+btoa("admin:123")
//             },
//             complete:function(xmlHttp,status){
//                 if(xmlHttp.status==200)
//                 {
//                     var str='';
//                     var data=xmlHttp.responseJSON;
//                     for (var i = 0; i < data.length; i++) {
                        
//                         str+="<tr><td>"+data[i].CatagoriesId+"</td><td>"+data[i].CatagoriesName+"</td></tr>";
//                     }
    
//                     $("#tblCategoryList tbody").html(str);
//                 }
//                 else
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                 }
//             }
//         });
//         });
    
    
//         $("#addCategory").click(function(){
    
//             $.ajax({
//             url:"https://localhost:44382/api/categories",
//             method:"POST",
//             headers:"Content-Type:application/json",
//             data:{
//                 "CatagoriesName":$("#categoryName").val()
//             },
//             complete:function(xmlHttp,status){
//                 if(xmlHttp.status==201)
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                 }
//                 else
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                 }
//             }
//         });
//         });
    
    
//         $("#selectCategory").change(function(){
//             $("#updateCategoryName").val($("#selectCategory option:selected").text());
//             catId=$("#selectCategory option:selected").val();
//         });
    
//         $("#selectID").change(function(){
//             catIdDelete=$("#selectCategory option:selected").val();
//         });
    
    
//         $("#updateCategory").click(function(){
    
//             $.ajax({
//             url:"https://localhost:44382/api/categories/"+catId,
//             method:"PUT",
//             headers:"Content-Type:application/json",
//             data:{
//                 "CatagoriesName":$("#updateCategoryName").val()
//             },
//             complete:function(xmlHttp,status){
//                 if(xmlHttp.status==200)
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                     loadDropDown();
//                 }
//                 else
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                 }
//             }
//         });
//         });



//         $("#deleteCategory").click(function(){
    
//             $.ajax({
//             url:"https://localhost:44382/api/categories/"+2,
//             method:"DELETE",
//             headers:"Content-Type:application/json",
//             data: {CatagoriesId:2},
//             complete:function(xmlHttp,status){
//                 console.log(xmLHttp.responseText);
//                 if(xmlHttp.status==200)
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                     loadDropDownDelete();
//                 }
//                 else
//                 {
//                     $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
//                 }
//             }
//         });

//         // $.ajax({
//         //     url: 'https://localhost:44382/api/categories/3',
//         //     type: 'DELETE',
//         //     success: function(result) {
//         //         // Do something with the result
//         //     }
//         // });

//         });


    
//         loadDropDown();
//         loadDropDownDelete();
    
//     });