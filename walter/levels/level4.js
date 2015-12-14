Level4.prototype = new Level();
Level4.prototype.constructor = Level4;

function Level4() {
	Level.call(this);

	this.name = "Level 4: Pincer Strike";
	this.description = "Here they come!";

	this.numberDestroyed = 0;
	this.numberToFinish = 50;

	this.nextLevel = new Level5();
}

Level4.prototype.setup = function(scene) {
	var easyMonster = new Monster();
	easyMonster.health = 1;
	easyMonster.affectedByGravity = true;
	easyMonster.shouldWobble = false;
	easyMonster.images = scene.game.getImages().getMonster1();

	var skyMonsterTemplate = new Monster();
	skyMonsterTemplate.health = 2;
	skyMonsterTemplate.affectedByGravity = false;
	skyMonsterTemplate.shouldWobble = true;
	skyMonsterTemplate.monsterToSpawn = easyMonster;
	skyMonsterTemplate.monsterToSpawnDelay = 1;
	skyMonsterTemplate.images = scene.game.getImages().getMonster2();

	var groundTank = new Monster();
	groundTank.health = 10;
	groundTank.affectedByGravity = true;
	groundTank.shouldWobble = false;
	groundTank.images = scene.game.getImages().getMonster1();

	{
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(-Level.airSize / 2, 100), new Vector(-Level.airSize, Level.airSize), null, 6));
		entity.addComponent(new Spawner(new Vector(1, 0), 1.2, skyMonsterTemplate));
		scene.addEntity(entity);
	}

	{
		var entity = new Entity("ground monster spawner");	
		entity.addComponent(new Transform(new Vector(800 + Level.airSize / 2, 500), new Vector(Level.airSize * 1.2, Level.airSize * 1.2), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, 0), 3.5, groundTank));
		scene.addEntity(entity);
	}
}
