MonsterSystem.prototype = new System();
MonsterSystem.prototype.constructor = MonsterSystem;

MonsterSystem.groundY = 540;

/*
	The MonsterSystem manages the monsters
*/
function MonsterSystem() {
	System.call(this, [Monster.type, Transform.type, Drawable.type]);
}

MonsterSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];
	var monster = entity.components[Monster.type];
	var drawable = entity.components[Drawable.type];
	var movement = entity.components[Movement.type];

	/* MUST BE ANIMATED DRAWABLE */
	drawable.timeToNextImage -= deltaTime;

	if (drawable.timeToNextImage <= 0) {
		drawable.nextImage();
	}

	if (monster.affectedByGravity) {
		var pos = transform.position;

		if (pos.y + transform.scale.y / 2 < MonsterSystem.groundY) {
			pos.y += 800 * deltaTime;
		}

		if (pos.y + transform.scale.y / 2 > MonsterSystem.groundY) {
			pos.y = MonsterSystem.groundY - transform.scale.y / 2;
		}
	}

	if (monster.shouldWobble) {
		var pos = transform.position;
		pos.y += Math.sin(pos.x / 50);
	}

	if (monster.monsterToSpawn != null) {
		// monster.monsterToSpawnDelay = 4;
		monster.timeTillSpawn -= deltaTime;

		if (monster.timeTillSpawn <= 0) {
			/* spawn a monster! */
			var monsterEntity = new Entity("spawned monster");
			var velocity = movement.velocity.copy();
			velocity.multiply(0.6 * Math.random() + 0.4);

			var movement = new Movement(velocity);
			var drawable = new AnimatedDrawable(monster.monsterToSpawn.images);
			var body = new CircleBody();

			var newMonster = new Monster();
			newMonster.fromMonster(monster.monsterToSpawn);

			var newScale = transform.scale.copy();
			newScale.multiply(0.2 * (Math.random() - 0.5) + 0.9);

			monsterEntity.addComponent(new Transform(transform.position.copy(), newScale, null, 6));
			monsterEntity.addComponent(newMonster);
			monsterEntity.addComponent(movement);
			monsterEntity.addComponent(drawable);
			monsterEntity.addComponent(body);

			scene.addEntity(monsterEntity);

			if (monster.shouldRepeatSpawn) {
				monster.timeTillSpawn += monster.monsterToSpawnDelay;
			}
			else {
				monster.monsterToSpawn = null;
			}
		}
	}
}
