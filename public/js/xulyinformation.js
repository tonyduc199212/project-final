var app = angular.module("showInformation", ['ngCookies']);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });
app.controller('show', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    $scope.send = function () {
        
        var query = {
            day1: $("#date1").val(),
            day2: $("#date2").val()
        }
        console.log(query.day1);
        console.log(query.day2);
        $http({
            method: "POST",
            url: "http://localhost:3000/api/information",
            data: query
            // headers: {'x-access-token': $cookies.get('x-access-token') }
        }).then(function mySuccess(response) {
            console.log(response.data);
            $scope.datas = response.data;
        }, function myError(response) {
            console.log(response.statusText);
        });
    };
    function subDate(dateOjb, numday){
        dateOjb.setDate(dateOjb.getDate()-numday);
        dateOjb.setMilliseconds(0) ;
       // console.log();
        return dateOjb;
    }

    $scope.date2 = subDate(new Date(),0);
    $scope.date1 = subDate(new Date(),1);
    
    $scope.sortColumn = 'MAC';
    $scope.reverse = false;
    $scope.sortData = function(column){
        if($scope.sortColumn == column){
            $scope.reverse = !$scope.reverse;
        }else{
            $scope.reverse = false;
        }
        $scope.sortColumn = column;
    };
    $scope.getSortClass = function (column){
        if($scope.sortColumn == column){
            return $scope.reverse?'arrow-up':'arrow-down';
        }
    };
    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };
}]);





