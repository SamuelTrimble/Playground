var chg = (function() {
	"use strict";
	var t = new Timer();
	var c = new CHG();

	function CHG() {
		this.hexCanvas = null;
		this.hexContext = null;

		//Initial hex grid values
		this.hexSideLength = 100;
		this.hexAngle = 0.523598776; //30 degrees in radians
		this.hexHeight = Math.sin(this.hexAngle) * this.hexSideLength;
		this.hexRadius = Math.cos(this.hexAngle) * this.hexSideLength;
		this.hexRectHeight = this.hexSideLength + 2 * this.hexHeight;
		this.hexRectWidth = 2 * this.hexRadius;

		//Cursor values
		this.cursorMoved = false;
		this.cursorPosX = 0;
		this.cursorPosY = 0;
		this.glowOuterSize = 400;
	}

	CHG.prototype.Init = function() {
		//Store canvas objects
		c.hexCanvas = document.getElementById('chg_background');
		c.hexContext = c.hexCanvas.getContext('2d');

		//Size the hex grid now and resize when needed
		c.ResizeHexGrid();
		window.addEventListener('resize', c.ResizeHexGrid);

		//Listen for mouse movement
		c.hexCanvas.addEventListener('mousemove', c.UpdateMousePos);

		//Start drawing
		requestAnimationFrame(c.RenderHexGrid);
	};

	CHG.prototype.UpdateMousePos = function(e) {
		c.cursorMoved = true;
		c.cursorPosX = e.clientX;
		c.cursorPosY = e.clientY;
	};

	CHG.prototype.ResizeHexGrid = function() {
		//Use bigger hexes and larger glow for bigger screens
		if (window.innerWidth > 1920) {
			c.hexSideLength = 100;
			c.glowOuterSize = 400;
		} else if (window.innerWidth > 1200) {
			c.hexSideLength = 60;
			c.glowOuterSize = 200;
		} else {
			c.hexSideLength = 20;
			c.glowOuterSize = 80;
		}

		c.hexHeight = Math.sin(c.hexAngle) * c.hexSideLength;
		c.hexRadius = Math.cos(c.hexAngle) * c.hexSideLength;
		c.hexRectHeight = c.hexSideLength + 2 * c.hexHeight;
		c.hexRectWidth = 2 * c.hexRadius;
	};
	CHG.prototype.RenderHexGrid = function(now) {
		var w = c.hexCanvas.width = window.innerWidth,
			h = c.hexCanvas.height = window.innerHeight;

		//Clear canvas
		c.hexContext.fillStyle = "#000000";
		c.hexContext.fillRect(0, 0, w, h);

		//Draw cursor lighting if cursor has been moved
		if (c.cursorMoved) {
			var g = c.hexContext.createRadialGradient(c.cursorPosX, c.cursorPosY, 10, c.cursorPosX, c.cursorPosY, c.glowOuterSize);
			g.addColorStop(0, "#276CB9");
			g.addColorStop(1, "#000000");

			c.hexContext.fillStyle = g;
			c.hexContext.fillRect(0, 0, w, h);
		}

		//Draw the hex grid
		c.hexContext.fillStyle = "#262626";
		var centerX = 0,
			centerY = 0,
			row = 0;

		while (centerY < (h + c.hexRectHeight)) {
			while (centerX < (w + c.hexRectWidth)) {
				c.DrawHex(centerX, centerY);

				centerX += c.hexRectWidth + 1;
			}

			row++;
			centerX = ((row % 2) ? -(c.hexRectWidth / 2) : 0);
			centerY += c.hexRectHeight - c.hexHeight + 1;
		}

		//Update timer so we can see FPS
		t.Tick();

		//Print the current FPS
		c.hexContext.font = "18px bold";
		c.hexContext.fillStyle = "#FFFFFF";
		c.hexContext.fillText("FPS: " + t.curFPS, 0, 14);

		//Do it all again next frame
		requestAnimationFrame(c.RenderHexGrid);
	};
	CHG.prototype.DrawHex = function(centerX, centerY) {
		var x = centerX - c.hexRadius,
			y = centerY - c.hexRadius;

		c.hexContext.beginPath();
		c.hexContext.moveTo(x + c.hexRadius, y);
		c.hexContext.lineTo(x + c.hexRectWidth, y + c.hexHeight);
		c.hexContext.lineTo(x + c.hexRectWidth, y + c.hexHeight + c.hexSideLength);
		c.hexContext.lineTo(x + c.hexRadius, y + c.hexRectHeight);
		c.hexContext.lineTo(x, y + c.hexHeight + c.hexSideLength);
		c.hexContext.lineTo(x, y + c.hexHeight);
		c.hexContext.closePath();
		c.hexContext.fill();
	};

	function Timer() {
		this.filterStrength = 20;
		this.frameTime = 0;
		this.lastLoop = new Date(),
		this.thisLoop = new Date();

		this.curFPS = "N/A";

		//Update FPS to be displayed every second
		setInterval(function() {
			t.curFPS = t.FPS();
		}, 1000);
	}

	Timer.prototype.Tick = function() {
		t.thisLoop = new Date();

		var thisFrame = t.thisLoop - t.lastLoop;
		t.frameTime += (thisFrame - t.frameTime) / t.filterStrength;

		t.lastLoop = t.thisLoop;
	};
	Timer.prototype.FPS = function() {
		return (1000 / t.frameTime).toFixed(2);
	}

	return {
		Init: c.Init
	};
})();

//Go
chg.Init();
