GameScene.prototype = new Scene();
GameScene.prototype.constructor = GameScene;

function GameScene(game) {
	Scene.call(this, game);

	this.dumpDelay = 1;
    this.slowMotionSpeed = 0.05;

	this.setup();
}

GameScene.prototype.handleKeyDown = function(key) {

}

GameScene.prototype.handleKeyUp = function(key) {
	console.log("key: " + key);

	if (key == 72) { // h
		this.showHelp();
	}
}

GameScene.prototype.showHelp = function() {
	
}

GameScene.prototype.setup = function() {
	{
		var titleTextEntity = new Entity("title text");	
		titleTextEntity.addComponent(new Transform(new Vector(400, 300), null, -6));
		var textComponent = new TextDrawable("GAME SCENE");
		textComponent.font = "72px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;

		// textComponent.fontColor = "#C8B560";
		textComponent.alignment = "center"
		titleTextEntity.addComponent(textComponent);
		this.addEntity(titleTextEntity);
	}
}
