//console.log("jello");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
let i=0;
let speed = 7;

let tileCount = 20;
let titleSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let snakeParts = [];
let tailLength = 2;

let xVelocity=0;
let yVelocity=0;

let score = 0;

let appleX = 5;
let appleY = 5;

const sound = new Audio("gulp.mp3");
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    //i++;
    //console.log("drawing game"+i);
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();
    //requestAnimationFrame
    //SetTimeOut
    setTimeout(drawGame,1000/speed);
    //console.log("terminated "+i);
}
function isGameOver(){
    let gameOver = false;
    if(yVelocity === 0 && xVelocity===0){
        return gameOver;
    }

    if(headX < 0){
        gameOver = true;
    }
    else if(headX >= tileCount){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY >= tileCount){
        gameOver = true;
    }
    for(let i=0;i<snakeParts.length;i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y ===headY){
            gameOver = true;
            break;
        }
    }


    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
  
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
  
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      }
      return gameOver;
}
function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score "+score, canvas.width-100,20);
    console.log("working");
}
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect((appleX * tileCount)+1,(appleY * tileCount)+1, titleSize,titleSize);
    
}
function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        sound.play();
        speed++;
    }
}
function drawSnake(){
    ctx.fillStyle = 'yellow';
    for(let i=0;i<snakeParts.length;i++){
        let part = snakeParts[i];
        ctx.fillRect((part.x * tileCount) +1, (part.y * tileCount)+1,titleSize,titleSize);
    }

    
    ctx.fillStyle = 'green';
    ctx.fillRect((headX * tileCount)+1,(headY * tileCount)+1, titleSize,titleSize);

    snakeParts.push(new SnakePart(headX,headY));
    /*if(snakeParts.length > tailLength){
        snakeParts.shift(); //remove the furthers item
    }*/
    while(snakeParts.length>tailLength){
        snakeParts.shift();
    }
}
function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

document.body.addEventListener('keydown',keyDown);

function keyDown(event){
    if(event.keyCode == 38){
        if(yVelocity == 1){
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
        return;
    }
    if(event.keyCode == 40){
        if(yVelocity ==-1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
        return;
    }
    if(event.keyCode == 37){
        if(xVelocity ==1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
        return;
    }
    if(event.keyCode == 39){
        if(xVelocity ==-1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
        return;
    }
    
    if(event.keyCode == 13){
        speed = 7;

        headX = 10;
        headY = 10;
        snakeParts = [];
        tailLength = 2;

        xVelocity=0;
        yVelocity=0;

        score = 0;

        appleX = 5;
        appleY = 5;
        drawGame();
    }


}   

drawGame();