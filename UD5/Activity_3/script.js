//Variables
let canvas;
let context;
let sound = document.querySelector("#boing");
//The change of color is funny
// let color = ["red", "yellow", "green", "blue", "orange", "purple"];
let dingus;
let startButton = document.getElementById("startPingPong");
let stopButton = document.getElementById("stopPingPong");
let statusGame = document.getElementById("statusGame");
let axisX;
let axisY;
let axisXInput = document.getElementById("axis-X");
let axisYInput = document.getElementById("axis-Y");
var ballX = 10;
var ballY = 10;
var directionX;
var directionY;

//For the image
var image = new Image();
image.src = './img/moai.png';

//Starting the canvas
canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');
stopButton.disabled = true;

//Functions
function draw(x, y) {
    // context.fillStyle = "#800080";
    // context.beginPath();
    // context.arc(x,y,10,0,Math.PI * 2,true);
    // context.fill();
    context.drawImage(image,x,y, 45,45);
};

function clearCanvas() {
    canvas.width = canvas.width;
};

function movement(){
    if (ballX > 1240 || ballX < 0){
        directionX *= -1;
        sound.play();
    };
    if (ballY < 0 || ballY > 680){
        directionY *= -1;
        sound.play();
    };
    ballX += directionX;
    ballY += directionY;
    clearCanvas();
    draw(ballX, ballY);
};

draw(ballX, ballY);

//Event Listeners
axisXInput.addEventListener('click', (event) => {
    axisX = document.getElementById("axis-X").value;
    directionX = parseInt(axisX);
});

axisYInput.addEventListener('click', (event) => {
    axisY = document.getElementById("axis-Y").value;
    directionY = parseInt(axisY);
})

startButton.addEventListener('click', (event) => {
    axisX = document.getElementById("axis-X").value;
    axisY = document.getElementById("axis-Y").value;
    directionX = parseInt(axisX);
    directionY = parseInt(axisY);
    statusGame.innerHTML = "Active";
    startButton.disabled = true;
    stopButton.disabled = false;
    dingus = setInterval(movement, 15);
    console.log("Ball active");
});

stopButton.addEventListener('click', (event) => {
    clearInterval(dingus);
    startButton.disabled = false;
    stopButton.disabled = true;
    statusGame.innerHTML = "Inactive";
    console.log("Ball inactive");
});