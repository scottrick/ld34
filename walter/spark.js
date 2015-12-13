Spark.prototype = new Component();
Spark.prototype.constructor = Spark;

Spark.type = "spark";

Spark.minLife = 0.05;
Spark.lifeRandom = 0.15;

function Spark(scale) {
	Component.call(this, Spark.type);

	this.randomLife();
}

Spark.prototype.randomLife = function() {
	this.life = Spark.minLife + Math.random() * Spark.lifeRandom;
	this.maxLife = this.life;
}
