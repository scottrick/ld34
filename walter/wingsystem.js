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
		var newPosition = wing.baseTransform.position.copy();

		wing.currentDuration += deltaTime;
		if (wing.currentDuration >= wing.waveDuration) {
			wing.currentDuration = wing.waveDuration;
			wing.isWaving = false;
			wing.isRetracting = true;
		}

		newPosition.x += wing.currentDuration / wing.waveDuration * wing.waveDeltaX;

		transform.position = newPosition;
	}
	else if (wing.isRetracting) {
		var newPosition = wing.baseTransform.position.copy();

		wing.currentDuration -= deltaTime;
		if (wing.currentDuration <= 0) {
			wing.currentDuration = 0;
			wing.isWaving = false;
			wing.isRetracting = false;
		}

		newPosition.x += wing.currentDuration / wing.waveDuration * wing.waveDeltaX;

		transform.position = newPosition;
	}
}
