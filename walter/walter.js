Walter.prototype = new Component();
Walter.prototype.constructor = Walter;

Walter.type = "walter";

Walter.channelStartDuration = 0.2;

function Walter(rightWing, leftWing, scene) {
	Component.call(this, Walter.type);

	this.rightWing = rightWing;
	this.leftWing = leftWing;

	this.scene = scene;

	this.rightDown = false;
	this.rightDownDuration = 0;
}

Walter.prototype.lDown = function() {
	this.rightDown = true;
}

Walter.prototype.lUp = function() {
	if (this.rightDownDuration < Walter.channelStartDuration) {
		this.rightWing.wave();
		this.fireRightNormal();
	}
	else {
		//we were channeling, so fire channeling
		this.fireRightCharged(this.rightDownDuration);
	}

	this.rightDown = false;
	this.rightDownDuration = 0;
}

Walter.prototype.fireRightNormal = function() {
	var fireEntity = new Entity("fireRightNormal");
	var position = this.rightWing.baseTransform.position.copy();
	position.y += 10;
	position.x += 16;
	var transform = new Transform(position, new Vector(18, 18));
	transform.z = 6;
	var movement = new Movement(new Vector(500, 0), null, (Math.random() - 0.5) * 1440);
	var drawable = new ImageDrawable(this.scene.game.getImages().getFireball());

	fireEntity.addComponent(transform);
	fireEntity.addComponent(movement);
	fireEntity.addComponent(drawable);
	fireEntity.addComponent(new Fire());

	this.scene.addEntity(fireEntity);
}

Walter.prototype.fireRightCharged = function(chargeDuration) {
	console.log("fire RIGHT charged: " + chargeDuration);
}








Walter.prototype.aDown = function() {
	console.log("A down");
}

Walter.prototype.aUp = function() {
	console.log("A up");
}
