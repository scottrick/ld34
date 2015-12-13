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
	var transform = entity.components[Transform.type];

	/* update our right down state variables */
	if (walter.rightDown) {
		walter.rightDownDuration += deltaTime;

		if (walter.rightChanneling) {
			//going up
			walter.rightChannelAngle += walter.rightChannelAngleUpSpeed * deltaTime;

			if (walter.rightChannelAngle <= walter.rightChannelAngleEnd) {
				walter.rightChannelAngle = walter.rightChannelAngleEnd;
			}
		}
		
		if (!walter.rightChanneling && walter.rightDownDuration >= Walter.channelStartDuration) {
			/* start channeling */
			walter.startChannelingRight(entity);
		}
	}
	else {
		//falling down
		walter.rightChannelAngle += walter.rightChannelAngleDownSpeed * deltaTime;

		if (walter.rightChannelAngle >= walter.rightChannelAngleStart) {
			walter.rightChannelAngle = walter.rightChannelAngleStart;
		}
	}

	var dir = walter.dirForAngle(walter.rightChannelAngle);
	walter.rightChannelingTargetPos.x = transform.position.x + dir.x * 48;
	walter.rightChannelingTargetPos.y = transform.position.y + dir.y * 48;

	if (walter.leftDown) {
		walter.leftDownDuration += deltaTime;

		if (walter.leftDownDuration >= Walter.channelStartDuration) {
			/* start channeling */
		}
	}
}
