angular.module('video-player')
// .controller('videoListCtrl', function ($scope) {
//   $scope.videos =  exampleVideoData;
// })
.directive('videoList', function() {
  return {
    scope: {
      videos:'<',
      onClick: '<'
    },
    controller: function($scope){
      console.log('Videos inside videoList:', $scope);
    },
    controllerAs:'ctrl',
    bindToController:true,
    template:`
      <ul class="video-list">
        <video-list-entry ng-repeat="videoItem in ctrl.videos" video="videoItem" on-click="ctrl.onClick"/>
      </ul>
    `
  };
});
