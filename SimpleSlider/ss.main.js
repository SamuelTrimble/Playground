var ss = (function() {
	"use strict";
	var s = new SS();

	function SS() {
		this.cur = 0;
		this.count = 5;
	}

	SS.prototype.Init = function() {
		setInterval(s.IncrementItem, 1000);
	};

	SS.prototype.SetActiveItem = function(newIdx) {
		var item = document.getElementById('slideContainer');
		item.style.left = (-(newIdx * 100)) + "%";
	};
	SS.prototype.IncrementItem = function() {
		s.cur++;
		if (s.cur >= s.count) {
			s.cur = 0;
		}
		s.SetActiveItem(s.cur);
	};

	return s;
})();

//Go
ss.Init();