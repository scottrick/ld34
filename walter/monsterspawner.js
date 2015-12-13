MonsterSpawnSystem.prototype = new System();
MonsterSpawnSystem.prototype.constructor = MonsterSpawnSystem;

/*
	MonsterSpawnSystem handles spawning new entities.
*/
function MonsterSpawnSystem() {
	System.call(this, [Spawner.type, Transform.type]);
}

MonsterSpawnSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var spawner = entity.components[Spawner.type];
	var transform = entity.components[Transform.type];

	spawner.currentDelay -= deltaTime;

	while (spawner.currentDelay <= 0) {
		spawner.currentDelay += spawner.delay;

		//spawn
		var monsterEntity = new Entity("spawned monster");
		var velocity = spawner.direction.copy();
		velocity.multiply(100);

		var movement = new Movement(velocity);
		var drawable = new AnimatedDrawable(spawner.images);
		var body = new CircleBody();

		// entity.addComponent(new Transform(new Vector(150, 516), new Vector(-48, 48), null, 6));
		// entity.addComponent(new Monster());
		// entity.addComponent(new Movement(new Vector(12, 0)));
		// entity.addComponent(new AnimatedDrawable(this.game.getImages().getMonster1()));
		// entity.addComponent(new CircleBody());

		monsterEntity.addComponent(new Transform(transform.position.copy(), transform.scale.copy(), null, 6));
		monsterEntity.addComponent(new Monster());
		monsterEntity.addComponent(movement);
		monsterEntity.addComponent(drawable);
		monsterEntity.addComponent(body);

		scene.addEntity(monsterEntity);
	}
}
