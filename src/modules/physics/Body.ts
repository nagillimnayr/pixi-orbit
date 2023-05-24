import { Graphics, Point } from "pixi.js";

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

        this.velocity = new Point(0, 0);
        this.acceleration = new Point(0, 0);
    }




}
