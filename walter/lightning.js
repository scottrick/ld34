Lightning.prototype = new Component();
Lightning.prototype.constructor = Lightning;

Lightning.type = "lightning";

Lightning.lightningSpeed = 10000;
Lightning.lightningWidth = 36;

function Lightning() {
	Component.call(this, Lightning.type);

	this.timeToLive = 0.075;
}
