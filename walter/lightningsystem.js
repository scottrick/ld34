LightningSystem.prototype = new System();
LightningSystem.prototype.constructor = LightningSystem;

/*
	The LightningSystem handles lightning
*/
function LightningSystem() {
	System.call(this, [Lightning.type]);
}

LightningSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];
	var lightning = entity.components[Lightning.type];

	lightning.timeToLive -= deltaTime;

	if (lightning.timeToLive <= 0) {
		scene.removeEntity(entity);
	}
}
