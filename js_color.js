var lvl = 6;
var pickedColor;
var color = [];
var squares = document.querySelectorAll(".square");
var rgb = document.querySelector("#rgb");
var stat = document.querySelector("#status");
var newColors = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

init();

function init() {
  modeButton();
  squareColors();
  resetColors();
}

newColors.addEventListener("click", function () {
  resetColors();
});

function changeColors() {
  //loop trough all squares
  for (var i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = pickedColor;
  }
  //change h1 color too
  document.querySelector("h1").style.backgroundColor = pickedColor;
}

function pickColor() {
  var random = Math.floor(Math.random() * color.length);
  return color[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num rand colors to array
  for (var j = 0; j < num; j++) {
    arr[j] = randomColor();
  }
  //return that array
  return arr;
}

function randomColor() {
  //pick a red from 0 - 255
  var red = Math.floor(Math.random() * 256);
  //pick a green from 0 - 255
  var green = Math.floor(Math.random() * 256);
  //pick a blue from 0 - 255
  var blue = Math.floor(Math.random() * 256);
  var rgbDisp = "rgb(" + red + ", " + green + ", " + blue + ")";
  return rgbDisp;
}

function resetColors() {
  document.querySelector("h1").style.backgroundColor = "steelblue";
  color = generateRandomColors(lvl);
  stat.textContent = "";
  pickedColor = pickColor();
  rgb.textContent = pickedColor;
  newColors.textContent = "New Colors";
  squareColors();
  for (var i = 0; i < squares.length; i++) {
    if (color[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = color[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

function squareColors() {
  for (var i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor = color[i];

    //add click to listeners to squares
    squares[i].addEventListener("click", function () {
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to picked Color
      if (clickedColor === pickedColor) {
        stat.textContent = "Correct!";
        changeColors();
        newColors.textContent = "PLAY AGAIN?";
      } else {
        //hide wrong answers
        stat.textContent = "Try Again";
        this.style.backgroundColor = "#232323";
      }
    });
  }
}

function modeButton() {
  for (var i = 0; i < modeBtn.length; i++) {
    modeBtn[i].addEventListener("click", function () {
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (lvl = 3) : (lvl = 6);
      resetColors();
    });
  }
}
