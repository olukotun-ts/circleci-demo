angular.module('video-player')
.controller('videoPlayerCtrl', function ($scope) {
 // $scope.initialVideo =  exampleVideoData[0];
 this.videoUrl = () => {
    return this.video ? `https://www.youtube.com/embed/${this.video.id.videoId}` : '';
  };
  console.log('inside video-player Controller', $scope);
})
.directive('videoPlayer', function() {
  return {
    scope: {
      video: '<'
    },
    restrict: 'E',
    controller: 'videoPlayerCtrl',
    controllerAs:'ctrl',
    bindToController:true,
    template: `
      <div class="video-player">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" ng-src="{{'https://www.youtube.com/embed/'+ctrl.video.id.videoId}}" allowFullScreen></iframe>
        </div>
        <div class="video-player-details">
          <h3>{{ctrl.video.snippet.title}}</h3>
          <div>{{ctrl.video.snippet.description}}</div>
        </div>
      </div>
    `
  };
});
