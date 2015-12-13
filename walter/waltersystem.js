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

	/*********************************************/
	/* update our RIGHT side */
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

	walter.rightWing.realTransform.rotation = walter.rightChannelAngle - walter.rightChannelAngleStart;

	var dir = walter.dirForAngle(walter.rightChannelAngle);
	walter.rightChannelingTargetPos.x = transform.position.x + dir.x * 48;
	walter.rightChannelingTargetPos.y = transform.position.y + dir.y * 48;

	/*********************************************/
	/* update our LEFT side */
	if (walter.leftDown) {
		walter.leftDownDuration += deltaTime;

		if (walter.leftChanneling) {
			//going up
			walter.leftChannelAngle += walter.leftChannelAngleUpSpeed * deltaTime;

			if (walter.leftChannelAngle >= walter.leftChannelAngleEnd) {
				walter.leftChannelAngle = walter.leftChannelAngleEnd;
			}
		}
		
		if (!walter.leftChanneling && walter.leftDownDuration >= Walter.channelStartDuration) {
			/* start channeling */
			walter.startChannelingLeft(entity);
		}
	}
	else {
		//falling down
		walter.leftChannelAngle += walter.leftChannelAngleDownSpeed * deltaTime;

		if (walter.leftChannelAngle <= walter.leftChannelAngleStart) {
			walter.leftChannelAngle = walter.leftChannelAngleStart;
		}
	}

	walter.leftWing.realTransform.rotation = walter.leftChannelAngle - walter.leftChannelAngleStart;

	var dir = walter.dirForAngle(walter.leftChannelAngle);
	walter.leftChannelingTargetPos.x = transform.position.x + dir.x * 48;
	walter.leftChannelingTargetPos.y = transform.position.y + dir.y * 48;
}
