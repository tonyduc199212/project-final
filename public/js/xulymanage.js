var app = angular.module("showDevice",[]);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });
app.controller('abc',['$scope','$http',function($scope,$http){
   
    $http({
        method : "PUT",
        url : "http://localhost:3000/api/device"
    }).then(function mySuccess(response) {
        $scope.devices = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
    setTimeout(myFun,100);
    function myFun(){
        $http({
            method : "PUT",
            url : "http://localhost:3000/api/manage"    
        }).then(function mySuccess(response) {
            var arr = response.data;
            var arrDevives = $scope.devices;
            arr.forEach(function(item){
                function findDevice(device) { 
                    return device._id === item._id;
                }
                var num = arrDevives.findIndex(findDevice);
                console.log(num);
                $("#"+num).hide();
                $("."+num).show();
            })
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    $scope.sendDevice = function(device,index){
         $("#"+index).hide();
         $("."+index).show();
       // var myVar = setInterval(myFunction, 60000);
    //    myFunction;  
    //     function myFunction(){
        console.log($scope.devices);
            $http({
                method : "POST",
                url : "http://localhost:3000/api/manage/add",
                data: device
            }).then(function mySuccess(response) {
                // if(response.data.fail===0){
                //     $("#listMessages").append("<div class='ms'>" + response.data.MAC + " ("+response.data.IP+" - "+Date(response.data.createDate)+") : alive "+"</div>");
                // }else{
                //     $("#listMessages").append("<div class='ms' style='color: red'>" + response.data.MAC + " ("+response.data.IP+" - "+Date(response.data.createDate)+") : fail: "+ response.data.fail+" goi tin" +"</div>");
                // }
                console.log(response.data);
            }, function myError(response) {
                console.log(response.statusText);
            });
        // }
        //device.bien = myVar;    
    }
    $scope.cancelDevice = function(device,index){
        // $("."+index).prop('disabled', true);
        // $("#"+index).prop('disabled', false);
        $("#"+index).show();
        $("."+index).hide();

        $http({
            method : "POST",
            url : "http://localhost:3000/api/manage/remove",
            data: device
        }).then(function mySuccess(response) {
            console.log(response.data);
        }, function myError(response) {
            console.log(response.statusText);
        });


      //  clearInterval(device.bien);
    }
}]);
