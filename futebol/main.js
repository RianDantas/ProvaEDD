// Configurando canvas

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);





// função para gerar um número aleatório

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let golB = 0
let golR = 0
//Classe Bola, desenha as bolinhas dos times na tela
class Ball {
  /**
   * 
   * @param {number} x - Posição no eixo X
   * @param {number} y - Posição no eixo Y
   * @param {number} velX - Velocidade de deslocamento no eixo X
   * @param {number} velY - Velocidade de deslocamento no eixo X
   * @param {String} color - Cor da bola
   * @param {number} size - Define o tamanho da bola
   */
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
 // Desenhando a bola
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  //Atualizando a bola na tela
  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

//Verificando se a bola encostou na trave
  collisionDetect(goal1, goal2) {
    
    if (
      this.x - this.size <  goal1.x + 1  && 
      (this.y - this.size > goal1.y && this.y < goal1.y + goal1.h) &&
      this.color !== goal1.color
    ){
      golB += 1
      document.getElementById("golB").innerHTML = "Gols: " + golB
      for(const ball of balls){
        if(ball.color =="blue"){
          balls.pop()
        }
      }
      if(golB == 10){
        alert("Time azul fez 10 Gols!")
      }


    }

    if (this.x - this.size >  goal2.x && 
      (this.y - this.size > goal2.y && this.y < goal1.y + goal1.h ) &&
      this.color !== goal2.color
    ){
      golR += 1
      document.getElementById("golR").innerHTML = "Gols: " + golR
      for(const ball of balls){
        if(ball.color =="red"){
          balls.shift()
        }
      }
      if(golR == 10){
        alert("Time Vermelho fez 10 Gols!")
      }
    }
  }
}

//Criando a trave
class Team {
  /**
   * 
   * @param {number} x - posição X da trave no canva
   * @param {number} y - posição Y da trave no canva
   * @param {number} w - Largura da trave em relaçãoao eixo X
   * @param {number} h - Largura da trave em relação ao eixo Y
   * @param {Sring} color - Cor da trave
   */
  
  constructor(x,y, w, h, color, balls_count) {
    this.name = color
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
    this.balls_count = balls_count;
  }



  //Desenhando a trave no canva
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y, this.w, this.h);
  }
}

//Armazenar as bolas no array
const balls = [];

//Instanciando as classes de bola
let team_red = new Team(0, height/2 - 50, 30, 100, "red", 1)
let team_blue = new Team(width - 30, height/2 - 50, 30, 100, "blue",1)

function traveBlue(){
  let traveb = parseInt(document.getElementById("traveb").value,10);
  let qtd = parseInt(document.getElementById("qtdb").value,10)
  let alinhamento = traveb/2;
  team_blue.y = height/2 - alinhamento;
  team_blue.h= traveb;
  team_blue.balls_count = qtd
}

function traveRed(){
  let traver = parseInt(document.getElementById("traver").value,10);
  let qtd = parseInt(document.getElementById("qtdr").value,10)
  let alinhamento = traver/2;
  team_red.y = height/2 - alinhamento;
  team_red.h= traver;
  team_red.balls_count = qtd
}



//iniciando o jogo
function start(){
  for (let i = 0; i < team_red.balls_count; i++) {
    const size = random(10, 20);
    const velxR = parseInt(document.getElementById("velxR").value,10)
    const velxB = parseInt(document.getElementById("velxB").value,10)
    const ball_red = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      velxR,
      random(-7, 7),
      "red",
      size
    );

    balls.push(ball_red);
  }
  for (let i = 0; i < team_blue.balls_count; i++)  {
    const size = random(10, 20);
    const ball_blue = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(1,20),
      random(-7, 7),
      "blue",
      size
    );
    balls.push(ball_blue);
  }
  console.log(balls)
}
function reset(){
  for (let i = 0; i < team_red.balls_count; i++) {
    const size = random(10, 20);
    const ball_red = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(1,20),
      random(-7, 7),
      "red",
      size
    );

    balls.push(ball_red);
  }
  for (let i = 0; i < team_blue.balls_count; i++)  {
    const size = random(10, 20);
    const ball_blue = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(1,20),
      random(-7, 7),
      "blue",
      size
    );
    balls.push(ball_blue);
  }
  console.log(balls)
}



//Executando o código em loop
function loop() {
  ctx.fillStyle = "rgba(101, 250, 100, 0.25)";
  ctx.fillRect(0, 0, width, height);

  team_red.draw()
  
  team_blue.draw()

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(team_red, team_blue);
  }

  requestAnimationFrame(loop);
}

loop();
