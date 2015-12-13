Level3.prototype = new Level();
Level3.prototype.constructor = Level3;

function Level3() {
	Level.call(this);

	this.name = "Level 3: Air Raid, Part Deux";
	this.description = "Another sky assault, but with friends!";

	this.numberDestroyed = 0;
	this.numberToFinish = 32;

	// this.nextLevel = new Level4();
}

Level3.prototype.setup = function(scene) {
	var easyMonster = new Monster();
	easyMonster.health = 1;
	easyMonster.affectedByGravity = true;
	easyMonster.shouldWobble = false;
	easyMonster.images = scene.game.getImages().getMonster1();

	var monsterTemplate = new Monster();
	monsterTemplate.health = 2;
	monsterTemplate.affectedByGravity = false;
	monsterTemplate.shouldWobble = true;
	monsterTemplate.monsterToSpawn = easyMonster;
	monsterTemplate.monsterToSpawnDelay = 1;
	monsterTemplate.images = scene.game.getImages().getMonster2();

	{
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(-Level.airSize / 2, 100), new Vector(-Level.airSize, Level.airSize), null, 6));
		entity.addComponent(new Spawner(new Vector(1, 0), 1.4, monsterTemplate));
		scene.addEntity(entity);
	}

	{
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(800 + Level.airSize / 2, 160), new Vector(Level.airSize, Level.airSize), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, 0), 1.4, monsterTemplate));
		scene.addEntity(entity);
	}
}
