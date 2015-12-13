/* 
	Level 

	A level sets up the game scene with spawners and such.
	A level also detects when victory is reached!

	A level has a name.
	A level has description text!
*/
var Level = function() {
	this.name = "level name";
	this.description = "description text";

	this.progress = 0.0;
};

/* setup this level on the given scene */
Level.prototype.setup = function(scene) {
	console.log("NEED CUSTOM SETUP");
};
