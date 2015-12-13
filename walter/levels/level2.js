Level2.prototype = new Level();
Level2.prototype.constructor = Level2;

function Level2() {
	Level.call(this);

	// this.nextLevel = new Level3();
}

Level2.prototype.setup = function(scene) {
	// {
	// 	var entity = new Entity("ground monster spawner");	
	// 	entity.addComponent(new Transform(new Vector(-24, 516), new Vector(-Level.groundSize, Level.groundSize), null, 6));
	// 	entity.addComponent(new Spawner(new Vector(1, 0), 2, scene.game.getImages().getMonster1()));
	// 	scene.addEntity(entity);
	// }

	// {
	// 	var entity = new Entity("ground monster spawner");	
	// 	entity.addComponent(new Transform(new Vector(824, 516), new Vector(Level.groundSize, Level.groundSize), null, 6));
	// 	entity.addComponent(new Spawner(new Vector(-1, 0), 2, scene.game.getImages().getMonster1()));
	// 	scene.addEntity(entity);
	// }

	{
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(-24, 100), new Vector(-Level.airSize, Level.airSize), null, 6));
		entity.addComponent(new Spawner(new Vector(1, 0), 2, scene.game.getImages().getMonster2()));
		scene.addEntity(entity);
	}

	{
		var entity = new Entity("air monster spawner");	
		entity.addComponent(new Transform(new Vector(824, 160), new Vector(Level.airSize, Level.airSize), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, 0), 2, scene.game.getImages().getMonster2()));
		scene.addEntity(entity);
	}
}

Level2.prototype.monsterDestroyed = function(entity) {
	
}
