FireSystem.prototype = new System();
FireSystem.prototype.constructor = FireSystem;

/*
	The FireSystem handles burning fires and producing flames.
*/
function FireSystem() {
	System.call(this, [Fire.type, Transform.type]);
}

FireSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];
	var fire = entity.components[Fire.type];

	fire.currentFlameTime += deltaTime;
	fire.currentSmokeTime += deltaTime;

	if (fire.currentFlameTime >= fire.timeToFlame) {
		fire.currentFlameTime = 0;
		fire.flame(scene, transform);
	}

	if (fire.currentSmokeTime >= fire.timeToSmoke) {
		fire.currentSmokeTime = 0;
		fire.smoke(scene, transform);
	}
}
