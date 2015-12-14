Level7.prototype = new Level();
Level7.prototype.constructor = Level7;

function Level7() {
	Level.call(this);

	this.name = "Level 7: The Big Boy";
	this.description = "Hold on to your butts!";

	this.numberDestroyed = 0;
	this.numberToFinish = 64;

	// this.nextLevel = new Level7();
}

Level7.prototype.setup = function(scene) {
	var megaMonster = new Monster();
	megaMonster.health = 24;
	megaMonster.affectedByGravity = true;
	megaMonster.shouldWobble = false;
	megaMonster.images = scene.game.getImages().getMonster1();

	var dropMonster = new Monster();
	dropMonster.health = 3;
	dropMonster.affectedByGravity = true;
	dropMonster.shouldWobble = false;
	dropMonster.images = scene.game.getImages().getMonster1();

	var skyBomberTemplate = new Monster();
	skyBomberTemplate.health = 3;
	skyBomberTemplate.affectedByGravity = false;
	skyBomberTemplate.shouldWobble = true;
	skyBomberTemplate.monsterToSpawn = dropMonster;
	skyBomberTemplate.monsterToSpawnDelay = 1.2;
	skyBomberTemplate.images = scene.game.getImages().getMonster2();

	{
		var size = Level.airSize * 2;
		var entity = new Entity("mega monster spawner");	
		entity.addComponent(new Transform(new Vector(-size / 2, 400), new Vector(-size, size), null, 6));
		entity.addComponent(new Spawner(new Vector(1.1, 0), 8, megaMonster));
		scene.addEntity(entity);
	}

	{
		var size = Level.airSize;
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(800 + size / 2, 400), new Vector(size, size), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, -0.3), 1.2, skyBomberTemplate));
		scene.addEntity(entity);
	}
}
