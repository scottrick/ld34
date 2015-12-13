function Sounds(document) {
	this.fireballSounds = []; 
	this.fireballSounds.push(document.getElementById("fireball1"));
	this.fireballSounds.push(document.getElementById("fireball2"));
	this.fireballSounds.push(document.getElementById("fireball3"));
	this.fireballSounds.push(document.getElementById("fireball4"));

	this.fireballSoundIndex = 0;

	this.lightningSounds = [];
	this.lightningSounds.push(document.getElementById("bumble1"));
	this.lightningSounds.push(document.getElementById("bumble2"));
	this.lightningSounds.push(document.getElementById("bumble3"));
	this.lightningSoundsIndex = 0;

	this.explodeSounds = [];
	this.explodeSounds.push(document.getElementById("explode1"));
	this.explodeSounds.push(document.getElementById("explode2"));
	this.explodeSounds.push(document.getElementById("explode3"));
	this.explodeSoundsIndex = 0;

	for (var i = 0; i < this.explodeSounds.length; i++) {
		var sound = this.explodeSounds[i];
		sound.volume = 0.2;
	}

	for (var i = 0; i < this.fireballSounds.length; i++) {
		var sound = this.fireballSounds[i];
		sound.volume = 0.2;
	}

	for (var i = 0; i < this.lightningSounds.length; i++) {
		var sound = this.lightningSounds[i];
		sound.volume = 0.2;
	}

	this.titleTrack = document.getElementById("titleTrack");
	this.gameTrack = document.getElementById("gameTrack");
}

Sounds.prototype.getNextFireballSound = function() {
	var currentIndex = this.fireballSoundIndex;
	this.fireballSoundIndex = (this.fireballSoundIndex + 1) % this.fireballSounds.length;
	return this.fireballSounds[currentIndex];
};

Sounds.prototype.getNextLightningSound = function() {
	var currentIndex = this.lightningSoundsIndex;
	this.lightningSoundsIndex = (this.lightningSoundsIndex + 1) % this.lightningSounds.length;
	return this.lightningSounds[currentIndex];
};

Sounds.prototype.getNextExplodeSound = function() {
	var currentIndex = this.explodeSoundsIndex;
	this.explodeSoundsIndex = (this.explodeSoundsIndex + 1) % this.explodeSounds.length;
	return this.explodeSounds[currentIndex];
};

Sounds.prototype.getTitleTrack = function() {
	this.titleTrack.volume = 0.5;
	return this.titleTrack;
}

Sounds.prototype.getGameTrack = function() {
	this.gameTrack.volume = 0.5;
	return this.gameTrack;
}
