let player;
let enemies = [];
let game = true;
let timeScore = 0;
let hitScore = 0;
let multiplier = 1;
let enemyNum = 8;
let check = 1000;
let pause = false;
let lastHit = undefined;
let bonus = true;
let lastBonus = 60000;
let stars = []


function setup() {
  mapStars()
  createCanvas(800,400);
  //fullScreen(1)
  player = new Player(width/2, height/2);
  for (var i = 0; i < int(enemyNum*multiplier); i++) {
    enemies[i] = new Enemy()
  }
}

function draw() {
  if (!pause){
    if (player.damage > 3){
      noLoop()
      game = false;
    }
    background(0);
    drawStars()
    gameDifficulty(millis());
    collisionCheck();
    player.show();
    //print(frameRate();
  }

  keyPressCheck();

  if (!game) {
    textAlign(CENTER);
    fill(256,0,256);
    textSize(50);
    text("GAME OVER!",width/2,height/2)
  }else if (pause) {
    textAlign(CENTER);
    fill(256,0,256);
    textSize(50);
    text("Paused",width/2,height/2)
  }

}

function mouseClicked() {
  fill(255,0,0,128)
  ellipse(mouseX,mouseY,10)

  for (var i = 0; i < enemies.length; i++) {
    let d = (mouseX - enemies[i].x)*(mouseX - enemies[i].x)
          + (mouseY - enemies[i].y)*(mouseY - enemies[i].y);
    if(d < (enemies[i].r +10)*(enemies[i].r + 10)){
      enemies[i] = new Enemy();
    }
  }

}

function collisionCheck(){
  for (let i = 0; i < enemies.length; i++){
    if(bonus == true){
      enemies[i].bonusRound = true;
    }else {
      enemies[i].bonusRound = false;
    }
    enemies[i].move()
    enemies[i].show()
    if(player.collision(enemies[i].x, enemies[i].y, enemies[i].r)){
      if(enemies[i].bonus){
        bonus = true;
        lastBonus = millis();
      }else if (enemies[i].bonusRound) {
        //print(score)
        hitScore += multiplier*10;
        //print("Hit: ", score)
      }else {
        player.damage ++;
        lastHit = millis();
      }
      enemies[i] = new Enemy();
    }
    if(  enemies[i].x < -20
      || enemies[i].x > width+20
      || enemies[i].y < -20
      || enemies[i].y > height+20){
      enemies[i] = new Enemy();
    }
  }
}

function keyPressCheck(){
  let r = 0;


  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    r --;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    r ++;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.forward()
  }


  //player.moveX(x);
  //player.moveY(y);
  player.turn(r)
}

function keyPressed(){
  if (keyCode == ESCAPE){
    if (pause){
      pause = false;
    }else{
      pause = true;
    }
  }
}

function gameDifficulty(mil) {
  timeScore += int(mil/60000)

  let scoreText = "Score: " + int(timeScore + hitScore);
  let multiText = "Multi: x" + int(multiplier*10)/10;
  textAlign(CENTER);
  fill(255,0,255);
  textSize(20);
  text(scoreText, width - 120, 30);
  text(multiText, width - 120, 60);

  if(lastHit != undefined && mil - lastHit > 60000 && player.damage < 3){
    player.damage --;
    lastHit = mil;
  }

  if (bonus) {
    if(mil - lastBonus > 6000){
      bonus = false
    }else if (mil - lastBonus < 4000) {
      textAlign(CENTER);
      textSize(32);
      text("BONUS!",width/2, 45)
    }
  }

  if (int(mil) > check){
    multiplier += 0.2;
    check += check;
  }

  if (enemies.length < enemyNum*multiplier){
    enemy = new Enemy();
    append(enemies, enemy);
  }
}

function drawStars(){
  for (var i = 0; i < stars.length; i++) {
    noStroke();
    fill(0,64,148,128);
    ellipse(stars[i][0],stars[i][1]*1.5 -50,stars[i][2]);
  }
}

function mapStars(){
  for (var i = 0; i < height*width/8.; i++) {
    if(random(0,200)>50){
      let star = [random(0,width)*8,random(0,height)*5,random(1,3)];
      append(stars, star);
    }
  }
}
