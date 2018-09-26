class ISOGrid {
	constructor(ele) {
		this._canvasEle = ele;
		this._context = this._canvasEle.getContext('2d');

		this.isoSideLength = 50;

		this.cursorMoved = false;
		this.cursorPosX = 0;
		this.cursorPosY = 0;
		this.glowSize = 100;

		window.addEventListener('mousemove', this.UpdateMousePos.bind(this));

		requestAnimationFrame(this.RenderIsoGrid.bind(this));
	}

	UpdateMousePos(evt) {
		this.cursorMoved = true;
		this.cursorPosX = evt.clientX;
		this.cursorPosY = evt.clientY;
	}

	RenderIsoGrid() {
		let w = this._canvasEle.width = window.innerWidth;
		let h = this._canvasEle.height = window.innerHeight;
		let centerX = 0;
		let centerY = 0;
		let row = 0;
	
		//Clear canvas
		this._context.fillStyle = "#000000";
		this._context.fillRect(0, 0, w, h);
	
		//Draw cursor lighting if cursor has been moved
		if (this.cursorMoved) {
			let g = this._context.createRadialGradient(this.cursorPosX, this.cursorPosY, 10, this.cursorPosX, this.cursorPosY, this.glowSize);
			g.addColorStop(0, "#276CB9");
			g.addColorStop(1, "#000000");
	
			this._context.fillStyle = g;
			this._context.fillRect(0, 0, w, h);
		}
	
		this._context.fillStyle = "#262626";
		while (centerY < (h + this.isoSideLength)) {
			while (centerX < (w + this.isoSideLength)) {
				this.DrawIso(centerX, centerY);
	
				centerX += (this.isoSideLength * 2) + 2;
			}
	
			row++;
			centerX = ((row % 2) ? -(this.isoSideLength + 1) : 0);
			centerY += ((this.isoSideLength / 2) + 1);
		}
	
		requestAnimationFrame(this.RenderIsoGrid.bind(this));
	}
	DrawIso(centerX, centerY) {
		let x = centerX;
		let y = centerY + (this.isoSideLength / 2);
	
		this._context.beginPath();
		this._context.moveTo(x, y);
		this._context.lineTo(x - this.isoSideLength, y - (this.isoSideLength / 2));
		this._context.lineTo(x, (y - this.isoSideLength));
		this._context.lineTo(x + this.isoSideLength, y - (this.isoSideLength / 2));
		this._context.closePath();
		this._context.fill();
	}
}

let run = function() {
	new ISOGrid(document.getElementById("iso_background"));
};
if ((document.readyState === "complete") || ((document.readyState !== "loading") && (!document.documentElement.doScroll))) {
	run();
} else {
	document.addEventListener("DOMContentLoaded", run);
}
