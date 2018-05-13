class Enemy {
  constructor() {
    this.genCoord();
    this.direction = {x : random(-1,1), y : random(-1,1)}
    this.speed = 5;
    this.r = random(4,10);
    if(random(0,20)<1){
      this.bonus = true;
    }else {
      this.bonus = false
    }
    this.bonusRound =false;
  }

  genCoord(){
    this.x = random(-20, width+20);
    if (this.x < 0 || this.x > width){
      this.y = random(-20, height+20);
    }else {
      if (random(0,2) > 1);{
        this.y = random(height, height+20);
      }
      if (!this.y){
        this.y = random(-20, 0);
      }
    }
  }

  move(){
    this.x += this.direction.x*this.speed;
    this.y += this.direction.y*this.speed;
  }

  show(){
    noStroke()
    if (this.bonus) {
      fill(255,255,0);
    }else if (this.bonusRound) {
      fill(0,255,255);
    }else {
      fill(255);
    }
    ellipse(this.x, this.y, this.r*2);
  }

}
