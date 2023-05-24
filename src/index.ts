import { Application, Graphics } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

const origin = {
	x: app.screen.width / 2,
	y: app.screen.height / 2
};

const graphics: Graphics = new Graphics();
graphics.beginFill(0xff0000);
graphics.drawCircle(origin.x, origin.y, 50);


app.stage.addChild(graphics);
