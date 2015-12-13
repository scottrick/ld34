SparkSystem.prototype = new System();
SparkSystem.prototype.constructor = SparkSystem;

/*
	The SparkSystem handles sparks
*/
function SparkSystem() {
	System.call(this, [Spark.type]);
}

SparkSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var drawable = entity.components[Drawable.type];
	var spark = entity.components[Spark.type];

	spark.life -= deltaTime;

	if (spark.life <= 0) {
		//remove
		scene.removeEntity(entity);
		return;
	}

	var percent = spark.life / spark.maxLife;
	drawable.alpha = percent;
}
