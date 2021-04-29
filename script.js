let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; 
let snake =[];

snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let direction = "right"; /*Definindo a direção da conbrinha */

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, // Math.floor = retira a parte ponto flutuante, ficando só o inteiro.
    y: Math.floor(Math.random() * 15 + 1) * box,
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0, 16 * box, 16 * box); /* desenha o retangulo onde vai acontecer o jogo */
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);

    }
}

function drawFood () {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); /* Ao ouvir um pressionamento de alguma tecla, chame uma função */

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo() {
 
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; // se ela ultrapassar a tela para direira, volta pra posição 0, início da esquerda.
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y <0 && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(");
        }
    }

    /* Criar Background */
    criarBG();

    /* Renderiza a cobrinha na tela */
    criarCobrinha();

    /* Renderiza a comidinha na tela */
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        // remove a ultima posição do vetor snake:
        snake.pop();

    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);

}

let jogo = setInterval (iniciarJogo, 200); /* Intervalo de 200milissegundos (velocidade da cobrinha)  */

