TitleScene.prototype = new Scene();
TitleScene.prototype.constructor = TitleScene;

function TitleScene(game) {
	Scene.call(this, game);

	Game.fpsDisplayEnabled = false;

	this.dumpDelay = 1;
    this.slowMotionSpeed = 0.05;

	this.setup();
}

TitleScene.prototype.handleKeyDown = function(key) {

}

TitleScene.prototype.handleKeyUp = function(key) {
	if (key == 32) {
		//SPACEBAR start the game at the first level
		// this.game.setNextScene(new GameScene(this.game, new Level1()));
		this.game.setNextScene(new VictoryScene(this.game));
	}
}

TitleScene.prototype.setup = function() {
	this.addSystem(new FireSystem());
	this.addSystem(new FlameSystem());
	this.addSystem(new MovementSystem());

	{
		var titleTextEntity = new Entity("title text");	
		titleTextEntity.addComponent(new Transform(new Vector(400, 150), null, -5));
		var textComponent = new TextDrawable("Walte  the Wise");
		textComponent.font = "72px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;

		// textComponent.fontColor = "#C8B560";
		textComponent.alignment = "center"
		titleTextEntity.addComponent(textComponent);
		this.addEntity(titleTextEntity);
	}

	{
		var subtitleTextEntity = new Entity("subtitle text");	
		subtitleTextEntity.addComponent(new Transform(new Vector(400, 224), null, 0));
		var textComponent = new TextDrawable("Wizard for Hire");
		textComponent.font = "40px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;
		textComponent.alignment = "center"
		subtitleTextEntity.addComponent(textComponent);
		this.addEntity(subtitleTextEntity);
	}

	{
		var entity = new Entity("start game text");	
		entity.addComponent(new Transform(new Vector(20, 440), null, 0));
		var textComponent = new TextDrawable("Press [spacebar]");
		textComponent.font = "24px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;
		entity.addComponent(textComponent);
		this.addEntity(entity);
	}

	{
		var walterSplashEntity = new Entity("walter corner");	
		walterSplashEntity.addComponent(new Transform());
		var imageDrawable = new ImageDrawable(this.game.getImages().getSplashWalter(), new Rect(404, 118, 396, 482));
		imageDrawable.z = -5;
		walterSplashEntity.addComponent(imageDrawable);
		this.addEntity(walterSplashEntity);
	}

	{
		var forestBackgroundEntity = new Entity("forest background");	
		forestBackgroundEntity.addComponent(new Transform());
		var imageDrawable = new ImageDrawable(this.game.getImages().getForestBackground(), new Rect(0, 0, 800, 600));
		imageDrawable.z = -11;
		forestBackgroundEntity.addComponent(imageDrawable);
		this.addEntity(forestBackgroundEntity);
	}

	{
		var entity = new Entity("dark text background");	
		entity.addComponent(new Transform());

		var rectDrawable = new RectDrawable(new Rect(0, 58, 800, 192));
		rectDrawable.fillColor = "#000";
		rectDrawable.alpha = 0.5;
		rectDrawable.lineWidth = "2";
		rectDrawable.z = -5;
		entity.addComponent(rectDrawable);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("backwardsR");	
		entity.addComponent(new Transform());
		var imageDrawable = new ImageDrawable(this.game.getImages().getBackwardsR(), new Rect(292, 132, 51, 50));
		entity.addComponent(imageDrawable);
		this.addEntity(entity);
	}

	var fireStartX = 386;

	{
		var forestBackgroundEntity = new Entity("fire feather");	
		forestBackgroundEntity.addComponent(new Transform());
		var imageDrawable = new ImageDrawable(this.game.getImages().getFireFeather(), new Rect(fireStartX, 560, 96, 40));
		imageDrawable.z = -10;
		forestBackgroundEntity.addComponent(imageDrawable);
		this.addEntity(forestBackgroundEntity);
	}

	{
		var entity = new Entity("test fire");	
		var movement = new Movement(null, null, 360);
		var drawable = new ImageDrawable(this.game.getImages().getFireball());

		entity.addComponent(movement);
		entity.addComponent(drawable);
		entity.addComponent(new Transform(new Vector(fireStartX + 40, 532), new Vector(60, 60), null, -4));
		entity.addComponent(new Fire(3));
		this.addEntity(entity);
	}
}

TitleScene.prototype.getMusic = function() {
	return theSounds.getTitleTrack();
}
