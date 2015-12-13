Wing.prototype = new Component();
Wing.prototype.constructor = Wing;

Wing.type = "wing";

function Wing(baseTransform, realTransform) {
	Component.call(this, Wing.type);

	this.baseTransform = baseTransform;
	this.realTransform = realTransform;

	this.isWaving = false;
	this.isRetracting = false;

	this.currentDuration = 0;
	this.waveDuration = 0.1;

	this.waveDeltaX = 5;
}

Wing.prototype.wave = function () {
	this.isWaving = true;
	this.isRetracting = false;
}

Wing.prototype.channel = function() {

}