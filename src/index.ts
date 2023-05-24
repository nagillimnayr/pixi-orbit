import { Application, Container, Point } from 'pixi.js'
import Body from './modules/physics/Body';

	function main() {
		const app = new Application({
			view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0x000000,
			width: 640,
			height: 480
		});

		const origin: Point = new Point(app.screen.width / 2, app.screen.height / 2); 
		const solarSystem: Container = new Container();
		
		const sun: Body = new Body({
			x: 0, y: 0,
			mass: 1,
			radius: 25,
			color: 0xFDEE00
		});
		const planet1: Body = new Body({
			x: 0, y: 0,
			mass: 0.001,
			radius: 10,
			color: 0x0BDA51
		});
		sun.addChild(planet1);
		planet1.position.set(100, 0);
		solarSystem.addChild(sun);
		solarSystem.position.set(origin.x, origin.y);

		app.stage.addChild(solarSystem);
	}

window.addEventListener('load', main);
