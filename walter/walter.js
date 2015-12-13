Walter.prototype = new Component();
Walter.prototype.constructor = Walter;

Walter.type = "walter";

Walter.channelStartDuration = 0.18;

Walter.fireSpeed = 480;
Walter.fireballSize = 18;

function Walter(rightWing, leftWing, transform, scene) {
	Component.call(this, Walter.type);

	this.rightWing = rightWing;
	this.leftWing = leftWing;

	this.scene = scene;

	this.rightDown = false;
	this.rightDownDuration = 0;

	this.rightChanneling = false;
	this.rightChannelAngleStart = 0;
	this.rightChannelAngleEnd = -80;
	this.rightChannelAngle = this.rightChannelAngleStart;
	this.rightChannelAngleUpSpeed = -150;
	this.rightChannelAngleDownSpeed = 90;
	this.rightChannelingTargetPos = transform.position.copy();
	this.rightChannelingTargetPos.x += 48;

	var rightEntity = new Entity("right channel entity");
	rightEntity.addComponent(new Transform());
	var drawable = new VectorDrawable(scene.game.getImages().getWand(), transform.position, this.rightChannelingTargetPos, 12);
	drawable.z = 3;
	rightEntity.addComponent(drawable);
	this.scene.addEntity(rightEntity);

	this.leftDown = false;
	this.leftDownDuration = 0;

	this.leftChanneling = false;
	this.leftChannelAngleStart = 180;
	this.leftChannelAngleEnd = 260;
	this.leftChannelAngle = this.leftChannelAngleStart;
	this.leftChannelAngleUpSpeed = 150;
	this.leftChannelAngleDownSpeed = -90;
	this.leftChannelingTargetPos = transform.position.copy();
	this.leftChannelingTargetPos.x -= 48;

	var leftEntity = new Entity("left channel entity");
	leftEntity.addComponent(new Transform());
	var drawable = new VectorDrawable(scene.game.getImages().getWand(), transform.position, this.leftChannelingTargetPos, 12);
	drawable.z = 3;
	leftEntity.addComponent(drawable);
	this.scene.addEntity(leftEntity);
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
	var fireEntity = new Entity("fireball");
	var position = this.rightWing.baseTransform.position.copy();
	position.y += 10;
	position.x += 16;

	var transform = new Transform(position, new Vector(Walter.fireballSize, Walter.fireballSize));
	transform.z = 6;

	var dir = this.dirForAngle(this.rightChannelAngle);
	dir.multiply(Walter.fireSpeed);
	var movement = new Movement(dir, null, (Math.random() - 0.5) * 1440);
	var drawable = new ImageDrawable(this.scene.game.getImages().getFireball());

	fireEntity.addComponent(transform);
	fireEntity.addComponent(movement);
	fireEntity.addComponent(drawable);
	fireEntity.addComponent(new CircleBody());
	fireEntity.addComponent(new Fire());
	fireEntity.addComponent(new Weapon(1, "fire", true));

	this.scene.addEntity(fireEntity);
}

Walter.prototype.startChannelingRight = function() {
	this.rightChanneling = true;
}

Walter.prototype.fireRightCharged = function(chargeDuration) {
	this.rightChanneling = false;

	for (var i = 0; i < 2; i++) {
		var lightningEntity = new Entity("lightning");
		var position = this.rightWing.baseTransform.position.copy();
		position.y += 10;
		position.x += 16;

		var target = position.copy();
		var drawable = new VectorDrawable(this.scene.game.getImages().getLightning(), position, target, Lightning.lightningWidth);

		var endPoint = this.dirForAngle(this.rightChannelAngle);
		endPoint.multiply(50000);

		lightningEntity.addComponent(new Transform());
		lightningEntity.addComponent(drawable);
		lightningEntity.addComponent(new Lightning());
		lightningEntity.addComponent(new Weapon(4, "lightning", false));
		lightningEntity.addComponent(new LineBody(position, endPoint));

		this.scene.addEntity(lightningEntity);

		var velocity = this.dirForAngle(this.rightChannelAngle - i * this.randomAngleOffset());
		velocity.multiply(this.randomLightningSpeed());

		var endEntity = new Entity("lightningEnd");
		endEntity.addComponent(new Transform(target));
		endEntity.addComponent(new Movement(velocity));
		this.scene.addEntity(endEntity);
	}
}

Walter.prototype.fireLeftNormal = function() {
	var fireEntity = new Entity("fireball");
	var position = this.leftWing.baseTransform.position.copy();
	position.y += 10;
	position.x -= 16;

	var transform = new Transform(position, new Vector(Walter.fireballSize, Walter.fireballSize));
	transform.z = 6;

	var dir = this.dirForAngle(this.leftChannelAngle);
	dir.multiply(Walter.fireSpeed);
	var movement = new Movement(dir, null, (Math.random() - 0.5) * 1440);
	var drawable = new ImageDrawable(this.scene.game.getImages().getFireball());

	fireEntity.addComponent(transform);
	fireEntity.addComponent(movement);
	fireEntity.addComponent(drawable);
	fireEntity.addComponent(new CircleBody());
	fireEntity.addComponent(new Fire(1, "fire", true));
	fireEntity.addComponent(new Weapon());

	this.scene.addEntity(fireEntity);
}

Walter.prototype.startChannelingLeft = function() {
	this.leftChanneling = true;
}

Walter.prototype.fireLeftCharged = function(chargeDuration) {
	this.leftChanneling = false;

	for (var i = 0; i < 2; i++) {
		var lightningEntity = new Entity("lightning");
		var position = this.leftWing.baseTransform.position.copy();
		position.y += 10;
		position.x -= 16;

		var target = position.copy();
		var drawable = new VectorDrawable(this.scene.game.getImages().getLightning(), position, target, Lightning.lightningWidth);

		var endPoint = this.dirForAngle(this.leftChannelAngle);
		endPoint.multiply(50000);

		lightningEntity.addComponent(new Transform());
		lightningEntity.addComponent(drawable);
		lightningEntity.addComponent(new Lightning());
		lightningEntity.addComponent(new Weapon(4, "lightning", false));
		lightningEntity.addComponent(new LineBody(position, endPoint));

		this.scene.addEntity(lightningEntity);

		var velocity = this.dirForAngle(this.leftChannelAngle + i * this.randomAngleOffset());
		velocity.multiply(this.randomLightningSpeed());

		var endEntity = new Entity("lightningEnd");
		endEntity.addComponent(new Transform(target));
		endEntity.addComponent(new Movement(velocity));
		this.scene.addEntity(endEntity);
	}
}

Walter.prototype.aDown = function() {
	this.leftDown = true;
}

Walter.prototype.aUp = function() {
	if (this.leftDownDuration < Walter.channelStartDuration) {
		this.leftWing.wave();
		this.fireLeftNormal();
	}
	else {
		//we were channeling, so fire channeling
		this.fireLeftCharged(this.leftDownDuration);
	}

	this.leftDown = false;
	this.leftDownDuration = 0;
}

Walter.prototype.randomAngleOffset = function() {
	return 3 + Math.random() * 6;
}

Walter.prototype.randomLightningSpeed = function() {
	return Lightning.lightningBaseSpeed + Math.random() * Lightning.lightningVariableSpeed;
}

Walter.prototype.dirForAngle = function(angle) {
	var dir = new Vector(
		Math.cos(Math.PI / 180 * angle),
		Math.sin(Math.PI / 180 * angle));

	return dir;
}
