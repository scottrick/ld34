Monster.prototype = new Component();
Monster.prototype.constructor = Monster;

Monster.type = "monster";

function Monster() {
	Component.call(this, Monster.type);

	this.health = 2;
}

Monster.prototype.isAlive = function() {
	return this.health > 0;
}