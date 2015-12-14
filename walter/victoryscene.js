VictoryScene.prototype = new Scene();
VictoryScene.prototype.constructor = VictoryScene;

function VictoryScene(game) {
	Scene.call(this, game);

	this.setup();
}

VictoryScene.prototype.handleKeyDown = function(key) {

}

VictoryScene.prototype.handleKeyUp = function(key) {
	if (key == 32) {
		//SPACEBAR start the game at the first level
		this.game.setNextScene(new TitleScene(this.game));
	}
}

VictoryScene.prototype.setup = function() {
	this.addSystem(new FireSystem());
	this.addSystem(new FlameSystem());
	this.addSystem(new MovementSystem());
	this.addSystem(new ExplosionSystem());
	this.addSystem(new FireworkSystem());
	this.addSystem(new SparkSystem());
	this.addSystem(new BoundarySystem(new Rect(-50, -50, 900, 700)));

	{
		var titleTextEntity = new Entity("title text");	
		titleTextEntity.addComponent(new Transform(new Vector(400, 150), null, 0));
		var textComponent = new TextDrawable("The End!");
		textComponent.font = "120px Courier";
		textComponent.fontColor = WalterColors.victoryGreen;
		textComponent.alignment = "center"
		titleTextEntity.addComponent(textComponent);
		this.addEntity(titleTextEntity);
	}

	{
		var subtitleTextEntity = new Entity("subtitle text");	
		subtitleTextEntity.addComponent(new Transform(new Vector(400, 300), null, 0));
		var textComponent = new TextDrawable("You and Walter are heroes!");
		textComponent.font = "40px Courier";
		textComponent.fontColor = WalterColors.creditYellow;
		textComponent.alignment = "center"
		subtitleTextEntity.addComponent(textComponent);
		this.addEntity(subtitleTextEntity);
	}

	{
		var subtitleTextEntity = new Entity("subtitle text");	
		subtitleTextEntity.addComponent(new Transform(new Vector(400, 336), null, 0));
		var textComponent = new TextDrawable("Well, mainly Walter...");
		textComponent.font = "22px Courier";
		textComponent.fontColor = WalterColors.creditYellow;
		textComponent.alignment = "center"
		subtitleTextEntity.addComponent(textComponent);
		this.addEntity(subtitleTextEntity);
	}


	{
		var entity = new Entity("end text footer");	
		entity.addComponent(new Transform(new Vector(20, 480)));

		var textComponent = new TextDrawable("Email: scottrick49@gmail.com");;
		textComponent.font = "16px Courier";
		textComponent.fontColor = WalterColors.creditYellow;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("end text footer");	
		entity.addComponent(new Transform(new Vector(20, 500)));

		var textComponent = new TextDrawable("Source: scottrick.github.io/ld34");;
		textComponent.font = "16px Courier";
		textComponent.fontColor = WalterColors.creditYellow;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("end text footer");	
		entity.addComponent(new Transform(new Vector(20, 520)));

		var textComponent = new TextDrawable("All art, music, and code was created by Scott Atkins for Ludum Dare 34.");
		textComponent.font = "16px Courier";
		textComponent.fontColor = WalterColors.creditYellow;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("end text footer");	
		entity.addComponent(new Transform(new Vector(20, 560)));

		var textComponent = new TextDrawable("[spacebar] to reset");
		textComponent.font = "16px Courier";
		textComponent.fontColor = WalterColors.spellBlue;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("end text footer");	
		entity.addComponent(new Transform(new Vector(20, 580)));

		var textComponent = new TextDrawable("Thanks for taking the time to play my entry.  See you at the next Ludum Dare!");
		textComponent.font = "16px Courier";
		textComponent.fontColor = WalterColors.creditYellow;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("firework entity");	
		entity.addComponent(new Fireworks());
		this.addEntity(entity);
	}	

	{
		var entity = new Entity("ground");	
		entity.addComponent(new Transform());
		var imageDrawable = new ImageDrawable(this.game.getImages().getGround(), new Rect(0, 540, 800, 60));
		imageDrawable.z = -11;
		entity.addComponent(imageDrawable);
		this.addEntity(entity);
	}

}

VictoryScene.prototype.getMusic = function() {
	return theSounds.getTitleTrack();
}
