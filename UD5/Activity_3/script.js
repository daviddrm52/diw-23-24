let canvas;
let context;
let sound = document.querySelector("#boing");
let color = ["red", "yellow", "green", "blue", "orange", "purple"];
let randomColor;
let dingus;
let startButton = document.getElementById("startPingPong");
let stopButton = document.getElementById("stopPingPong");
let statusGame = document.getElementById("statusGame");
let axisX;
let axisY;

startButton.addEventListener('click', (event) => {
    axisX = document.getElementById("axis-X").value;
    axisY = document.getElementById("axis-Y").value;
    directionX = parseInt(axisX);
    directionY = parseInt(axisY);
    statusGame.innerHTML = "Active";
    dingus = setInterval(movement, 10);
    // alert("⚠ WARNING: The ball has started! ⚠")
});

stopButton.addEventListener('click', (event) => {
    clearInterval(dingus);
    statusGame.innerHTML = "Inactive";
    // alert("⚠ WARNING: The ball has stoped! ⚠")
});

canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');

function draw(x, y) {
    context.fillStyle = randomColor;
    context.beginPath();
    context.arc(x,y,10,0,Math.PI * 2,true);
    context.fill();
};

function clearCanvas() {
    canvas.width = canvas.width;
};

var ballX = 10;
var ballY = 10;
var directionX;
var directionY;

draw(ballX, ballY);
    
function movement(){
    if (ballX > 800 || ballX < 0){
        directionX *= -1;
        sound.play();
        randomColor = color[Math.floor(Math.random()*color.length)];
    };
    if (ballY < 0 || ballY > 600){
        directionY *= -1;
        sound.play();
        randomColor = color[Math.floor(Math.random()*color.length)];
    };
    ballX += directionX;
    ballY += directionY;
    clearCanvas();
    draw(ballX, ballY);

    console.log(directionX);
    console.log(directionY);
};