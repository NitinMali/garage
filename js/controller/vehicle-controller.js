/**
 * Created by Nitin on 10-10-2015.
 */

garage.controller('vehicleCtrl', ['$scope', 'dataService', '$stateParams', '$state',
    function ($scope, dataService, $stateParams, $state) {

    $scope.vehicleDetails = {};

    $scope.$state = $state;

    $scope.levels = dataService.getAvailableLevelsForParking();
    $scope.types = dataService.types;

    if($stateParams.vehicleId!=='new') {
            $scope.vehicleDetails = dataService.getVehicleDetails(parseInt($stateParams.vehicleId));
            $scope.currentParking = {level: $scope.vehicleDetails.levelNo, slot: $scope.vehicleDetails.slot};
    }


    $scope.updateVehicle = function() {
        dataService.getIndexOfDuplicateRegisteration($scope.vehicleDetails.reg).then(function(vehicleIndex){
            $scope.vehicleDetails.slot = parseInt($scope.vehicleDetails.slot);
            $scope.vehicleDetails.typeId = parseInt($scope.vehicleDetails.typeId);

            if($stateParams.vehicleId!=='new') {
                if(vehicleIndex === parseInt($stateParams.vehicleId) || vehicleIndex === -1) {
                    dataService.vehiclesParked[$stateParams.vehicleId] = $scope.vehicleDetails;
                    $state.go('/');
                } else {
                    $scope.notification = 'Duplicate Vehicle';
                }

            } else {
                if(vehicleIndex=== -1) {
                    dataService.vehiclesParked.unshift($scope.vehicleDetails);
                    $state.go('/');
                } else {
                    $scope.notification = 'Duplicate Vehicle';
                }

            }
        });


    };

    function getUpdatedSlots(){
        var availableSlots = dataService.getAvailableSlotsForLevel($scope.vehicleDetails.levelNo);
        return availableSlots;
    }


    $scope.exitVehicle = function(){
        dataService.vehiclesParked.splice($stateParams.vehicleId, 1);
        $state.go('/');
    };


    $scope.$watch('vehicleDetails.levelNo', function(level){
        $scope.vehicleDetails.levelNo = parseInt(level);
        $scope.slots = getUpdatedSlots();
    }, true);


}]);