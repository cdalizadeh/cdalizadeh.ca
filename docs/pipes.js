//constants
var height = window.innerHeight;
var width = window.innerWidth;
var green = '#004000';
var pink = '#400040';
var step = 5;
var size = 10;
var delay = 50;
var changeRatio = 30;
var numPipes = 100;
var numIterations = 5000;

//classes
function Pipe () {
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.color;
    var rand = Math.random();
    if (rand < 1/2){
        this.color = pink;
    }
    else {
        this.color = green;
    }
    this.dir = Math.floor(Math.random() * 4);
    this.step = step;
    this.size = size;
    this.dirTime = 0;
}
Pipe.prototype.move = function() {
    var dir = this.dir;
    if (dir == 0){
        this.x = this.x + this.step;
    }
    else if (dir == 1){
        this.y = this.y + this.step;
    }
    else if (dir == 2){
        this.x = this.x - this.step;
    }
    else{
        this.y = this.y - this.step;
    }
}

Pipe.prototype.changeDir = function() {
    var newDir = Math.floor(Math.random() * 4);
    while (newDir != this.dir && Math.abs(newDir - this.dir) == 2){
        var newDir = Math.floor(Math.random() * 4);
    }
    this.dir = newDir;
}

Pipe.prototype.adjust = function() {
    if (Math.random() < this.dirTime / 200) {
        this.dirTime = 0;
        this.changeDir();
    }
    else{
        this.dirTime++;
        this.move();
    }
}

Pipe.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

//main
var canvas;
var ctx;

initCanvas();
var pipes = [];
for (var i = 0; i < numPipes; i++){
    pipes.push(new Pipe(i));
}
for (var i = 0 ; i < numIterations; i++){
    setTimeout(timeStep, i * delay);
}

function timeStep() {
    for (var j = 0; j < pipes.length; j++){
        pipes[j].draw();
        pipes[j].adjust();
    }
}

function initCanvas() {
    canvas = document.querySelector("#back");
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
}