function Images(document) {
	this.defaultImage = document.getElementById("defaultImageId");

	this.splashWalter = document.getElementById("splashWalter");

	this.forestSmall = document.getElementById("forestSmall");
	this.ground = document.getElementById("ground");
	this.levelback = document.getElementById("levelback");
	this.owlPixel = document.getElementById("owlPixel");
	this.walter = document.getElementById("walter");
}

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

Images.prototype.getLevelBackground = function() {
	return this.levelback;
}

Images.prototype.getSplashWalter = function() {
	return this.splashWalter;
}

Images.prototype.getOwlPixel = function() {
	return this.owlPixel;
}
