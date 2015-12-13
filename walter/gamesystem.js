GameSystem.prototype = new System();
GameSystem.prototype.constructor = GameSystem;

/*
	The GameSystem gamescene stuff
*/
function GameSystem() {
	System.call(this, [SceneComponent.type]);
}

GameSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var sceneComponent = entity.components[SceneComponent.type];
	var gameScene = sceneComponent.gamescene;

	if (!gameScene.hasStarted) {
		gameScene.timeToStart -= deltaTime;

		if (gameScene.timeToStart <= 0) {
			gameScene.start();
		}
	}
}
