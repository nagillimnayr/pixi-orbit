import { Application, Container, IApplicationOptions, Point, Ticker } from 'pixi.js'
import Body from './modules/physics/Body';

function main() {
	const appOptions : IApplicationOptions = {
		view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
		resolution: window.devicePixelRatio || 1,
		autoDensity: true,
		backgroundColor: 0x000000,
		width: 640,
		height: 480,
		backgroundAlpha: 1.0,
		antialias: true,
		clearBeforeRender: true,
		sharedTicker: true,
		context: null,
		powerPreference: 'default',
		premultipliedAlpha: false,
		preserveDrawingBuffer: false,
		hello: false
	};
	const app = new Application(appOptions);

	const ticker = Ticker.shared;

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

	// Traverse scene-graph tree depth-first
	const inOrderTraversal = (root: Body, deltaTime: number) => {
			// If root parameter does not exist, return
		if (!root) { return; }

		const numOfChildren = root.children.length;
		// 
		for (let i = 0; i < numOfChildren; i++) {
			const child = root.getChildAt(i);
			
			// Cast to Body
			const body = (<Body>child);

			// Calculate new acceleration
			body.calculateAcceleration(root);
			// Calculate new velocity
			body.updateVelocity(deltaTime);
			// Calculate new position
			body.updatePosition(deltaTime);

			// Traverse deeper into the tree
			if (body.children.length > 0) {
				inOrderTraversal(body, deltaTime);
			}
		}
	}
	const animate = (milliseconds: number) => {
		const seconds = milliseconds * 0.001;
		
		// traverse tree to iterate over all of the nodes and update them
		
	};
	ticker.add(animate);

}

window.addEventListener('load', main);
