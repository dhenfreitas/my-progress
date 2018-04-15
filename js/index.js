// Settings

var svgWidth = 100; // must match viewBox in HTML
var svgHeight = 50;
var animationSpeed = 120; // speed in ms

// 0 = go to edge
// higher = points stay further from edge
// max: width/2 or height/2
var horizontalEdgePadding = 0;
var verticalEdgePadding = 0;

// higher = points stay further from center
// 0 = points may touch
// max: width/2 or height/2
var horizontalCenterPadding = 20;
var verticalCenterPadding = 5;

var menuPositions = [{ left: '50%', top: '26.5%', width: '15%', height: '8%' }, { left: '51%', top: '32.4%', width: '15%', height: '8%' }, { left: '46%', top: '38%', width: '24%', height: '8%' }, { left: '43%', top: '43.3%', width: '20%', height: '8%' }, { left: '45.5%', top: '50%', width: '20%', height: '8%' }, { left: '39%', top: '55.2%', width: '32%', height: '7%' }, { left: '40%', top: '61%', width: '20%', height: '8%' }, { left: '42.5%', top: '66.6%', width: '20%', height: '8%' }, { left: '41.25%', top: '72%', width: '20%', height: '8%' }];

// Animation

var currentMenuItem = 0;

var centerX = svgWidth / 2;
var centerY = svgHeight / 2;
var w = centerX - horizontalCenterPadding - horizontalEdgePadding;
var h = centerY - verticalCenterPadding - verticalEdgePadding;

var selector = Snap('.selector');
var red = selector.select('.red');
var blue = selector.select('.blue');

var animate = function animate() {
  [red, blue].forEach(function (layer) {
    layer.animate({
      points: [
      // x1, y1
      Math.random() * w + horizontalEdgePadding, Math.random() * h + verticalEdgePadding,
      // x2, y2
      Math.random() * w + centerX + horizontalCenterPadding, Math.random() * h + verticalEdgePadding,
      // x3, y3
      Math.random() * w + centerX + horizontalCenterPadding, Math.random() * h + centerY + verticalCenterPadding,
      // x4, y4
      Math.random() * w + horizontalEdgePadding, Math.random() * h + centerY + verticalCenterPadding]
    }, animationSpeed);
  });
};

var keydownHandler = function keydownHandler(e) {
  function moveDown() {
    currentMenuItem++;
    if (currentMenuItem > menuPositions.length - 1) {
      currentMenuItem = menuPositions.length - 1;
    }
    moveCursor();
  }

  function moveUp() {
    currentMenuItem--;
    if (currentMenuItem < 0) {
      currentMenuItem = 0;
    }
    moveCursor();
  }

  switch (e.keyCode) {
    case 38:
      moveUp();
      e.preventDefault();
      break;
    case 40:
      moveDown();
      e.preventDefault();
      break;
  }
};

var moveCursor = function moveCursor() {
  var cursor = document.querySelector('.selector');
  cursor.style.left = menuPositions[currentMenuItem].left;
  cursor.style.top = menuPositions[currentMenuItem].top;
  cursor.style.width = menuPositions[currentMenuItem].width;
  cursor.style.height = menuPositions[currentMenuItem].height;
};

// Show me your true form!

document.addEventListener('keydown', keydownHandler);
setInterval(animate, animationSpeed);
