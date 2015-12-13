Monster.prototype = new Component();
Monster.prototype.constructor = Monster;

Monster.type = "monster";

function Monster() {
	Component.call(this, Monster.type);

	this.health = 1;
	this.affectedByGravity = false;
	this.shouldWobble = false;
	this.images = null;

	this.monsterToSpawn = null;
	this.monsterToSpawnDelay = 10;
	this.shouldRepeatSpawn = false;
	this.timeTillSpawn = this.monsterToSpawnDelay;
}

Monster.prototype.isAlive = function() {
	return this.health > 0;
}

Monster.prototype.fromMonster = function(monster) {
	this.health = monster.health;
	this.affectedByGravity = monster.affectedByGravity;
	this.shouldWobble = monster.shouldWobble;
	this.images = monster.images;

	this.monsterToSpawn = monster.monsterToSpawn;
	
	/* randomize the spawn delay */
	var percent = 0.2;
	this.monsterToSpawnDelay = Math.random(monster.monsterToSpawnDelay * percent) + monster.monsterToSpawnDelay * (1 - percent);

	/* set current delay to the spawn delay */
	this.timeTillSpawn = this.monsterToSpawnDelay;
}
