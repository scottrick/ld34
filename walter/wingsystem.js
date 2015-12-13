WingSystem.prototype = new System();
WingSystem.prototype.constructor = WingSystem;

/*
	The WingSystem handles waving the owl's wings.
*/
function WingSystem() {
	System.call(this, [Wing.type, Transform.type]);
}

WingSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];
	var wing = entity.components[Wing.type];

	if (wing.isWaving) {
		wing.currentDuration += deltaTime;
		if (wing.currentDuration >= wing.waveDuration) {
			wing.currentDuration = wing.waveDuration;
			wing.isWaving = false;
			wing.isRetracting = true;
		}

		transform.position.x = wing.baseTransform.position.x + wing.currentDuration / wing.waveDuration * wing.waveDeltaX; 
	}
	else if (wing.isRetracting) {
		wing.currentDuration -= deltaTime;
		if (wing.currentDuration <= 0) {
			wing.currentDuration = 0;
			wing.isWaving = false;
			wing.isRetracting = false;
		}

		transform.position.x = wing.baseTransform.position.x + wing.currentDuration / wing.waveDuration * wing.waveDeltaX; 
	}
}
