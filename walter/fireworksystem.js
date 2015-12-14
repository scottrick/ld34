FireworkSystem.prototype = new System();
FireworkSystem.prototype.constructor = FireworkSystem;

/*
	The FireworkSystem handles fireworks?
*/
function FireworkSystem() {
	System.call(this, [Fireworks.type]);
}

FireworkSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var fireworks = entity.components[Fireworks.type];

	fireworks.currentTime -= deltaTime;
	if (fireworks.currentTime <= 0) {
		fireworks.currentTime += fireworks.min + fireworks.delay * Math.random();

		var xPosition = 100 + Math.random() * 600;
		var yPosition = 20 + Math.random() * 280;
		var scale = 20 + Math.random() * 32;
		var transform = new Transform(new Vector(xPosition, yPosition), new Vector(scale, scale), 0, -14);

		//explode firework!
		var lightningExplosionEntity = new Entity("firework");
		lightningExplosionEntity.addComponent(new Explosion(0, 8, "lightning"));
		lightningExplosionEntity.addComponent(transform);
		scene.addEntity(lightningExplosionEntity);

		var fireExplosionEntity = new Entity("firework");
		fireExplosionEntity.addComponent(new Explosion(0, 8, "fire"));
		fireExplosionEntity.addComponent(transform);
		scene.addEntity(fireExplosionEntity);
	}
}
