Weapon.prototype = new Component();
Weapon.prototype.constructor = Weapon;

Weapon.type = "weapon";

function Weapon(damage, weaponType, shouldRemove) {
	Component.call(this, Weapon.type);

	if (damage != null) {
		this.damage = damage;
	}
	else {
		this.damage = 1;
	}

	this.weaponType = weaponType;

	if (shouldRemove != null) {
		this.shouldRemoveOnImpact = shouldRemove;
	}
	else {
		this.shouldRemoveOnImpact = true;
	}
}
