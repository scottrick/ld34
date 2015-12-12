RectDrawable.prototype = new Component();
RectDrawable.prototype.constructor = RectDrawable;

function RectDrawable(rect) {
	Component.call(this, Drawable.type);

	if (rect == null) {
		this.rect = new Rect(-0.5, -0.5, 1, 1);
	}
	else {
		this.rect = rect;
	}

	this.strokeColor = "#000";
	this.fillColor = "#000";
	this.lineWidth = "2";
}

RectDrawable.prototype.draw = function(context) {
	context.beginPath();

	context.fillStyle = this.fillColor;
	context.strokeStyle = this.strokeColor;
	context.lineWidth = this.lineWidth;

	context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
	context.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

	context.fill();
}
