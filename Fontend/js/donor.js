
   contactUsLoad();
$(document).ready(function(){

    function hideShow(){
        $("#loadInfoDonor").hide();;
    }
 
    hideShow();
   
});



function contactUsLoad(){

    $.ajax({
        url:"http://localhost:4747/api/donotList",
        method:"GET",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;
                console.log(data);
                if(data != null){    
                    for (var i = 0; i < data.length; i++) {     
                        str+="<tr><td>"+data[i].Email
                        +"</td><td>"+data[i].Name
                        +'</td><td><button onclick="donorInfo(this)" class="btn postUpdateBtn btn-info" value="'+data[i].userId+'">About</button>'
                        +"</td></tr>";
                        
                    }
                
                    $("#tbDonorList tbody").html(str);
            }else{
                $("#serachErrorReports").html("User Not Found!");
            }

            }
        }
    });
    $("#loadInfoDonor").show();
    $("#DonorList").hide();
}

function donorInfo(element) {


    $("#loadInfoDonor").show();
    $("#DonorList").hide();
    $.ajax({
        
        url:"http://localhost:4747/api/donotList/"+element.value,
        method:"GET",

        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                var str='';
                var data=xmlHttp.responseJSON;
                if(data != null){    
                    for (var i = 0; i < data.length; i++) {   
                            str+="<tr><td>Name: "
                            +data[0].Name
                            +"</td></tr><td>Email: "+data[0].Email
                            +"</td><tr><td>Phone: "+data[0].Phone
                            +"</td><tr><td>Address: "+data[0].Address
                            +"</td></tr><td>DOB: "+data[0].DOB
                            +"</td><tr><td>isVerified: "+data[0].isVerified
                            +'</td><tr><td><button onclick="verifyDonarId(this)" class="btn postUpdateBtn btn-info" value="'+data[i].userId+'">Verify</button>'
                            +'</td><tr><td><iframe src="../doc/'+data[0].Docoment+'" width="650" height="750">'
                            +"</td></tr>";
                        
                    }
                
                    $("#tblDonorInfoForVerify tbody").html(str);
                   // window.location.href = "verifyDonor.html";
            }
            }
        }
    });

    // console.log(element.value);
    // return true;
   
}

function verifyDonarId(element) {
    if (confirm('Do you want to Verify?')) {
        $.ajax({
        
            url:"http://localhost:4747/api/varifiedAcountDonor/"+element.value,
            method:"POST",
    
            complete:function(xmlHttp,status){
                    var data=xmlHttp.responseJSON;
                    console.log(xmlHttp);
                    if(data == "OK"){ 
                        donorInfo(element);
                }
                
            }
        });
    
    }


    
}