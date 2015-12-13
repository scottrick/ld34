function Images(document) {
	this.defaultImage = document.getElementById("defaultImageId");

	this.splashWalter = document.getElementById("splashWalter");

	this.forestSmall = document.getElementById("forestSmall");
	this.ground = document.getElementById("ground");
	this.levelback = document.getElementById("levelback");
	this.backwardsR = document.getElementById("backwardsR");
	this.owlPixel = document.getElementById("owlPixel");
	this.walter = document.getElementById("walter");
	this.walterPixel = document.getElementById("walterPixel");
	this.leftWing = document.getElementById("leftWing2");
	this.rightWing = document.getElementById("rightWing2");
	this.fireFeather = document.getElementById("fireFeather");
	this.wand = document.getElementById("wand");

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

	this.monster1 = []; 
	this.monster1.push(document.getElementById("monster1_1"));
	this.monster1.push(document.getElementById("monster1_2"));

	this.monster2 = []; 
	this.monster2.push(document.getElementById("monster2_1"));
	this.monster2.push(document.getElementById("monster2_2"));

	this.spark = document.getElementById("spark");
	this.lightning = document.getElementById("lightning");
	this.fireball = document.getElementById("fireball");
}

Images.prototype.getMonster1 = function() {
	return this.monster1;
}

Images.prototype.getMonster2 = function() {
	return this.monster2;
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

Images.prototype.getSpark = function() {
	return this.spark;
};

Images.prototype.getLightning = function() {
	return this.lightning;
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

Images.prototype.getFireFeather = function() {
	return this.fireFeather;
}

Images.prototype.getWand = function() {
	return this.wand;
}

Images.prototype.getLevelBackground = function() {
	return this.levelback;
}

Images.prototype.getBackwardsR = function() {
	return this.backwardsR;
}

Images.prototype.getSplashWalter = function() {
	return this.splashWalter;
}

Images.prototype.getOwlPixel = function() {
	return this.owlPixel;
}
