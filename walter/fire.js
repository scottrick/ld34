Fire.prototype = new Component();
Fire.prototype.constructor = Fire;

Fire.type = "fire";

Fire.xVelocityRange = 8;
Fire.yVelocityBase = -2;
Fire.yVelocityRange = -2;

Fire.minTime = 0.03;
Fire.baseTimeToFlame = 0.03;
Fire.baseTimeToSmoke = 0.1;

function Fire(intensity) {
	Component.call(this, Fire.type);

	this.timeToFlame = 0;
	this.currentFlameTime = 0;

	this.timeToSmoke = 0;
	this.currentSmokeTime = 0;

	if (intensity == null) {
		this.intensity = 1.0;
	}
	else {
		this.intensity = intensity;
	}

	this.randomTimeToFlame();
	this.randomTimeToSmoke();
}

Fire.prototype.flame = function(scene, transform) {
	var flameImage = scene.game.getImages().getNextFlame();
	this.emit(scene, transform, flameImage, 1);
	this.randomTimeToFlame();
}

Fire.prototype.smoke = function(scene, transform) {
	var smokeImage = scene.game.getImages().getNextSmoke();
	this.emit(scene, transform, smokeImage, 0.5);
	this.randomTimeToSmoke();
}

Fire.prototype.emit = function(scene, transform, image, alpha) {
	var flame = new Entity("flame emit");
	var drawable = new ImageDrawable(image);
	drawable.alpha = alpha;
	var newTransform = transform.copy();
	var movement = new Movement(
		new Vector((Math.random() - 0.5) * Fire.xVelocityRange * transform.scale.x, (Fire.yVelocityBase + Math.random()) * Fire.xVelocityRange * transform.scale.y), 
		null, 
		(Math.random() - 0.5) * 720);

	flame.addComponent(drawable);
	flame.addComponent(newTransform);
	flame.addComponent(movement);
	flame.addComponent(new Flame(newTransform.scale.copy()));

	scene.addEntity(flame);
}

Fire.prototype.randomTimeToFlame = function() {
	this.timeToFlame = (Fire.minTime + Math.random() * Fire.baseTimeToFlame) / this.intensity;
}

Fire.prototype.randomTimeToSmoke = function() {
	this.timeToSmoke = (Fire.minTime + Math.random() * Fire.baseTimeToSmoke) / this.intensity;
}
