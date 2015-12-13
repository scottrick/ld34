Level1.prototype = new Level();
Level1.prototype.constructor = Level1;

function Level1() {
	Level.call(this);

	this.nextLevel = new Level2();
}
