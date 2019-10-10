export default class Canvas2d {
	constructor() {
		const R = 128;
		var canvas = document.getElementById("canvas2d");
		canvas.width = R*2;
		canvas.height = R*2;
		var ctx = canvas.getContext("2d");
		ctx.filter = 'blur(' + R/5 + 'px)';

		ctx.beginPath();
		ctx.arc(R, R, R/2, 0, 2 * Math.PI);
		ctx.fillStyle = '#ff0000';
		ctx.fill();

		
		return canvas;
	}
}