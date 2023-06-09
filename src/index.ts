import { Application, Container, IApplicationOptions, Point, Ticker } from 'pixi.js'
import Body from './modules/physics/Body';
import { DIST_MULT, KM_TO_M } from './modules/utils/constants';

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
	ticker.autoStart = false;
	ticker.stop();

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
	planet1.position.set(149.5, 0);
	planet1.velocity.set(0, (-30 * KM_TO_M) / DIST_MULT );
	solarSystem.addChild(sun);
	solarSystem.position.set(origin.x, origin.y);

	app.stage.addChild(solarSystem);

	// Traverse scene-graph tree depth-first
	const inOrderTraversal = (root: Body, deltaTime: number) => {
		// If root parameter does not exist, return
		if (!root) { return; }

		const numOfChildren = root.children.length;
		// Traverse through each child branch
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
		
		// traverse tree to iterate over all of the bodies and update them
		inOrderTraversal(sun, seconds);
		app.render(); // render the scene
	};
	ticker.add(animate);
	ticker.start();
}

window.addEventListener('load', main);
