let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');



function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
let fieldSizeX = 10;
let fieldSizeY = 10;

field.style.width = fieldSizeX/10 * 500;
field.style.width = fieldSizeY/10 * 500;

let x = 1;
let y = 10;

for (let i = 0; i < fieldSizeX*fieldSizeY; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
    excel.setAttribute("posX", x);
    excel.setAttribute("posY", y);
    x++;
    if (x > fieldSizeX) {
        x = 1;
        y--;
    }
}

function generateSnake() {
    let posX = randomInteger(3, fieldSizeX);
    let posY = randomInteger(1, fieldSizeY);
    return [posX, posY];
}
let positionSnake = generateSnake();

let snakeBody = [
    document.querySelector(`[posX = "${positionSnake[0]}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0] - 1}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0] - 2}"][posY = "${positionSnake[1]}"]`)
]

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

function fillSnake() {
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
    snakeBody[0].classList.add('head');
}

let food;

function spawnFood() {
    function generateFood() {
        let posX = Math.round(Math.random() * (fieldSizeX-1) + 1);
        let posY = Math.round(Math.random() * (fieldSizeY-1) + 1);
        return [posX, posY];
    }
    do {
        let positionFood = generateFood();
        food = document.querySelector(`[posX = "${positionFood[0]}"][posY = "${positionFood[1]}"]`);
    } while (food.classList.contains("snakeBody"));
    food.classList.add('food');
}

spawnFood();

let direction = "right";

function move() {
    let coordinateSnake = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();
    if (direction == "right") {
        if (coordinateSnake[0] == fieldSizeX) {
            coordinateSnake[0] = 0;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+coordinateSnake[0] + 1}"][posY = "${coordinateSnake[1]}"]`));
    } else if (direction == "left") {
        if (coordinateSnake[0] == 1) {
            coordinateSnake[0] = fieldSizeX+ 1;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+coordinateSnake[0] - 1}"][posY = "${coordinateSnake[1]}"]`));
    } else if (direction == "up") {
        if (coordinateSnake[1] == fieldSizeY) {
            coordinateSnake[1] = 0;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+coordinateSnake[0]}"][posY = "${+coordinateSnake[1]+1}"]`));
    } else if (direction == "down") {
        if (coordinateSnake[1] == 1) {
            coordinateSnake[1] = fieldSizeY + 1;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+coordinateSnake[0]}"][posY = "${+coordinateSnake[1]-1}"]`));
    }
    if(snakeBody[0].getAttribute('posX') == food.getAttribute('posX') && snakeBody[0].getAttribute('posY') == food.getAttribute('posY')){
        food.classList.remove("food");
        spawnFood();
        let x = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let y = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector(`[posX = "${+x}"][posY = "${+y}"]`));
    }
    if(snakeBody[0].classList.contains("snakeBody")){
        clearInterval(moveSnakeInterval);
        for(let i = 1; i < snakeBody.length; i++){
            snakeBody[i].style.background = 'url(./images/bodyDead.gif)';
            snakeBody[i].style.backgroundSize = "cover";
        }

        snakeBody[0].style.background = 'url(./images/dead.gif)';
        snakeBody[0].style.backgroundSize = "cover";
    }
        fillSnake();
}

function moveRandom() {
    let randomDir = randomInteger(1, 4);
    if (randomDir == 1 && direction != "left")
        direction = "right";
    else if (randomDir == 2 && direction != "right")
        direction = "left";
    else if (randomDir == 3 && direction != "down")
        direction = "up";
    else if (randomDir == 4 && direction != "up")
        direction = "down";
    move();
}
let moveSnakeInterval = setInterval(move, 110);

window.addEventListener('keydown', (event) => {
    let key = event.code;
    if (key == "ArrowUp" && direction != "down") {
        direction = "up";
    } else if (key == "ArrowDown" && direction != "up") {
        direction = "down";
    } else if (key == "ArrowRight" && direction != "left") {
        direction = "right";
    } else if (key == "ArrowLeft" && direction != "right") {
        direction = "left";
    }
})