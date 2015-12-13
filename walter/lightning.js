Lightning.prototype = new Component();
Lightning.prototype.constructor = Lightning;

Lightning.type = "lightning";

Lightning.lightningBaseSpeed = 8000;
Lightning.lightningVariableSpeed = 4000;
Lightning.lightningWidth = 30;

function Lightning() {
	Component.call(this, Lightning.type);

	this.timeToLive = 0.075;
}
