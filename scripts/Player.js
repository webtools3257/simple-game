import { Actor } from "./Actor.js"

export class Player extends Actor {
	constructor(scene) {
		super({
			scene: scene,
			pos: {
				x: 100,
				y: 100,
			},
			texture: "player"
		})
		//this.setScale(1.5)
		this.hpDisplay = scene.add.text(this.x, this.y-60, "100")
		this.anims.create({
			key: "attack",
			frameRate: 7.5,
			frames: this.anims.generateFrameNumbers("player", { start: 5, end: 0 }),
			repeat: 0
		});
		
		this.anims.create({
			key: "run",
			frameRate: 7,
			frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
			repeat: -1
		});
		
		this.anims.create({
			key: "idle",
			frameRate: 7.5,
			frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
			repeat: 0
		});
		this.scene = scene
		this.scaleX=-1
		this.s = 1
		this.isMove = null
		this.hp = 100
		this.body.setSize(10, 40)
	}

	attack(){
		this.idle()
		this.play("attack")
	}
	
	idle(){
		this.setVelocityX(0)
		this.play("idle")
		this.scaleX = -this.s
		this.isMove =null
	}
	
	moveToRight(){
		this.onMove()
		//this.hpDisplay.setPosition(this.x, this.y-60)
		this.isMove = "right"
		this.scaleX = 1
		this.s = 1
		this.play("run")
		this.setVelocityX(100)
	}
	
	moveToLeft() {
		this.onMove()
		this.isMove="left"
		this.scaleX = -1
		this.s = -1
		this.play("run")
		this.setVelocityX(-100)
	}
	
	moveToUp(){
		this.onMove()
		this.isMove="up"
		this.play("run")
		this.setVelocityY(-100)
	}
	
	moveToDown(){
		this.onMove()
		this.isMove="down"
		this.play("run")
		this.setVelocityY(100)
	}
	
	onMove(){
			}
	preUpdate (time,delta){
		super.preUpdate(time, delta);
		if(this.hp<=0){
			this.disableBody(true,true)
			this.scene.scene.start("gameover")
		}
		this.hpDisplay.setPosition(this.x, this.y-60)
		this.hpDisplay.setText(this.hp)
		return true
	}
}