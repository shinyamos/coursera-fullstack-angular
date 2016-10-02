(function () {
'use strict';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchMenu = [];
    $scope.feedbackMessage = "";
    $scope.feedbackStyle={};
    $scope.inputFeedbackStyle={};

    $scope.checkMenu = function() {
      var inputMenuText = $scope.lunchMenu;
      if (inputMenuText=="") {
        $scope.feedbackMessage="Please enter data first"
        $scope.feedbackStyle={color:"red"};
        // $scope.inputFeedbackStyle={border: 1px, color:}
      } else {
        // green text for either result, per assignment instructions
        $scope.feedbackStyle={color:"green"};
        var lunchMenu = $scope.lunchMenu.split(",");
        // Count lunch items, ignoring empty or all whitespace values
        var lunchMenuCount = lunchMenu.filter(function(value)
          {return value!= "" && value.trim()!=""}
        ).length;

        var tooMuchFood = (lunchMenuCount > 3);
        if (tooMuchFood) {
          $scope.feedbackMessage="Too Much!";
        } else {
          $scope.feedbackMessage="Enjoy!";
        }
      }
    };
  };

})();
