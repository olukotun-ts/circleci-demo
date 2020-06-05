angular.module('video-player')
.controller('appController', function(youTube) {
  this.searchService = youTube;
  this.searchResults = (data) => {
    this.appVideos = data;
    this.currentVideo = this.appVideos[0];
  };
  this.selectVideo = (video) => {
    this.currentVideo = video;
  };

  youTube.search('AngularJS tutorial', this.searchResults);
  console.log('From inside appController:', this);
})
.directive('app', function() {
  return {
    restrict: 'E',
    controller: 'appController',
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div id="app container">
        <nav class="navbar">
          <div class="col-md-6 col-md-offset-3">
            <search service="ctrl.searchService" result="ctrl.searchResults"><h5><em>search</em> component goes here</h5></search>
          </div>
        </nav>
        <div class="row">
          <div class="col-md-7">
            <video-player video="ctrl.currentVideo"/>
          </div>
          <div class="col-md-5">
            <video-list videos="ctrl.appVideos" on-click="ctrl.selectVideo"/>
          </div>
        <div>
      </div>
    `
  };
});

            // <video-list ng-controller="videoListCtrl" ><h5><em>videoList</em> component goes here</h5></video-list>