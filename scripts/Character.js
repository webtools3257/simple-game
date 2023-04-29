import { Actor } from "./Actor.js"
import { PoisonCloud } from "./Objects.js"
export class Zombie extends Actor {
	constructor(scene, x, y) {
		super({
			scene: scene,
			pos: {
				x: x,
				y: y,
			},
			texture: "zombie"
		})
		this.hpDisplay = scene.add.text(this.x, this.y - 60, "100")
		this.anims.create({
			key: "attack",
			frameRate: 4.5,
			frames: this.anims.generateFrameNumbers("zombie", { start: 4, end: 6 }),
			repeat: -1
		});

		this.anims.create({
			key: "idle",
			frameRate: 4.5,
			frames: this.anims.generateFrameNumbers("zombie", { start: 4, end: 6 }),
			repeat: -1
		});

		this.scaleX = -1.5

		this.body.setSize(10, 40)
		this.play("attack")
		this.scene = scene
		this.hp = 100
		this.attack_damage = 5
		
		this.attackFunc = setInterval(() => {
			if(!this.scene){
				clearInterval(this.attackFunc)
				return 
			}
			this.scene.posion_clouds.add(new PoisonCloud(this.scene, {
				x: this.x - 3000,
				y: this.y
			}, this,this.attack_damage))
		}, 6000)
	}
	destroyAll() {
		clearInterval(this.attackFunc)
	}
	stop_move() { this.move = false }
	preUpdate(time, delta) {
		if (this.hp == 0) {
			return
		}

		super.preUpdate(time, delta);
		this.hpDisplay.setPosition(this.x, this.y - 60)
		this.hpDisplay.setText(this.hp)
		let tx = this.scene.player.x - this.x
		let ty = this.scene.player.y - this.y
		let t = 1
		if (tx > 0) {
			this.t = 1
			this.scaleX = 1
			this.setVelocityX(15)
		} else {
			this.t = -1
			this.scaleX = -1
			this.setVelocityX(-15)
		}

		let dist = Math.sqrt((tx * tx) + (ty * ty))

		if (dist < 150) {
			this.setVelocityX(0)
			if (this.attack_count == 0) {
				this.attack_count = 0

			}
			this.attack_count -= 1
			this.attack_damage = 1
		} else {
			//this.play("idle")
		}
	}

}