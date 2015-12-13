Weapon.prototype = new Component();
Weapon.prototype.constructor = Weapon;

Weapon.type = "weapon";

function Weapon(damage) {
	Component.call(this, Weapon.type);

	if (damage != null) {
		this.damage = damage;
	}
	else {
		this.damage = 1;
	}
}
