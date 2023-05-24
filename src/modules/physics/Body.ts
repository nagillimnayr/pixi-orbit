import { Graphics, ObservablePoint, Point } from "pixi.js";
import {
  GRAV_CONST, DIST_MULT, SOLAR_MASS, DAY,
} from '../utils/constants';
import '@pixi/math-extras';
const timeScale = 10;

/**
 * 
 */
export default class Body extends Graphics {
    mass: number;
    radius: number;
    color: number;

    velocity: Point;
    acceleration: Point;

    constructor({ x = 0, y = 0 , mass = 0, radius = 10, color = 0xffffff}) {
        super();
        this.mass = mass;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.color = color;
        this.beginFill(color);
        this.drawCircle(0, 0, radius);

        // Initialize velocity and acceleration
        this.velocity = new Point(0, 0);
        this.acceleration = new Point(0, 0);
    }
     
 /** Updates the position of the body based on it's velocity
  *
  * @param {number} deltaTime The time in seconds of the time-step between updates.
  */
  updatePosition(deltaTime: number) {
      this.position.add(this.velocity.multiplyScalar(deltaTime * DAY * timeScale), this.position);
    // console.log('position: ', this.position);
  }

  /** Updates the velocity of the body based on it's acceleration
   *
   * @param {number} deltaTime The time in seconds of the time-step between updates.
   */
  updateVelocity(deltaTime: number) {
      this.velocity.add(this.acceleration.multiplyScalar(deltaTime * DAY * timeScale), this.velocity);
      
    // console.log('velocity: ', this.velocity);
  }

  /** Calculates the instantaneous acceleration of the orbiting body
   *
   * @param {number} mass Mass of the central body.
   * @param {IPoint} position Position of the central body.
   */
  calculateAcceleration({ mass = 0, position = new Point() }) {
    const diffPos = position.subtract(this.position);
    // console.log('diffPos:', diffPos);
    const distSquared = diffPos.multiplyScalar(DIST_MULT).magnitudeSquared();
    // console.log('distSquared: ', distSquared);
    const direction = diffPos.normalize();
    // console.log('direction: ', direction);

    const gravForce = (GRAV_CONST * mass * SOLAR_MASS) / distSquared;
    // console.log('gravForce: ', gravForce);

    this.acceleration = direction.multiplyScalar(gravForce);
    this.acceleration.multiplyScalar(1 / DIST_MULT, this.acceleration);
  }



}
