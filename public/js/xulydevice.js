
$(document).ready(function(){ 
    $("#err").hide();
    var arr = [];
    var query = {};    
    $.ajax({
        url: "http://localhost:3000/api/device",
        type: 'PUT',
        data: query,
        success: function(data) {
            // Do something with the result
            if(data){   
                for (var i = 0;i<data.length;i++){
                    arr.push(data[i]);                    
                }
                show_list();
            }                
        },
        error: function(data){
            console.log(data);
        }
    });
    
    function clear_form(){
        $("#_id").val("");
        $("#name").val("");
        $("#location").val("");
        $("#IP").val("");
    };
    function reset(){
        $("#_id").prop('disabled', false);
        $("#_id").val("");
        $("#IP").val("");        
        $("#name").val("");
        $("#location").val("");        
        $('select option[value="-1"]').prop("selected","selected");  
        
    }
    function show(){
        
        var i=Number($("select[name='listDevice']").val());
        if(i<0) {
            reset();
            
            return; 
        }        
        $("#_id").val(arr[i]._id);
        $("#name").val(arr[i].name);
        $("#IP").val(arr[i].IP);
        $("#location").val(arr[i].location);        
    }
    function show_list(){
        $("#listDevice").html("");
        $("#listDevice").append($('<option>',{
             value: -1,
             text: "Select Device"
         }));
        console.log(arr);
        for (var i = 0;i<arr.length;i++){
            $("#listDevice").append($('<option>',{
                value: i,
                text: arr[i]._id +"  ( "+arr[i].name+"---"+arr[i].IP+" )"
            })); 
           // console.log(arr[0]);
        }
        reset();    
        
    }
    $("#listDevice").change(function(){
        show();
        if(Number($("select[name='listDevice']").val())>=0)
            $("#_id").prop('disabled', true);
        
    })
    $("#btn_clear").click(function(){
        reset();
        
    })
    $("#btn_add").click(function(){  
        var infor = {
            _id : $("#_id").val().toUpperCase().trim(),
            IP : $("#IP").val().trim(),
            name : $("#name").val().trim(),
            location:  $("#location").val().trim(),
        };        
        $.post("http://localhost:3000/api/device", infor ,function(data){
            clear_form();            
            arr.push(data);
            show_list();
           // console.log(arr);    
            alert("them thanh cong")    ;   
          //  $("#idname").prop('disabled', true);
        }).fail(function(response) {
            $("#err").show();
            console.log(response.responseJSON.message);
            $("#err").html(response.responseJSON.message);
        });
        
    })

    $("#btn_update").click(function(){
        var infor = {
            _id : $("#_id").val().toUpperCase().trim(),
            IP : $("#IP").val().trim(),
            name : $("#name").val().trim(),
            location:  $("#location").val().trim(),
        };   
        $.post("http://localhost:3000/api/device/" + $("#_id").val().toUpperCase().trim(),infor ,function(data){                
            if(data){
               // console.log(data)   ; 
                arr[Number($("select[name='listDevice']").val())]= infor;
                show_list();
                alert("update thanh cong")    ; 
            }else
                alert("update loi");            
        }).fail(function(response) {
            alert("have error");
        });
    })

    $("#btn_find").click(function(){
        
        $.get("http://localhost:3000/api/device/" + $("#_id").val().toUpperCase(),function(data){
            if(data){
              //  console.log(data)   ; 
                $("#IP").val(data.IP);
                $("#name").val(data.name);
                $("#location").val(data.location);    
                
            }else
                alert("tim khong thay");            
        }).fail(function(response) {
            alert("have error");
        });
    })

    $("#btn_delete").click(function(){              
        $.ajax({
            url: "http://localhost:3000/api/device/" + $("#_id").val().toUpperCase(),
            type: 'DELETE',
            success: function(data) {
                // Do something with the result
                if(data){   
                    clear_form();  
                  //  console.log(arr);
                  arr = [];
                  $.ajax({
                    url: "http://localhost:3000/api/device",
                    type: 'PUT',
                    data: query,
                    success: function(data) {
                        // Do something with the result
                        if(data){   
                            for (var i = 0;i<data.length;i++){
                                arr.push(data[i]);                    
                            }
                            show_list();
                        }                
                    },
                    error: function(data){
                        console.log(data);
                    }
                });
                    alert("xoa thanh cong")    ; 
                }else
                    alert("xoa loi");                
            },
            error: function(data){
                console.log(data);
            }
        });
    })

    
})

