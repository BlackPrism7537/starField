class Player {
  constructor(x, y) {
    angleMode(RADIANS);
    this.x = x;
    this.y = y;
    this.r = 15;
    this.speed = 5;
    this.damage = 0;
    this.angle = 0;
  }

  show(){

    push()
    translate(this.x,this.y)
    rotate(this.angle);
    noStroke()
    if(this.damage < 4){
      fill(255, 40, 128);
    }else{
      fill(255,0,0);
    }
    triangle(-this.r/2 , this.r/2,
      0, -this.r + 2,
      this.r/2 ,this.r/2);
    pop()

    if(this.damage < 4){
      noStroke();
      fill(255,0,0);
      rect(5,27,130,10,5,5)
    }

    if(this.damage < 3){
      stroke(66, 69, 244);
      strokeWeight(1)
      noFill();
      ellipse(this.x, this.y, this.r*2);
    }
    if(this.damage < 3){
      fill(66, 69, 244);
      rect(5,5,50,20,5,5);
    }
    if(this.damage < 2){
      fill(66, 69, 244);
      rect(45,5,50,20,5,5);
    }
    if(this.damage < 1){
      fill(66, 69, 244);
      rect(85,5,50,20,5,5);
    }
  }

  collision(x, y, r){
    let d = ((this.x - x)*(this.x - x)) + ((this.y - y)*(this.y - y));
    if (d < (this.r + r)*(this.r + r)){
      return true
    }else{
      return false
    }
  }

  turn(dir){
    this.angle = (this.angle + dir*PI/24)%TWO_PI;
    if (this.angle < 0){
      this.angle += TWO_PI;
    }
  }

  forward(){
    this.x += sin(this.angle)*this.speed;
    if (this.x - this.r < 0){
      this.x = this.r;
    }else if (this.x + this.r > width) {
      this.x = width - this.r;
    }
    this.y += sin(this.angle - PI/2)*this.speed;
    if (this.y - this.r < 0){
      this.y = this.r;
    }else if (this.y + this.r > height) {
      this.y = height - this.r;
    }
  }

}
