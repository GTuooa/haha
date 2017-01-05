angular.module("myapp",[]).controller("phone",["$scope","$http","$filter",function ($scope,$http,$filter) {
    $http({url:"/ajax"}).then(function(data){
        var data=data.data;
        var arr=[];
        for(var i=0;i<data.length;i++){
            var current=[];
            for(var j=1;j<data.length;j++){
                if((data[i].en==data[j].en)&&!data[j].flag){
                    data[j].flag=true;
                    current.push(data[i]);
                    current.en=data[i].en
                }
            }
            if(current.length>0) {
                arr.push(current);
                var arr=$filter("orderBy")(arr,"en")
            }
        }
        $scope.data=arr;
        console.log($scope.data);

        $scope.type="";
        var right=document.querySelector(".en");
        $scope.filter=function(en){
            right.style.display="none";
            $scope.type=en;
        }
        $scope.show=function(){
            right.style.display="block";
            $scope.type="";
        }
    })
}])