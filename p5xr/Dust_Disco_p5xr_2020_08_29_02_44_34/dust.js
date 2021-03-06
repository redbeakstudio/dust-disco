class dust {
  constructor() {
    this.position = createVector(random(settings.stage.width), random(settings.stage.height), random(settings.stage.depth));
    this.velocity = p5.Vector.random3D();
    this.velocity.setMag(random(2, 8));
    this.acceleration = createVector();
    this.maxForce = 2;
    this.maxSpeed = 4;
  }

  show() {
    strokeWeight(10);
    stroke('white');
    point(this.position.x, this.position.y, this.position.z);
  }

  edges() {
    if (this.position.x > settings.stage.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = settings.stage.width;
    }
    if (this.position.y > settings.stage.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = settings.stage.height;
    }
    if (this.position.z > settings.stage.heightdepth) {
      this.position.z = 0;
    } else if (this.position.z < 0) {
      this.position.z = settings.stage.heightdepth;
    }
  }

  cloud(cloud) {
    let alignment = this.align(cloud);
    let cohesion = this.cohesion(cloud);
    let separation = this.separation(cloud);

    separation.mult(sliderValues.separation);
    cohesion.mult(sliderValues.cohesion);
    alignment.mult(sliderValues.align);

    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    alignment.mult(sliderValues.align);
  }

  connect() {
    for (let other of cloud) {
      let d = dist(
        this.position.x,
        this.position.y,
        this.position.z,
        other.position.x,
        other.position.y,
        other.position.z
      );
      if (other != this && d < perceptionRadius) {
        strokeWeight(1);
        stroke(255);
        line(

          this.position.x,
          this.position.y,
          this.position.z,
          other.position.x,
          other.position.y,
          other.position.z
        )
      }
    }
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  // how much dust wants to move in same direction of other dust

  align(cloud) {
    let steering = createVector();
    let total = 2;
    for (let other of cloud) {
      let d = dist(

        this.position.x,
        this.position.y,
        this.position.z,
        other.position.x,
        other.position.y,
        other.position.z
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);

    }
    return steering;
  }

  // how much dust wants to move close to other dust

  cohesion(cloud) {

    let steering = createVector();
    let total = 0;
    for (let other of cloud) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);

    }
    return steering;
  }


  // how much dust stays away from other dust

  separation(cloud) {

    let steering = createVector();
    let total = 0;
    for (let other of cloud) {
      let d = dist(

        this.position.x,
        this.position.y,
        this.position.z,
        other.position.x,
        other.position.y,
        other.position.z
      );
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);

    }
    return steering;
  }
}