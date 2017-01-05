angular.module("ctrls",["sevices"])
    .controller("index",["$scope","$http","indexDate",function($scope,$http,indexDate){
        indexDate.then(function(data){
            // console.log(data);
            $scope.data=data.data
        });
    }])
    .controller("list",["$scope","$http","listDate",function($scope,$http,indexDate){
        indexDate.then(function(data){
            // console.log(data);
            $scope.data=data.data
        });
    }])
    .controller("show",["$scope","$http","showDate",function($scope,$http,indexDate){
        indexDate.then(function(data){
            // console.log(data);
            $scope.data=data.data
        });
    }])