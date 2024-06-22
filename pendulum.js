class Pendulum {
  constructor(radius, angle, mass) {
    this.scale = s * height;

    this.r = radius; //radius (m)
    this.a = angle; //angle (radians)
    this.m = mass; //mass (kg)
    this.d = sqrt(this.m)*this.scale*0.15 //diameter

    this.ox = width/2; //origin x
    this.oy = height/2; //origin y
    this.os = this.scale/6; // origin size
    this.oVel = 0; //origin velocity
    this.oAcc = 0; //origin accleration

    this.vel = 0; //velocity (m/s)
    this.acc = 0; //acceleration (m/s/s)

    this.color = color(random(0, 360), 100, 50);

    this.time = 0;
    this.bestTime = 0;

    this.leftMost = width*0.2;
    this.rightMost = width*0.8;
  }


  update() {
    //Origin movement
    if (mouseIsPressed === true) {
      let newPos = max(this.leftMost, min(this.rightMost, mouseX))
      let newVel = (newPos - this.ox) / this.scale; //Determine the new velocity
      this.oAcc = (newVel - this.oVel); //Acceleration = difference in velocity

      this.ox = newPos; //Update position
      this.oVel = newVel; //Update velocity
      newPos = this.ox;
    }

    //Pendulum movement
    let totalVel = this.vel + this.oVel;
    this.acc = -cos(this.a) * this.oAcc / this.r + //Acceleration due to movement of origin
               (g * sin(this.a) - //Acceleration due to gravity
               ar * totalVel * abs(totalVel) / this.m / sq(this.r)) * dt; //Acceleration due to air resistance

    //Random pushes
    if (random() > 0.99) {
      this.acc += 0.02 * (random() - 0.5);
    }

    this.vel += this.acc; //Change velocity based on acceleration
    this.a += this.vel; //Change angle based on velocity

    //Score controls
    if (this.y < this.oy) {
      this.time += 1/60;
      if (this.time > this.bestTime) {
        this.bestTime = this.time;
      }
    } else {
      this.time = 0;
    }
  }


  render() {
    this.x = this.ox + this.scale * this.r * sin(this.a); //Pendulum x pos
    this.y = this.oy + this.scale * this.r * cos(this.a); //Pendulum y pos

    rectMode(CENTER);
    textSize(20);

    //Bar
    stroke(255);
    strokeWeight(3);
    fill(255);

    circle(this.leftMost, this.oy, this.os*0.3);
    circle(this.rightMost, this.oy, this.os*0.3);

    drawingContext.setLineDash([20, 10])
    line(0, this.oy, this.leftMost, this.oy);
    line(this.rightMost, this.oy, width, this.oy);
    drawingContext.setLineDash([])
    line(this.leftMost, this.oy, this.rightMost, this.oy);
    

    //Origin
    fill(200, 50, 80);
    strokeWeight(2);
    square(this.ox, this.oy, this.os);
    

    //Line
    fill(255);
    strokeWeight(this.d*0.2);
    line(this.ox, this.oy, this.x, this.y);


    //Origin circle
    fill(10);
    noStroke();
    circle(this.ox, this.oy, this.os*0.5)


    //Pendulum circle
    fill(this.color);
    stroke(255);
    strokeWeight(this.d*0.1);
    circle(this.x, this.y, this.d-2);


    //Text
    noStroke();
    fill(255);
    text("Best Time: " + round(this.bestTime, 2), 40, 40);
    if (this.time > 0) {
      text("Time: " + round(this.time, 2), width/2, 40);
    }
  }
}