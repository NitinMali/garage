/**
 * Created by Nitin on 10-10-2015.
 */


garage.controller('garageCtrl', ['$scope', 'dataService', '$rootScope', '$filter', '$state',
    function ($scope, dataService, $rootScope, $filter, $state) {

    var vehiclesList = [];

    $scope.currentState = $state.current.name;

    dataService.getListOfVehicleParkedInGarage().then(function(vehicleData){
        $scope.vehicles = vehicleData;
        vehiclesList = vehicleData;

        //Pagination
        $scope.currentPage = 0;
        $scope.pageSize = 2;
        $scope.totalPages = Math.ceil($scope.vehicles.length/$scope.pageSize - 1);

        updateRecordCount();

        $scope.nextRecord = function(){
            $scope.currentPage=$scope.currentPage+1;
            updateRecordCount();
        };

        $scope.prevRecord = function(){
            $scope.currentPage=$scope.currentPage-1;
            updateRecordCount();
        };

    });

    function updateRecordCount() {
        $scope.recordsFrom = $scope.currentPage * $scope.pageSize + 1;
        $scope.recordsTill = ($scope.currentPage + 1) * $scope.pageSize;

        if($scope.currentPage === $scope.totalPages) {
            $scope.recordsTill = $scope.vehicles.length;
        }
    }

    $scope.$on('garage-updated', function() {
        $scope.levels = dataService.levels;
        $scope.types = dataService.types;
    });


    $rootScope.$on('searchingVehicle', function(event, arg) {
        $scope.vehicles = $filter('vehicleSearchFilter')(vehiclesList, arg.search);
        $scope.totalPages = Math.ceil($scope.vehicles.length/$scope.pageSize - 1);
        $scope.currentPage = 0;
        updateRecordCount();
        //$scope.searchText = arg.search;
    });

    $rootScope.$on('applyFilter', function(event, arg) {
        $scope.vehicles = $filter('vehicleFilter')(vehiclesList, arg.filterSelected);
        $scope.totalPages = Math.ceil($scope.vehicles.length / $scope.pageSize - 1);
        $scope.currentPage = 0;
        updateRecordCount();
        //$scope.filterSelected = arg.filterSelected;
    });



}]);