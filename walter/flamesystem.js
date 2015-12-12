FlameSystem.prototype = new System();
FlameSystem.prototype.constructor = FlameSystem;

/*
	The FlameSystem handles updating and removing flames.
*/
function FlameSystem() {
	System.call(this, [Flame.type, Transform.type]);
}

FlameSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];
	var flame = entity.components[Flame.type];

	flame.life -= deltaTime;

	if (flame.life <= 0) {
		//remove
		scene.removeEntity(entity);
		return;
	}

	var percent = flame.life / flame.maxLife;

	transform.scale = flame.startingScale.copy();
	transform.scale.multiply(percent);
}
