var context = document.getElementById("canvas").getContext("2d");

var image = new Image();
image.src = 'monks.jpg';
image.addEventListener('load', service.draw, false);

var board = document.getElementById('canvas').width; // geting the canvas size to draw the image
var tiles = document.getElementById('scale').value; //getting the value for tiles

var size = board/tiles;

var emptyLocation = new Object; // empty tyle location
emptyLocation.x = 0;
emptyLocation.y = 0;

var clickLocation = new Object; // click location
clickLocation.x = 0;
clickLocation.y = 0;

var solved = false // initial state of the puzzle

console.log('Boarsize: ', board, ' tiles: ', tiles, ' size: ', size)

var parts = new Object;

service.boardSet();

document.getElementById('scale').onchange = function() {
    tiles = this.value;
    size = board / tiles;
    service.boardSet();
    service.draw();
};

document.getElementById('canvas').onclick = function(e) {
    clickLocation.x = Math.floor((e.pageX - this.offsetLeft) / size);
    clickLocation.y = Math.floor((e.pageY - this.offsetTop) / size);
    if (service.distance(clickLocation.x, clickLocation.y, emptyLocation.x, emptyLocation.y) == 1) {
        service.slide(emptyLocation, clickLocation);
        service.draw();
    }
    if (solved) {
        setTimeout(function() {
         window.open('https://s-media-cache-ak0.pinimg.com/564x/72/5d/29/725d29ab0d189c2220a8c398af687871.jpg', '_blank', 'toolbar=0,location=0,menubar=0');
    }, 500);
  }
};




