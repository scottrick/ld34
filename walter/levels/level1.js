Level1.prototype = new Level();
Level1.prototype.constructor = Level1;

function Level1() {
	Level.call(this);

	this.showHelp = true;

	this.name = "Level 1: Skirmish";
	this.description = "Survive!";

	this.numberDestroyed = 0;
	this.numberToFinish = 20;

	this.nextLevel = new Level2();
}

Level1.prototype.setup = function(scene) {
	var monsterTemplate = new Monster();
	monsterTemplate.health = 2;
	monsterTemplate.affectedByGravity = true;
	monsterTemplate.images = scene.game.getImages().getMonster1();

	{
		var entity = new Entity("ground monster spawner");	
		entity.addComponent(new Transform(new Vector(-Level.airSize / 2, 516), new Vector(-Level.groundSize, Level.groundSize), null, 6));
		entity.addComponent(new Spawner(new Vector(1, 0), 1.2, monsterTemplate));
		scene.addEntity(entity);
	}

	{
		var entity = new Entity("ground monster spawner");	
		entity.addComponent(new Transform(new Vector(800 + Level.airSize / 2, 516), new Vector(Level.groundSize, Level.groundSize), null, 6));
		entity.addComponent(new Spawner(new Vector(-1, 0), 1.2, monsterTemplate));
		scene.addEntity(entity);
	}
}
