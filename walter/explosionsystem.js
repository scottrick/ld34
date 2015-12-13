ExplosionSystem.prototype = new System();
ExplosionSystem.prototype.constructor = ExplosionSystem;

/*
	The ExplosionSystem handles burning fires and producing flames.
*/
function ExplosionSystem() {
	System.call(this, [Explosion.type, Transform.type]);
}

ExplosionSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];
	var explosion = entity.components[Explosion.type];

	explosion.delay -= deltaTime;

	if (explosion.delay <= 0) {
		explosion.explode(transform, scene);
		scene.removeEntity(entity);
	}
}
