TitleScene.prototype = new Scene();
TitleScene.prototype.constructor = TitleScene;

function TitleScene(game) {
	Scene.call(this, game);

	this.dumpDelay = 1;
    this.slowMotionSpeed = 0.05;

	this.setup();
}

TitleScene.prototype.setup = function() {
	{
		var titleTextEntity = new Entity("title text");	
		titleTextEntity.addComponent(new Transform(new Vector(400, 150), null, -6));
		var textComponent = new TextDrawable("Walter the Wise:");
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
		var textComponent = new TextDrawable("Wizard for Hire!");
		textComponent.font = "40px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;
		textComponent.alignment = "center"
		subtitleTextEntity.addComponent(textComponent);
		this.addEntity(subtitleTextEntity);
	}

	{
		var walterSplashEntity = new Entity("walter corner");	
		walterSplashEntity.addComponent(new Transform(new Vector(602, 359), new Vector(396, 482)));
		var imageDrawable = new ImageDrawable(this.game.getImages().getSplashWalter());
		imageDrawable.z = -1;
		walterSplashEntity.addComponent(imageDrawable);
		this.addEntity(walterSplashEntity);
	}

	{
		var forestBackgroundEntity = new Entity("forest background");	
		forestBackgroundEntity.addComponent(new Transform(new Vector(400, 300), new Vector(800, 600)));
		var imageDrawable = new ImageDrawable(this.game.getImages().getForestBackground());
		imageDrawable.z = -2;
		forestBackgroundEntity.addComponent(imageDrawable);
		this.addEntity(forestBackgroundEntity);
	}
}
