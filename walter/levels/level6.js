Level6.prototype = new Level();
Level6.prototype.constructor = Level6;

function Level6() {
	Level.call(this);

	this.name = "Level 6: Bomber Attack";
	this.description = "It's a trap!";

	this.numberDestroyed = 0;
	this.numberToFinish = 44;

	this.nextLevel = new Level7();
}

Level6.prototype.setup = function(scene) {
	var hugeMonster = new Monster();
	hugeMonster.health = 6;
	hugeMonster.affectedByGravity = true;
	hugeMonster.shouldWobble = false;
	hugeMonster.images = scene.game.getImages().getMonster1();

	var skyBomberTemplate = new Monster();
	skyBomberTemplate.health = 3;
	skyBomberTemplate.affectedByGravity = false;
	skyBomberTemplate.shouldWobble = true;
	skyBomberTemplate.monsterToSpawn = hugeMonster;
	skyBomberTemplate.monsterToSpawnDelay = 1.1;
	skyBomberTemplate.images = scene.game.getImages().getMonster2();

	{
		var size = Level.airSize * 1.5;
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(800 + size / 2, 80), new Vector(size, size), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, 0.2), 1.2, skyBomberTemplate));
		scene.addEntity(entity);
	}
}
