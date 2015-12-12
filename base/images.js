function Images(document) {
	this.defaultImage = document.getElementById("defaultImageId");

	this.splashWalter = document.getElementById("splashWalter");

	this.forestSmall = document.getElementById("forestSmall");
	this.ground = document.getElementById("ground");
	this.levelback = document.getElementById("levelback");
	this.owlPixel = document.getElementById("owlPixel");
	this.walter = document.getElementById("walter");
	this.walterPixel = document.getElementById("walterPixel");
	this.leftWing = document.getElementById("leftWing");
	this.rightWing = document.getElementById("rightWing");

	this.flames = []; 
	this.flames.push(document.getElementById("flame1"));
	this.flames.push(document.getElementById("flame2"));
	this.flames.push(document.getElementById("flame3"));
	this.flameIndex = 0;

	this.smokes = []; 
	this.smokes.push(document.getElementById("smoke1"));
	this.smokes.push(document.getElementById("smoke2"));
	this.smokes.push(document.getElementById("smoke3"));
	this.smokeIndex = 0;

	this.fireball = document.getElementById("fireball");
}

Images.prototype.getNextFlame = function() {
	var currentIndex = this.flameIndex;
	this.flameIndex = (this.flameIndex + 1) % this.flames.length;
	return this.flames[currentIndex];
};

Images.prototype.getNextSmoke = function() {
	var currentIndex = this.smokeIndex;
	this.smokeIndex = (this.smokeIndex + 1) % this.smokes.length;
	return this.smokes[currentIndex];
};

Images.prototype.getFireball = function() {
	return this.fireball;
};

Images.prototype.getDefaultImage = function() {
	return this.defaultImage;
};

Images.prototype.getForestBackground = function() {
	return this.forestSmall;
}

Images.prototype.getGround = function() {
	return this.ground;
}

Images.prototype.getWalter = function() {
	return this.walter;
}

Images.prototype.getWalterPixel = function() {
	return this.walterPixel;
}

Images.prototype.getLeftWing = function() {
	return this.leftWing;
}

Images.prototype.getRightWing = function() {
	return this.rightWing;
}

Images.prototype.getLevelBackground = function() {
	return this.levelback;
}

Images.prototype.getSplashWalter = function() {
	return this.splashWalter;
}

Images.prototype.getOwlPixel = function() {
	return this.owlPixel;
}
