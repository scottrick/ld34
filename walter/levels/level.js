/* 
	Level 

	A level sets up the game scene with spawners and such.
	A level also detects when victory is reached!

	A level has a name.
	A level has description text!
*/

var Level = function() {
	this.scene = null;

	this.name = "level name";
	this.description = "description text";

	this.showHelp = false;

	this.progress = 0.0;

	/* defaults */
	this.numberDestroyed = 0;
	this.numberToFinish = 20;

	this.nextLevel = null;
};

Level.groundSize = 48;
Level.airSize = 60;

/* setup this level on the given scene */
Level.prototype.setup = function(scene) {

};

Level.prototype.monsterDestroyed = function(entity) {
	this.numberDestroyed++;

	this.progress = this.numberDestroyed / this.numberToFinish;
}

Level.prototype.getProgress = function() {
	if (this.progress > 1.0) {
		return 1.0;
	}
	if (this.progress < 0.0) {
		return 0.0;
	}

	return this.progress;
}

Level.prototype.isComplete = function() {
	return this.getProgress() >= 1.0;
}
