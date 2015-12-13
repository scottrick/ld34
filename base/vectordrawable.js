VectorDrawable.prototype = new Drawable();
VectorDrawable.prototype.constructor = RectDrawable;

function VectorDrawable(image, start, end, width) {
	Drawable.call(this);

	this.image = image;

	if (start == null) {
		this.start = new Vector();
	}
	else {
		this.start = start;
	}

	if (end == null) {
		this.end = new Vector(32, 32);
	}
	else {
		this.end = end;
	}

	if (width == null) {
		this.width = 24;
	}
	else {
		this.width = width;
	}
}

VectorDrawable.prototype.draw = function(context) {
	var xPart = (this.end.x - this.start.x) * (this.end.x - this.start.x);
	var yPart = (this.end.y - this.start.y) * (this.end.y - this.start.y);
	var length = Math.sqrt(xPart + yPart);

	var oppositeLength = Math.sqrt(yPart);
	var adjacentLength = Math.sqrt(xPart);

	var angle = Math.atan((this.end.y - this.start.y) / (this.end.x - this.start.x));
	angle = Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
	// angle = Math.acos((this.end.x - this.start.x) / length);

	console.log("angle: " + angle);

	context.translate(this.start.x, this.start.y);
	// context.rotate(Math.PI / 180 * -10);
	context.rotate(angle);
	context.scale(length, this.width);

	console.log("drawing VectorDrawable");
	context.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, -0.5, 1.0, 1.0);

	// context.fillStyle = this.fillColor;
	// context.strokeStyle = this.strokeColor;
	// context.lineWidth = this.lineWidth;

	// context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
	// context.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

	// context.fill();
}
