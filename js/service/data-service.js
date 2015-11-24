/**
 * Created by Nitin on 10-10-2015.
 */

garage.service('dataService', ['$q', '$rootScope', function ($q, $rootScope) {

    var levels = [{no: 1, totalSlots:5, available:5}, {no: 2, totalSlots:4, available:4},
        {no: 3, totalSlots:2, available:2}, {no: 4, totalSlots:3, available:3},
        {no: 5, totalSlots:2, available:2}];

    var types = [{id: 1, name:'Car', counter: 0}, {id: 2, name: 'Motorbike', counter: 0}];

    var vehiclesParked = [
        {
            reg: 'KA 04',
            typeId: 1,
            levelNo: 1,
            slot: 3
        },
        {
            reg: 'KA 13, ASWE',
            typeId: 1,
            levelNo: 2,
            slot: 2
        },
        {
            reg: 'KA 22, ASWE',
            typeId: 2,
            levelNo: 2,
            slot: 4
        },
        {
            reg: 'KA 23, ASWE',
            typeId: 1,
            levelNo: 3,
            slot: 1
        },
        {
            reg: 'KA 43, ASWE',
            typeId: 1,
            levelNo: 1,
            slot: 1
        }];

    function updateGarageInformation(vehicles){
        var deferred = $q.defer();

        _.each(data.types, function(type){
            type.counter = 0;
        });

        _.each(data.levels, function(level){
            level.available = level.totalSlots;
        });

        _.each(vehicles, function(vehicle){
            vehicle.typeId = parseInt(vehicle.typeId);
            vehicle.type = _.findWhere(data.types, {id: vehicle.typeId});

            var typeIndex = _.findIndex(data.types, {id: vehicle.typeId});
            data.types[typeIndex].counter++;

            vehicle.levelNo = parseInt(vehicle.levelNo);
            vehicle.level = _.findWhere(data.levels, {no: vehicle.levelNo});

            if(vehicle.level) {
               var levelIndex = _.findIndex(data.levels, {no: vehicle.levelNo});
               //vehicle.slot = data.levels[levelIndex].available;
               data.levels[levelIndex].available--;
            }
        });

        deferred.resolve(vehicles);

        $rootScope.$broadcast('garage-updated');

        return deferred.promise;
    }

    var data = {levels: levels, types: types, vehiclesParked: vehiclesParked};

    data.getListOfVehicleParkedInGarage = function () {
        return updateGarageInformation(data.vehiclesParked).then(function(vehicleData){
            return vehicleData;
        });
    };

    data.assignParking = function (vehicle) {
        var vehicleList = [];
        vehicleList.push(vehicle);
        return updateGarageInformation(vehicleList).then(function(vehicleData){
            return vehicleData;
        });
    };

    data.getAvailableLevelsForParking = function(){
        return _.filter(data.levels, function(level){ return level.available!==0; });
    };

    data.getAvailableSlotsForLevel = function(selectedLevel){
        var emptySlots = [];
        var selectedLevelDetails = _.findWhere(data.levels, {no:selectedLevel});
        for(var i= 1; i <= selectedLevelDetails.totalSlots; i++){
            emptySlots.push(i);
        }
        var vehiclesParkedInSelectedLevel = _.filter(data.vehiclesParked, {levelNo:selectedLevel});

        _.each(vehiclesParkedInSelectedLevel, function(vehicle){
            emptySlots = _.without(emptySlots,vehicle.slot);
        });

        return emptySlots;
    };

    data.getIndexOfDuplicateRegisteration = function(reg){
        var deferred = $q.defer();
        deferred.resolve(_.findIndex(data.vehiclesParked, {reg:reg}));
        return deferred.promise;
    };

    data.getVehicleDetails = function(indexId){
        return {
            reg: data.vehiclesParked[indexId].reg,
            typeId: data.vehiclesParked[indexId].typeId,
            levelNo: data.vehiclesParked[indexId].levelNo,
            slot: data.vehiclesParked[indexId].slot
        };
    };


    return data;
}]);
