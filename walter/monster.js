Monster.prototype = new Component();
Monster.prototype.constructor = Monster;

Monster.type = "monster";

function Monster() {
	Component.call(this, Monster.type);

	this.health = 2;
}
