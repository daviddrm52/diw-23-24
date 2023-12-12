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

//Variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//For the text
ctx.font = "bold 15px Arial";
ctx.fillText("Units", 25, 250);
ctx.fillText("Product", 300, 470);
ctx.fillText(sales[0].product, 150, 420);
ctx.fillText(sales[1].product, 300, 420);
ctx.fillText(sales[2].product, 450, 420);

//For the basketball
const basketball = ctx.createLinearGradient(150, 0, 225, 0);
basketball.addColorStop(0, "#fea708");
basketball.addColorStop(1, "#efe2df");

// Fill with gradient for the basketballs
ctx.fillStyle = basketball;
ctx.fillRect(150, 400, 75, -sales[0].units);

//For the baseballs


//For the footballs


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


