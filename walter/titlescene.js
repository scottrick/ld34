TitleScene.prototype = new Scene();
TitleScene.prototype.constructor = TitleScene;

function TitleScene(game) {
	Scene.call(this, game);

	this.dumpDelay = 1;
    this.slowMotionSpeed = 0.05;

	this.setup();
}

TitleScene.prototype.setup = function() {
	
}
