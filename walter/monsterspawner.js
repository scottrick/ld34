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
		var drawable = new AnimatedDrawable(spawner.monster.images);
		var body = new CircleBody();

		var monster = new Monster();
		monster.fromMonster(spawner.monster);

		var newScale = transform.scale.copy();
		newScale.multiply(0.2 * (Math.random() - 0.5) + 0.9);

		monsterEntity.addComponent(new Transform(transform.position.copy(), newScale, null, 6));
		monsterEntity.addComponent(monster);
		monsterEntity.addComponent(movement);
		monsterEntity.addComponent(drawable);
		monsterEntity.addComponent(body);

		scene.addEntity(monsterEntity);
	}
}
