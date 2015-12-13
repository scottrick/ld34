WalterSystem.prototype = new System();
WalterSystem.prototype.constructor = WalterSystem;

/*
	The WalterSystem handles walter logic.
*/
function WalterSystem() {
	System.call(this, [Walter.type]);
}

WalterSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var walter = entity.components[Walter.type];

	/* update our right down state variables */
	if (walter.rightDown) {
		walter.rightDownDuration += deltaTime;

		if (walter.rightDownDuration >= Walter.channelStartDuration) {
			/* start channeling */
		}
	}

	if (walter.leftDown) {
		walter.leftDownDuration += deltaTime;

		if (walter.leftDownDuration >= Walter.channelStartDuration) {
			/* start channeling */
		}
	}
}
