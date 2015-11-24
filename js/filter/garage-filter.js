
/**
 * Created by Nitin on 11-10-2015.
 */

garage.filter('pagination', function(){
        return function(input, startIndex) {
            return input.slice(startIndex);
        }
});


garage.filter('vehicleSearchFilter', function(){
        return function(input,searchKey) {
            if(searchKey) {
                var vehicleList = [];
                _.each(input, function(vehicle) {
                    if(vehicle.reg.indexOf(searchKey) > -1) {
                        vehicleList.push(vehicle);
                    }
                });
                return vehicleList;
            } else {
                return input;
            }

        }
});

garage.filter('vehicleFilter', function(){
    return function(input,selectedFilters) {
        if(selectedFilters) {
            if (selectedFilters.levels.length > 0 || selectedFilters.types.length > 0) {
                var vehicleList = [];
                vehicleList = _.filter(input, function (vehicle) {
                    if (_.contains(selectedFilters.levels, vehicle.levelNo) || _.contains(selectedFilters.types, vehicle.typeId)) {
                        return true;
                    }
                });
                return vehicleList;
            } else {
                return input;
            }
        } else {
            return input;
        }

    }
});