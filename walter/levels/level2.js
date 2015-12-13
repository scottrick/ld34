Level2.prototype = new Level();
Level2.prototype.constructor = Level2;

function Level2() {
	Level.call(this);

	// this.nextLevel = new Level3();
}
