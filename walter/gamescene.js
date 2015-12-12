GameScene.prototype = new Scene();
GameScene.prototype.constructor = GameScene;

function GameScene(game, level, showHelp) {
	Scene.call(this, game);

	this.dumpDelay = 1;
    this.slowMotionSpeed = 0.25;

    this.isHelpShowning = false;
    this.helpEntities = [];

    this.level = level;

	this.addSystem(new MovementSystem());
	this.addSystem(new WalterSystem());
	this.addSystem(new WingSystem());
	this.addSystem(new FireSystem());
	this.addSystem(new FlameSystem());
	this.addSystem(new BoundarySystem(new Rect(-100, -100, 1000, 800)));

	this.setupHelp();
    this.setupBase();
	this.setupLevel();

	if (showHelp) {
		this.showHelp();
	}
	else {
		this.hideHelp();
	}
}

GameScene.prototype.handleKeyDown = function(key) {
	Scene.prototype.handleKeyDown.call(this, key);

	if (key == 65) { // A
		this.walter.aDown();
	}

	if (key == 76) { // L
		this.walter.lDown();
	}
}

GameScene.prototype.handleKeyUp = function(key) {
	Scene.prototype.handleKeyUp.call(this, key);

	if (key == 72) { // H
		if (this.isHelpShowning) {
			this.hideHelp();
		}
		else {
			this.showHelp();
		}
	}

	if (this.isPaused()) {
		return;
	}

	if (key == 65) { // A
		this.walter.aUp();
	}

	if (key == 76) { // L
		this.walter.lUp();
	}
}

GameScene.prototype.showHelp = function() {
	this.isHelpShowning = true;
	this.paused = true;

	for (var i = 0; i < this.helpEntities.length; i++) {
		var entity = this.helpEntities[i];
		entity.enabled = true;
	}
}

GameScene.prototype.hideHelp = function() {
	this.isHelpShowning = false;
	this.paused = false;

	for (var i = 0; i < this.helpEntities.length; i++) {
		var entity = this.helpEntities[i];
		entity.enabled = false;
	}
}

GameScene.prototype.setupHelp = function() {
	{
		var entity = new Entity("help background");	
		entity.addComponent(new Transform());

		var rectDrawable = new RectDrawable(new Rect(100, 100, 600, 400));
		rectDrawable.fillColor = "#000";
		rectDrawable.strokeColor = WalterColors.owlLightBrown;
		rectDrawable.alpha = 0.9;
		rectDrawable.z = 10;
		entity.addComponent(rectDrawable);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}

	{
		var entity = new Entity("help text header");	
		entity.addComponent(new Transform(new Vector(400, 140)));

		var textComponent = new TextDrawable("How to Play");
		textComponent.font = "28px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;
		textComponent.alignment = "center"
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}

	var yValue = 200;

	{
		var entity = new Entity("help text 1.0");	
		entity.addComponent(new Transform(new Vector(120, yValue)));

		var textComponent = new TextDrawable("Cast a spell");
		textComponent.font = "20px Courier";
		textComponent.fontColor = WalterColors.spellBlue;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}

	yValue += 30;

	{
		var entity = new Entity("help text 1.0");	
		entity.addComponent(new Transform(new Vector(120, yValue)));

		var textComponent = new TextDrawable("  + Press the 'A' or 'L' key.");
		textComponent.font = "20px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}

	yValue += 50;

	{	
		var entity = new Entity("help text 2.0");	
		entity.addComponent(new Transform(new Vector(120, yValue)));

		var textComponent = new TextDrawable("Switch spells");
		textComponent.font = "20px Courier";
		textComponent.fontColor = WalterColors.spellBlue;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}

	yValue += 30;

	{
		var entity = new Entity("help text 2.1");	
		entity.addComponent(new Transform(new Vector(120, yValue)));

		var textComponent = new TextDrawable("  + Press the 'A' and 'L' keys together.");
		textComponent.font = "20px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}

	yValue += 50;

	{	
		var entity = new Entity("help text 3.0");	
		entity.addComponent(new Transform(new Vector(120, yValue)));

		var textComponent = new TextDrawable("Channel a spell");
		textComponent.font = "20px Courier";
		textComponent.fontColor = WalterColors.spellBlue;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}

	yValue += 30;

	{
		var entity = new Entity("help text 3.1");	
		entity.addComponent(new Transform(new Vector(120, yValue)));

		var textComponent = new TextDrawable("  + Press and hold the 'A' or 'L' key.");
		textComponent.font = "20px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;
		textComponent.z = 11;
		entity.addComponent(textComponent);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}

	{
		var entity = new Entity("help text footer");	
		entity.addComponent(new Transform(new Vector(400, 480)));

		var textComponent = new TextDrawable("Press 'H' to hide and show this dialog.");
		textComponent.font = "20px Courier";
		textComponent.fontColor = WalterColors.owlLightBrown;
		textComponent.z = 11;
		textComponent.alignment = "center"
		entity.addComponent(textComponent);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}
}

GameScene.prototype.setupLevel = function() {

}

GameScene.prototype.setupBase = function() {
	var walterWidth = 32;
	var walterHidth = 60;
	
	var wingWidth = 28;
	var wingHeight = 32;

	{
		var entity = new Entity("Wing Right");	
		var transform = new Transform(new Vector(400 + 5, 540 - walterHidth / 3 * 2), null, 0);
		entity.addComponent(transform);

		var wingImage = this.game.getImages().getRightWing();
		var imageDrawable = new ImageDrawable(wingImage, new Rect(0, 0, wingWidth, wingHeight));
		imageDrawable.z = 4;
		entity.addComponent(imageDrawable);

		this.rightWing = new Wing(transform.copy());
		this.rightWing.waveDeltaX = -this.rightWing.waveDeltaX; 
		entity.addComponent(this.rightWing);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("Wing Left");	
		var transform = new Transform(new Vector(400 - 4, 540 - walterHidth / 3 * 2), null, 0);
		entity.addComponent(transform);

		var wingImage = this.game.getImages().getLeftWing();
		var imageDrawable = new ImageDrawable(wingImage, new Rect(0, 0, -wingWidth, wingHeight));
		imageDrawable.z = 4;
		entity.addComponent(imageDrawable);

		this.leftWing = new Wing(transform.copy());
		entity.addComponent(this.leftWing);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("Walter");	
		entity.addComponent(new Transform(new Vector(400, 540 - walterHidth / 2), new Vector(walterWidth, walterHidth)));

		var imageDrawable = new ImageDrawable(this.game.getImages().getWalter());
		imageDrawable.z = 5;
		entity.addComponent(imageDrawable);

		this.walter = new Walter(this.rightWing, this.leftWing, this);
		entity.addComponent(this.walter);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("test");	
		entity.addComponent(new Transform(new Vector(150, 540), new Vector(20, 20), null, 6));
		entity.addComponent(new Fire(10));
		// this.addEntity(entity);
	}

	{
		var entity = new Entity("ground");	
		entity.addComponent(new Transform());
		var imageDrawable = new ImageDrawable(this.game.getImages().getGround(), new Rect(0, 540, 800, 60));
		imageDrawable.z = -11;
		entity.addComponent(imageDrawable);
		this.addEntity(entity);
	}

	{
		var entity = new Entity("background");	
		entity.addComponent(new Transform());
		var imageDrawable = new ImageDrawable(this.game.getImages().getLevelBackground(), new Rect(0, 0, 800, 540));
		imageDrawable.z = -11;
		entity.addComponent(imageDrawable);
		this.addEntity(entity);
	}
}
