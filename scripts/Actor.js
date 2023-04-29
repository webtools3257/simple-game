export class Actor extends Phaser.Physics.Arcade.Sprite {
	constructor(configs) {
		super(configs.scene, configs.pos.x, configs.pos.y, configs.texture)
		this.configs = configs
		configs.scene.add.existing(this);
		configs.scene.physics.add.existing(this);
	}
}