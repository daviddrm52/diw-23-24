//Variable JSON for the data
var sales = [
    {
        product: "Basketballs",
        units: 150
    },
    {
        product: "Baseballs",
        units: 125
    },
    {
        product: "Footballs",
        units: 300
    }
];

//Variables for the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//To print the text into the canvas
ctx.font = "bold 15px Arial";
ctx.fillText("Units", 25, 250);
ctx.fillText("Product", 300, 470);
ctx.fillText(sales[0].product, 150, 420);
ctx.fillText(sales[1].product, 300, 420);
ctx.fillText(sales[2].product, 450, 420);

//Gradient for the basketballs
const basketball = ctx.createLinearGradient(150, 0, 225, 0);
basketball.addColorStop(0, "#fea708");
basketball.addColorStop(1, "#efe2df");

// Fill with gradient for the basketballs
ctx.fillStyle = basketball;
ctx.fillRect(150, 400, 75, -sales[0].units);

//Gradient for the baseballs
const baseball = ctx.createLinearGradient(300, 0, 375, 0);
baseball.addColorStop(0, "#0954c0");
baseball.addColorStop(1, "#efe2df");

// Fill with gradient for the baseballs
ctx.fillStyle = baseball;
ctx.fillRect(300, 400, 75, -sales[1].units);

//Gradient for the footballs
const football = ctx.createLinearGradient(450, 0, 525, 0);
football.addColorStop(0, "#f17944");
football.addColorStop(1, "#efe2df");

// Fill with gradient for the footballs
ctx.fillStyle = football;
ctx.fillRect(450, 400, 75, -sales[2].units);

//For the line in the graph
ctx.beginPath();
//Top arrow
ctx.moveTo(100,5);
ctx.lineTo(105,10);
ctx.moveTo(100,5);
ctx.lineTo(95,10);
//Vertical line
ctx.moveTo(100,5);
ctx.lineTo(100,400);
//Horizontal line
ctx.moveTo(100,400);
ctx.lineTo(595,400);
//Bottom arrow
ctx.moveTo(595,400);
ctx.lineTo(590,405);
ctx.moveTo(595,400);
ctx.lineTo(590,395);
ctx.stroke();