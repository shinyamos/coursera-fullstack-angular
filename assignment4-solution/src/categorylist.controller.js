(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryListController', CategoryListController);

CategoryListController.$inject = ['menuCategories'];
function CategoryListController(menuCategories) {
  var categoryList = this;
  console.log("Controller injected with " + menuCategories);
  categoryList.items = menuCategories;
}

})();
