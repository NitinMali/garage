/**
 * Created by Nitin on 10-10-2015.
 */


garage.controller('filterCtrl', ['$scope', 'dataService', '$rootScope', function ($scope, dataService, $rootScope) {
    $scope.$on('garage-updated', function() {
        $scope.levels = dataService.levels;
        $scope.types = dataService.types;
    });

    $scope.$watch('searchText', function(searchTxt){
        $rootScope.$broadcast('searchingVehicle', {search: searchTxt});
    });

    $scope.applyFilter = function(obj){
        var selectedLevels = [], selectedTypes = [];
        _.each($scope.levels, function(level) {
            if(level.selected) {
                selectedLevels.push(level.no);
            }
        });

        _.each($scope.types, function(type) {
            if(type.selected) {
                selectedTypes.push(type.id);
            }
        });

        $scope.filterSelection = {levels: selectedLevels, types: selectedTypes};
    };

    $scope.$watch('filterSelection', function(filterSelected){
        $rootScope.$broadcast('applyFilter', {filterSelected: filterSelected});
    });
}]);

