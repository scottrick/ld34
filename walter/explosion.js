Explosion.prototype = new Component();
Explosion.prototype.constructor = Explosion;

Explosion.type = "explosion";

Explosion.velocity = 2;

function Explosion(delay, intensity) {
	Component.call(this, Explosion.type);

	if (delay == null) {
		this.delay = 0;
	}
	else {
		this.delay = delay;
	}

	if (intensity == null) {
		this.intensity = 1;
	}
	else {
		this.intensity = intensity;
	}
}

Explosion.prototype.explode = function(transform, scene) {
	for (var i = 0; i < 6 * this.intensity; i++) {
		var flameImage = scene.game.getImages().getNextFlame();
		this.emit(scene, transform, flameImage, 1.0);
	}

	for (var i = 0; i < 4 * this.intensity; i++) {
		var smokeImage = scene.game.getImages().getNextSmoke();
		this.emit(scene, transform, smokeImage, 0.7);
	}
}

Explosion.prototype.emit = function(scene, transform, image, alpha) {
	var flame = new Entity("explosion emit");
	var drawable = new ImageDrawable(image);
	drawable.alpha = alpha;
	var newTransform = transform.copy();

	var dir = Math.random() * Math.PI * 2;
	var xSpeed = Math.random () * 0.5 + 0.5;
	var ySpeed = Math.random () * 0.5 + 0.5;

	var movement = new Movement(
		new Vector(
			xSpeed * Math.cos(dir) * Explosion.velocity * transform.scale.x * this.intensity,
			ySpeed * Math.sin(dir) * Explosion.velocity * transform.scale.y * this.intensity),
		null, 
		(Math.random() - 0.5) * 720);

	flame.addComponent(drawable);
	flame.addComponent(newTransform);
	flame.addComponent(movement);
	flame.addComponent(new Flame(newTransform.scale.copy()));

	scene.addEntity(flame);
}
