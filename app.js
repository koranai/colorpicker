var module = angular.module('app', ['ngRoute']);

// routing
module.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/note/',{templateUrl: 'note.html'})
  // .when('/pick/',{templateUrl: 'pick.html'})
  .otherwise({redirectTo: '/note'});
}]);
// service
angular.module('app').service('sharedObjects',function(){
  this.colors = [];
});
// note
module.controller('NoteController',['$scope','$location','sharedObjects',function($scope,$location,sharedObjects){
  $scope.colors = [];
  $scope.colors = sharedObjects.colors;
  if($scope.colors.length == 0){
    $scope.colors.push({color:"#cccccc"});
  }
  $scope.show_index = -1;
  $scope.edit = function(index){
    $scope.show_index = index;
  }
  $scope.hide = function(){
    $scope.show_index = -1;
  }
  $scope.item_delete = function(index){
    $scope.colors.splice(index,1);
  }
  $scope.toPick = function(){
    $location.path('/pick/');
  }
  $scope.add = function(){
    $scope.colors.push({color:"#cccccc"});
  }
}]);
// picker
module.controller('pickerController',['$scope','$location','sharedObjects',function($scope,$location,sharedObjects){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var image = document.createElement("img");
  var imgSrc = document.getElementById("fileField").value;

  getImage();
  var file = document.getElementById('fileField');
  file.onchange = function(e){
    var file = e.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function(){
      imgSrc = reader.result;
      getImage();
    }
  }

  $scope.pickedes = [];
  function getImage() {
      canvas.style = "";
      var no_image = document.getElementById('no_image');
      if(no_image != null){
        no_image.remove();
      }
      if (imgSrc == "") {
          // canvas.style = "dispaly:none";
          // var p = document.createElement('p');
          // p.id = "no_image";
          // p.innerText = "no image.";
          // var bodyNode = document.getElementsByTagName('body').item(0);
          // bodyNode.insertBefore(p,document.getElementById('file_input_div').nextSibling);
          // imgSrc = "fire.png";     // Get first example
      }
  
      image.src = imgSrc;
  
    //image.complete
      image.addEventListener("load", function () {
          var dimension = 380; // Deep dimensions reasonable.
          var dw;
          var dh;
  
          // set max dimension
          if ((image.width > dimension) || (image.height > dimension)) {
            if (image.width > image.height) {
              dw = parseInt(image.width * (dimension / image.width));
              dh = parseInt(image.height * (dimension / image.width));
            } else {
              dh = parseInt(image.height * (dimension / image.height))
              dw = parseInt(image.width * (dimension / image.height));
            }
            canvas.width = dw;
            canvas.height = dh;
          }
          else {
  
            canvas.width = image.width;
            canvas.height = image.height;
            dw = image.width;
            dh = image.height;
          }
          ctx.drawImage(image, 0, 0, dw, dh);
      }, false);
  }
  canvas.onclick = function (evt) {
    var mouseX = parseInt(evt.offsetX);
    var mouseY = parseInt(evt.offsetY);

    var imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imagedata.data;  
    var i = ((mouseY * canvas.width) + mouseX) * 4;

    //  get RGBA values
    var r = data[i];        
    var g = data[i+1];
    var b = data[i+2];
    var a = data[i+3];
    var rgba = "background-color:rgba(" + r + "," + g + "," + b + "," + a + ")";
    var hex_color = rgbToHex(r,g,b);
    console.log('r',r);
    console.log('g',g);
    console.log('b',b);
    console.log(hex_color);
    $scope.pickedes.push({back_ground_color:rgba,a:a,color:hex_color,});
    $scope.$apply();
  }

  $scope.toNote = function(){
    sharedObjects.colors = sharedObjects.colors.concat($scope.pickedes);
    $location.path('/note');
    $scope.pickedes = [];
  }
}]);

function rgbToHex(r,g,b){
  r = paddingZero(r.toString(16));
  g = paddingZero(g.toString(16));
  b = paddingZero(b.toString(16));
  return "#" + r + g + b;
}
function paddingZero(str){
  if(str.length == 1){
    return "0" + str;
  }
  return str;
}var module = angular.module('app', ['ngRoute']);

// routing
module.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/note/',{templateUrl: 'note.html'})
  // .when('/pick/',{templateUrl: 'pick.html'})
  .otherwise({redirectTo: '/note'});
}]);
// service
angular.module('app').service('sharedObjects',function(){
  this.colors = [];
});
// note
module.controller('NoteController',['$scope','$location','sharedObjects',function($scope,$location,sharedObjects){
  $scope.colors = [];
  $scope.colors = sharedObjects.colors;
  if($scope.colors.length == 0){
    $scope.colors.push({color:"#cccccc"});
  }
  $scope.show_index = -1;
  $scope.edit = function(index){
    if($scope.show_index == -1){
        $scope.show_index = index;
    }else{
        $scope.show_index = -1;
    }
  }
  $scope.hide = function(){
    $scope.show_index = -1;
  }
  $scope.item_delete = function(index){
    $scope.colors.splice(index,1);
  }
  $scope.toPick = function(){
    $location.path('/pick/');
  }
  $scope.add = function(){
    $scope.colors.push({color:"#cccccc"});
  }
}]);
// picker
module.controller('pickerController',['$scope','$location','sharedObjects',function($scope,$location,sharedObjects){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var image = document.createElement("img");
  var imgSrc = document.getElementById("fileField").value;

  getImage();
  var file = document.getElementById('fileField');
  file.onchange = function(e){
    var file = e.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function(){
      imgSrc = reader.result;
      getImage();
    }
  }

  $scope.pickedes = [];
  function getImage() {
      canvas.style = "";
      var no_image = document.getElementById('no_image');
      if(no_image != null){
        no_image.remove();
      }
      if (imgSrc == "") {
          // canvas.style = "dispaly:none";
          // var p = document.createElement('p');
          // p.id = "no_image";
          // p.innerText = "no image.";
          // var bodyNode = document.getElementsByTagName('body').item(0);
          // bodyNode.insertBefore(p,document.getElementById('file_input_div').nextSibling);
          // imgSrc = "fire.png";     // Get first example
      }
  
      image.src = imgSrc;
  
    //image.complete
      image.addEventListener("load", function () {
          var dimension = 380; // Deep dimensions reasonable.
          var dw;
          var dh;
  
          // set max dimension
          if ((image.width > dimension) || (image.height > dimension)) {
            if (image.width > image.height) {
              dw = parseInt(image.width * (dimension / image.width));
              dh = parseInt(image.height * (dimension / image.width));
            } else {
              dh = parseInt(image.height * (dimension / image.height))
              dw = parseInt(image.width * (dimension / image.height));
            }
            canvas.width = dw;
            canvas.height = dh;
          }
          else {
  
            canvas.width = image.width;
            canvas.height = image.height;
            dw = image.width;
            dh = image.height;
          }
          ctx.drawImage(image, 0, 0, dw, dh);
      }, false);
  }
  canvas.onclick = function (evt) {
    var mouseX = parseInt(evt.offsetX);
    var mouseY = parseInt(evt.offsetY);

    var imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imagedata.data;  
    var i = ((mouseY * canvas.width) + mouseX) * 4;

    //  get RGBA values
    var r = data[i];        
    var g = data[i+1];
    var b = data[i+2];
    var a = data[i+3];
    var rgba = "background-color:rgba(" + r + "," + g + "," + b + "," + a + ")";
    var hex_color = rgbToHex(r,g,b);
    $scope.pickedes.push({back_ground_color:rgba,a:a,color:hex_color});      
    $scope.$apply();
  }
  $scope.toNote = function(){
    sharedObjects.colors = sharedObjects.colors.concat($scope.pickedes);
    $location.path('/note');
    $scope.pickedes = [];
  }
}]);

function rgbToHex(r,g,b){
  r = paddingZero(r.toString(16));
  g = paddingZero(g.toString(16));
  b = paddingZero(b.toString(16));
  return "#" + r + g + b; 
}
function paddingZero(str){
  if(str.length == 1){
    return "0" + str;
  }
  return str;
}
