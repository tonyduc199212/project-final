
var app = angular.module("showDevice", []);
app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.controller('show', ['$scope', '$http', '$document', function ($scope, $http, $document) {


  // document.getElementById('name').innerHTML += `<br> hello`;
  // document.getElementById('name').innerHTML += `<br> hello1`;
  // document.getElementById('name').innerHTML += `<br> hello2`;
  // document.getElementById('name').innerHTML += `<br> hello3`;
  // document.getElementById('name').innerHTML += `<br> hello4`;
  // document.getElementById('name').innerHTML += `<br> hello5`;


  function subDate(dateOjb, numhours) {
    dateOjb.setMinutes(dateOjb.getMinutes() - numhours);
    dateOjb.setMilliseconds(0);
    return dateOjb;
  }
  function changeDate(dateOjb) {
    var dt = new Date(dateOjb);
    var date = (dt.getDate() - 0);
    var month = (dt.getMonth() - 0);
    var year = (dt.getFullYear() - 0);
    var hour = (dt.getHours() - 0);
    var miunute = (dt.getMinutes() - 0); 
    var second = (dt.getSeconds() - 0);
    var strDate = date+"/"+month+"/"+year + " " + hour+":"+miunute+":"+second;
    return strDate;
  }

  $http({
    method: "POST",
    url: "http://localhost:3000/api/information",
    data: {
      day1: subDate(new Date(), 360),
      day2: new Date()
    }
  }).then(function mySuccess(response) {
    if(response.data.length >0){
     document.getElementById('name').innerHTML ="";
      response.data.forEach(function(element) {
        document.getElementById('name').innerHTML +=changeDate(element.createdDate)+" - "+ element.MAC + " - "+element.IP + " - "+element.fail+" - "+element.name+" - "+element.location+`<br>`;
      });
    }else{
      document.getElementById('name').innerHTML ="No problem";
    }
  }, function myError(response) {
    console.log(response.statusText);
  });

  var myVar = setInterval(myFunction, 60000)
  function myFunction(){
    $http({
      method: "POST",
      url: "http://localhost:3000/api/information",
      data: {
        day1: subDate(new Date(), 1),
        day2: new Date()
      }
    }).then(function mySuccess(response) {
      if(response.data.length >0){
        response.data.forEach(function(element) {
          document.getElementById('name').innerHTML += changeDate(element.createdDate)+" - "+ element.MAC + " - "+element.IP + " - "+element.fail+" - "+element.name+" - "+element.location+`<br>`;
        });
      }
    }, function myError(response) {
      console.log(response.statusText);
    });
  }
}]);
