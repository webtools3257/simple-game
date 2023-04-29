export class Bullet extends Phaser.Physics.Arcade.Sprite{
	constructor(scene,start,end, attacker){
		super(scene,attacker.x,attacker.y,"bullet")
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.scene = scene
		this.start = start
		this.end = end
		this.x = attacker.x
		this.y = attacker.y-20
		this.setScale(0.01)
		this.setVelocityX(-attacker.scaleX*1000)
	}
}

export class PoisonCloud extends Phaser.Physics.Arcade.Sprite{
	constructor(scene,start,attacker,damage=0.5){
		super(scene,attacker.x-90,attacker.y+10,"posion")
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.scene = scene
		this.setScale(0.02)
		this.damage = damage
		this.setVelocityX(attacker.t*100)
		//this.body.setSize(10,10)
		setTimeout(()=>{
			//console.log("des");
			this.destroy()
		},6000)
	}
}