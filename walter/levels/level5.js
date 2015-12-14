Level5.prototype = new Level();
Level5.prototype.constructor = Level5;

function Level5() {
	Level.call(this);

	this.name = "Level 5: Combined Arms";
	this.description = "Here they come!";

	this.numberDestroyed = 0;
	this.numberToFinish = 72;

	this.nextLevel = new Level6();
}

Level5.prototype.setup = function(scene) {
	var easyMonster = new Monster();
	easyMonster.health = 2;
	easyMonster.affectedByGravity = true;
	easyMonster.shouldWobble = false;
	easyMonster.images = scene.game.getImages().getMonster1();

	var skyBomberTemplate = new Monster();
	skyBomberTemplate.health = 2;
	skyBomberTemplate.affectedByGravity = false;
	skyBomberTemplate.shouldWobble = true;
	skyBomberTemplate.monsterToSpawn = easyMonster;
	skyBomberTemplate.monsterToSpawnDelay = 1.1;
	skyBomberTemplate.images = scene.game.getImages().getMonster2();

	var skySweeperTemplate = new Monster();
	skySweeperTemplate.health = 2;
	skySweeperTemplate.affectedByGravity = false;
	skySweeperTemplate.shouldWobble = true;
	skySweeperTemplate.monsterToSpawnDelay = 0.7;
	skySweeperTemplate.images = scene.game.getImages().getMonster2();

	{
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(-Level.airSize / 2, 180), new Vector(-Level.airSize, Level.airSize), null, 6));
		entity.addComponent(new Spawner(new Vector(1, 0), 1.7, skyBomberTemplate));
		scene.addEntity(entity);
	}

	{
		var size = Level.airSize * 0.8;
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(800 + size / 2, 420), new Vector(size, size), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, 0.1), 1.1, skySweeperTemplate));
		scene.addEntity(entity);
	}
}
