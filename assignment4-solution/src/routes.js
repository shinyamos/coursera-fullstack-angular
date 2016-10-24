(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  .state('menuCategoryList', {
    url: '/category-list',
    templateUrl: 'src/templates/categories.template.html',
    // controller: 'CategoryListController as categoryList',
    // resolve: {
    //   menuCategories: ['MenuDataService', function (MenuDataService) {
    //     return MenuDataService.getAllCategories();
    //   }]
    // }
  })
  //
  // .state('menuCategoryList.itemDetail', {
  //   url: '/item-detail/{itemId}',
  //   templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
  //   controller: "ItemDetailController as itemDetail"
  // });

}

})();
