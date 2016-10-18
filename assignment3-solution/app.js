(function() {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items:'<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

NarrowItDownController.$inject=['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  $scope.searchTerm = "";
  var list = this;
  list.found = MenuSearchService.getFound();
  list.myTitle = "Yummy options"

  list.narrowItDown = function () {
    MenuSearchService.getMatchedMenuItems($scope.searchTerm);
  }
  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
  }
};

MenuSearchService.$inject = ['$q', '$http', 'ApiBasePath'];
function MenuSearchService($q, $http, ApiBasePath) {
  var service = this;
  service.found = [];
  service.getFound = function () {
    return service.found;
  }

  service.getMatchedMenuItems = function (searchTerm) {
    var deferred = $q.defer();
    var promise = service.getAllMenuItems();
    service.found = [];
    promise.then(function (response) {
      var menuItems = response.data.menu_items;
      var lCaseSearchTerm = searchTerm.toLowerCase();
      // console.log (response.data.menu_items);
      for (var i=0; i< menuItems.length; i++) {
        var item = menuItems[i];
        if (item.description.toLowerCase().indexOf(lCaseSearchTerm) >= 0) {
          service.found.push(item);
        }
      }
      console.log(service.found.length);
      deferred.resolve(service.found);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
      result.message = "Stay away from cookies, Yaakov!";
      deferred.reject(result);
    });
    return deferred.promise;
  };
  service.getAllMenuItems = function() {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };
};
})();
