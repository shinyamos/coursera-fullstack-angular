(function () {
'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .controller('ToBuyController', ToBuyController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {
    var boughtItemTracker = this;
    boughtItemTracker.alreadyBoughtList = ShoppingListCheckOffService.getBoughtItems();
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
    var itemBuyer = this;
    itemBuyer.toBuyList = ShoppingListCheckOffService.getItemsToBuy();
    itemBuyer.itemsToBuy = function () {
      ShoppingListCheckOffService.getItems()
    };
    itemBuyer.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var itemsToBuy = toBuyList;
    var boughtItems = [];

    service.buyItem = function (itemIndex) {
      var item = {
        name: itemsToBuy[itemIndex].name,
        quantity: itemsToBuy[itemIndex].quantity
      };
      itemsToBuy.splice(itemIndex,1);
      boughtItems.push(item);
    };

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };
    service.getBoughtItems = function() {
      return boughtItems;
    };
  }

  var toBuyList = [
    { name: "Milk",quantity: "2"},
    { name: "Donuts", quantity:"3"},
    { name: "Cookies", quantity:"5"},
    { name: "Apples", quantity:"7"},
    { name: "Bialys", quantity:"4"},
    { name: "Cheese sticks", quantity:"6"}
  ];
})();
