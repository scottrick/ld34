SceneComponent.prototype = new Component();
SceneComponent.prototype.constructor = SceneComponent;

SceneComponent.type = "scenecomponent";

/*
	A SceneComponent does work for the game scene.
*/
function SceneComponent(gamescene) {
	Component.call(this, SceneComponent.type);

	this.gamescene = gamescene;
}
