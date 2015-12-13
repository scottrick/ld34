Level1.prototype = new Level();
Level1.prototype.constructor = Level1;

function Level1() {
	Level.call(this);

	this.numberDestroyed = 0;
	this.numberToFinish = 20;

	this.nextLevel = new Level2();
}

Level1.prototype.setup = function(scene) {
	{
		var entity = new Entity("ground monster spawner");	
		entity.addComponent(new Transform(new Vector(-24, 516), new Vector(-Level.groundSize, Level.groundSize), null, 6));
		entity.addComponent(new Spawner(new Vector(1, 0), 1.2, scene.game.getImages().getMonster1()));
		scene.addEntity(entity);
	}

	{
		var entity = new Entity("ground monster spawner");	
		entity.addComponent(new Transform(new Vector(824, 516), new Vector(Level.groundSize, Level.groundSize), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, 0), 1.2, scene.game.getImages().getMonster1()));
		scene.addEntity(entity);
	}

	// {
	// 	var entity = new Entity("air monster spawner");	
	// 	entity.addComponent(new Transform(new Vector(-24, 100), new Vector(-Level.airSize, Level.airSize), null, 6));
	// 	entity.addComponent(new Spawner(new Vector(1, 0), 2, scene.game.getImages().getMonster2()));
	// 	scene.addEntity(entity);
	// }

	// {
	// 	var entity = new Entity("air monster spawner");	
	// 	entity.addComponent(new Transform(new Vector(824, 160), new Vector(Level.airSize, Level.airSize), null, 6));
	// 	entity.addComponent(new Spawner(new Vector(-1, 0), 2, scene.game.getImages().getMonster2()));
	// 	scene.addEntity(entity);
	// }
}

Level1.prototype.monsterDestroyed = function(entity) {
	this.numberDestroyed++;

	this.progress = this.numberDestroyed / this.numberToFinish;
}