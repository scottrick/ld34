GameScene.prototype = new Scene();
GameScene.prototype.constructor = GameScene;

function GameScene(game, level, showHelp) {
	Scene.call(this, game);

	this.dumpDelay = 1;
    this.slowMotionSpeed = 0.25;

    this.isHelpShowning = false;
    this.helpEntities = [];

    this.progressWidth = 400;
    this.progressHeight = 24;

    this.level = level;
    this.level.scene = this;
	this.levelIsComplete = false;

	this.addSystem(new MovementSystem());
	this.addSystem(new WalterSystem());
	this.addSystem(new WingSystem());
	this.addSystem(new FireSystem());
	this.addSystem(new FlameSystem());
	this.addSystem(new LightningSystem());
	this.addSystem(new SparkSystem());
	this.addSystem(new ExplosionSystem());
	this.addSystem(new CollisionSystem(this));
	this.addSystem(new MonsterSystem());
	this.addSystem(new MonsterSpawnSystem());
	this.addSystem(new BoundarySystem(new Rect(-50, -50, 900, 700)));

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

GameScene.prototype.handleCollisionEvent = function(event) {
	var entity1 = event.entity1;
	var entity2 = event.entity2;

	var monster = null;
	var weapon = null;
	var monsterEntity = null;
	var weaponEntity = null;

	if (entity1.components[Monster.type] != null) {
		monster = entity1.components[Monster.type];
		monsterEntity = entity1;
	}
	if (entity2.components[Monster.type] != null) {
		monster = entity2.components[Monster.type];
		monsterEntity = entity2;
	}

	if (entity1.components[Weapon.type] != null) {
		weapon = entity1.components[Weapon.type];
		weaponEntity = entity1;
	}
	if (entity2.components[Weapon.type] != null) {
		weapon = entity2.components[Weapon.type];
		weaponEntity = entity2;
	}

	if (monster != null && weapon != null && monster.isAlive()) {
		monster.health -= weapon.damage;
		if (monster.health <= 0) {
			this.removeEntity(monsterEntity);

			/* add a bigger explosion for the monster death */
			var entity = new Entity("explosion");
			entity.addComponent(new Explosion(0, 4));
			var explosionTransform = monsterEntity.components[Transform.type].copy();
			explosionTransform.scale.multiply(0.65);
			entity.addComponent(explosionTransform);
			this.addEntity(entity);

			/* update level state and check for level completion */
			this.level.monsterDestroyed(monsterEntity);
			this.progressRectDrawable.rect.w = this.progressWidth * this.level.getProgress();

			if (this.level.isComplete()) {
				this.levelComplete();
			}
		}

		if (weapon.shouldRemoveOnImpact) {
			this.removeEntity(weaponEntity);
		}

		/* add little something for the weapon dissipation */
		var entity = new Entity("explosion");
		entity.addComponent(new Explosion(0, 2, weapon.weaponType));

		if (weapon.weaponType == "lightning") {
			entity.addComponent(monsterEntity.components[Transform.type].copy());
		}
		else {
			entity.addComponent(weaponEntity.components[Transform.type].copy());
		}

		this.addEntity(entity);
	}
}

GameScene.prototype.handleKeyDown = function(key) {
	Scene.prototype.handleKeyDown.call(this, key);

	if (this.isPaused()) {
		return;
	}

	if (this.levelIsComplete) {
		return;
	}

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

	if (this.levelIsComplete) {
		return;
	}

	if (Game.DEBUG) {
		if (key == 84) { // T
			this.levelComplete();
		}
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

GameScene.prototype.levelComplete = function() {
	for (var i = 0; i < this.entities.length; i++) {
		var entity = this.entities[i];

		if (entity.components[Monster.type] != null) {
			//is a monster
			this.removeEntity(entity);

			//explode it
			var lightningExplosionEntity = new Entity("endgame explosion");
			lightningExplosionEntity.addComponent(new Explosion(0, 3, "lightning"));
			lightningExplosionEntity.addComponent(entity.components[Transform.type].copy());
			this.addEntity(lightningExplosionEntity);

			var fireExplosionEntity = new Entity("endgame explosion");
			fireExplosionEntity.addComponent(new Explosion(0, 3, "fire"));
			fireExplosionEntity.addComponent(entity.components[Transform.type].copy());
			this.addEntity(fireExplosionEntity);
		}
		if (entity.components[Spawner.type] != null) {
			//is a spawner
			this.removeEntity(entity);
		}
	}

	this.levelIsComplete = true;
}

GameScene.prototype.setupHelp = function() {
	{
		var entity = new Entity("help full background");	
		entity.addComponent(new Transform());

		var rectDrawable = new RectDrawable(new Rect(0, 0, 800, 600));
		rectDrawable.fillColor = "#000";
		rectDrawable.strokeColor = WalterColors.owlLightBrown;
		rectDrawable.alpha = 0.35;
		rectDrawable.z = 10;
		entity.addComponent(rectDrawable);

		this.addEntity(entity);
		this.helpEntities.push(entity);
	}
	{
		var entity = new Entity("help popup background");	
		entity.addComponent(new Transform());

		var rectDrawable = new RectDrawable(new Rect(100, 100, 600, 400));
		rectDrawable.fillColor = "#000";
		rectDrawable.strokeColor = WalterColors.owlLightBrown;
		rectDrawable.alpha = 0.6;
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

	var yValue = 240;

	{
		var entity = new Entity("help text 1.0");	
		entity.addComponent(new Transform(new Vector(120, yValue)));

		var textComponent = new TextDrawable("Cast Fireball");
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
		var entity = new Entity("help text 3.0");	
		entity.addComponent(new Transform(new Vector(120, yValue)));

		var textComponent = new TextDrawable("Channel Lightning");
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
	this.level.setup(this);
}

GameScene.prototype.setupBase = function() {
	var walterWidth = 32;
	var walterHidth = 60;
	
	var wingWidth = 28;
	var wingHeight = 32;

	{
		var entity = new Entity("Wing Right");	
		var transform = new Transform(new Vector(400 + 1, 540 - walterHidth / 3 * 2), null, 0);
		entity.addComponent(transform);

		var wingImage = this.game.getImages().getRightWing();
		var imageDrawable = new ImageDrawable(wingImage, new Rect(-32, 0, 64, wingHeight));
		imageDrawable.z = 4;
		entity.addComponent(imageDrawable);

		this.rightWing = new Wing(transform.copy(), transform);
		this.rightWing.waveDeltaX = -this.rightWing.waveDeltaX; 
		entity.addComponent(this.rightWing);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("Wing Left");	
		var transform = new Transform(new Vector(400 + 1, 540 - walterHidth / 3 * 2), null, 0);
		entity.addComponent(transform);

		var wingImage = this.game.getImages().getLeftWing();
		var imageDrawable = new ImageDrawable(wingImage, new Rect(32, 0, -64, wingHeight));
		imageDrawable.z = 4;
		entity.addComponent(imageDrawable);

		this.leftWing = new Wing(transform.copy(), transform);
		entity.addComponent(this.leftWing);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("Walter");	
		var transform = new Transform(new Vector(400, 540 - walterHidth / 2), new Vector(walterWidth, walterHidth));
		entity.addComponent(transform);

		var imageDrawable = new ImageDrawable(this.game.getImages().getWalter());
		imageDrawable.z = 5;
		entity.addComponent(imageDrawable);

		this.walter = new Walter(this.rightWing, this.leftWing, transform, this);
		entity.addComponent(this.walter);

		this.addEntity(entity);
	}

	{
		var entity = new Entity("progress border");	
		entity.addComponent(new Transform());
		var rectDrawable = new RectDrawable(new Rect((800 - this.progressWidth) / 2, 12, this.progressWidth, this.progressHeight));
		rectDrawable.alpha = 0.5;
		rectDrawable.z = 15;
		entity.addComponent(rectDrawable);
		this.addEntity(entity);
	}

	{
		var entity = new Entity("progress inside");	
		entity.addComponent(new Transform());
		this.progressRectDrawable = new RectDrawable(new Rect((800 - this.progressWidth) / 2, 12, this.progressWidth * this.level.getProgress(), this.progressHeight));
		this.progressRectDrawable.alpha = 0.5;
		this.progressRectDrawable.fillColor = "#0c0";
		this.progressRectDrawable.z = 15;	
		entity.addComponent(this.progressRectDrawable);
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

	{
		var entity = new Entity("background");	
		entity.addComponent(new Transform());
		var imageDrawable = new ImageDrawable(this.game.getImages().getLevelBackground(), new Rect(0, 0, 800, 540));
		imageDrawable.z = -11;
		entity.addComponent(imageDrawable);
		this.addEntity(entity);
	}
}
