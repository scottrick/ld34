function Images(document) {
	this.defaultImage = document.getElementById("defaultImageId");

	this.splashWalter = document.getElementById("splashWalter");

	this.forestSmall = document.getElementById("forestSmall");
}

Images.prototype.getDefaultImage = function() {
	return this.defaultImage;
};

Images.prototype.getForestBackground = function() {
	return this.forestSmall;
}

Images.prototype.getSplashWalter = function() {
	return this.splashWalter;
}