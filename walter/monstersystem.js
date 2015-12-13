MonsterSystem.prototype = new System();
MonsterSystem.prototype.constructor = MonsterSystem;

/*
	The MonsterSystem manages the monsters
*/
function MonsterSystem() {
	System.call(this, [Monster.type, Transform.type, Drawable.type]);
}

MonsterSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];
	var monster = entity.components[Monster.type];
	var drawable = entity.components[Drawable.type];

	/* MUST BE ANIMATED DRAWABLE */
	drawable.timeToNextImage -= deltaTime;

	if (drawable.timeToNextImage <= 0) {
		drawable.nextImage();
	}
}
