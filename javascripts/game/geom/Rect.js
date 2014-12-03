if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function() {
	function Rect(x, y, width, height, name) {
		this._geomType = 'rect';
		this._name = name || null;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	Rect.prototype.containsPoint = function(x, y) {
		return (this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height);
	};
	Rect.prototype.isOverlapping = function(geom) {
		if(!geom) {
			return false;
		}
		else if(geom._geomType === 'rect') {
			return this._isOverlappingRect(geom);
		}
		else if(geom._geomType === 'triangle') {
			return geom.isOverlapping(this);
		}
		else {
			throw new Error("Unsure how to find overlap between rect and '" + geom._geomType + "'");
		}
	};
	Rect.prototype._isOverlappingRect = function(rect) {
		//two rects are intersecting if their horizontal and vertical "shadows" are both intersecting
		if(((rect.x <= this.x && rect.x + rect.width > this.x) ||
			(this.x <= rect.x && this.x + this.width > rect.x)) &&
			((rect.y <= this.y && rect.y + rect.height > this.y) ||
			(this.y <= rect.y && this.y + this.height > rect.y))) {
			return {
				left: this.x,
				right: this.x + this.width,
				top: this.y,
				bottom: this.y + this.height
			};
		}
		else {
			return false;
		}
	};
	Rect.prototype.render = function(ctx, camera, color, borderOnly, thickness) {
		if(borderOnly) {
			ctx.lineWidth = thickness || 1.5;
			ctx.strokeStyle = color || '#f0f';
			ctx.strokeRect(this.x - camera.x, this.y - camera.y, this.width, this.height);
		}
		else {
			ctx.fillStyle = color || '#f0f';
			ctx.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);
		}
	};
	return Rect;
});