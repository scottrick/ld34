Level2.prototype = new Level();
Level2.prototype.constructor = Level2;

function Level2() {
	Level.call(this);

	this.name = "Level 2: Air Raid";
	this.description = "Defeat the airborne enemies!";

	this.numberDestroyed = 0;
	this.numberToFinish = 16;

	// this.nextLevel = new Level3();
}

Level2.prototype.setup = function(scene) {
	{
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(-Level.airSize / 2, 100), new Vector(-Level.airSize, Level.airSize), null, 6));
		entity.addComponent(new Spawner(new Vector(1, 0), 1.4, scene.game.getImages().getMonster2()));
		scene.addEntity(entity);
	}

	{
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(800 + Level.airSize / 2, 160), new Vector(Level.airSize, Level.airSize), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, 0), 1.4, scene.game.getImages().getMonster2()));
		scene.addEntity(entity);
	}
}

Level2.prototype.monsterDestroyed = function(entity) {
	this.numberDestroyed++;

	this.progress = this.numberDestroyed / this.numberToFinish;
}
