const base_link = 
import { Player } from "./Player.js"
import { Zombie } from "./Character.js"
import { Bullet } from "./Objects.js"

export class MainScene extends Phaser.Scene {
	constructor() {
		super("mainscene")
	}

	preload() {
		var url;
		url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
		this.load.plugin('rexvirtualjoystickplugin', url, true);

		this.load.spritesheet("player", `${base_link}/assets/player/spritesheets/player.png`, {
			frameWidth: 111.5,
			frameHeight: 120
		})

		this.load.spritesheet("zombie", `${base_link}/zombie.png`, {
			frameWidth: 128,
			frameHeight: 130
		})

		this.load.audio("gun", `${base_link}/gun.mp3`)
		this.load.audio("main_sound", `${base_link}/main_theme.mp3`)
		this.load.image("bullet", `${base_link}/bullet_1.png`)
		this.load.image("posion", `${base_link}/posion.png`)
	}

	create() {

		this.main_sound = this.sound.add("main_sound")
		this.main_sound.play()
		//	this.scale.toggleFullscreen()
		this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
			x: 100,
			y: window.innerHeight - 100,
			radius: 50,
			base: this.add.circle(0, 0, 30, 0x888888),
			thumb: this.add.circle(0, 0, 20, 0xcccccc),
			// 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
			// forceMin: 16,
			enable: true
		})
		this.joyStick.on("update", this.joyStickUpdate.bind(this))

		this.attack_btn = this.plugins.get('rexvirtualjoystickplugin').add(this, {
			x: window.innerWidth - 100,
			y: window.innerHeight - 100,
			radius: 50,
			base: this.add.circle(0, 0, 30, 0x888888),
		})
		this.attack_btn.on('pointerdown', this.attack_btn_click.bind(this))
		this.player = new Player(this)
		//player.play("run")
		//let plane = this.add.sprite(100, 200, "player");
		//plane.play("fly");
		this.sfx = this.sound.add("gun")
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
		const loadingText = this.add.text(screenCenterX, screenCenterY, 'Loading: 0%').setOrigin(0.5);

		//new Button(this, 650, 100, "attack", this.attack.bind(this))
		this.bullets = this.add.group()
		this.zombies = this.add.group()
		this.posion_clouds = this.add.group()
		this.physics.add.overlap(this.zombies, this.bullets, function(zombie, bullet) {
			zombie.hp -= 5
			if (zombie.hp <= 0) {
				zombie.hpDisplay.destroy()
				zombie.destroy()
				zombie.destroyAll()
			}
			bullet.destroy()
		}, null, this)

		this.physics.add.overlap(this.player, this.posion_clouds, function(player, cloud) {
			player.hp -= cloud.damage
			cloud.destroy()
		}, null, this)

		for (var i = 0; i < 10; i++) {
			this.zombies.add(new Zombie(this, 300 + (i * 400), 100))
			this.zombies.add(new Zombie(this, -300 + (-i * 400), 100))
		}
			//this.scene.add("gameover")
		this.cameras.main.startFollow(this.player);
		this.input.keyboard.on('keydown-' + 'A', function(event) {
				if (this.player.isMove != "left")
					this.player.moveToLeft()
		});
		
		this.input.keyboard.on('keydown-' + 'D', function(event) {
				if (this.player.isMove != "right")
					this.player.moveToRight()
		});
		
		this.input.keyboard.on('keyup-' + 'A', function(event) {
				this.player.idle(0)
		});
		
		this.input.keyboard.on('keyup-' + 'D', function(event) {
				this.player.idle(0)
		});
	}

	attack_btn_click() {
		this.attack()
	}

	joyStickUpdate() {
		var cursorKeys = this.joyStick.createCursorKeys();
		let not_move = true
		for (let k in cursorKeys) {
			//console.log(k);
			if (cursorKeys[k].isDown) {
				if (k == "right") {
					not_move = false
					if (this.player.isMove != "right")
						this.player.moveToRight()
				} else if (k == "left") {
					not_move = false
					if (this.player.isMove != "left")
						this.player.moveToLeft()
				}
			}
		}
		if (not_move) {
			this.player.idle(0)
		}
	}

	attack() {
		this.player.attack()
		this.sound.add("gun").play()
		this.bullets.add(new Bullet(this, { x: this.player.x, y: this.player.y - 19 }, 200, this.player))
	}
}


export class GameOverScene extends Phaser.Scene {
	constructor() {
		super("gameover")

	}

	create() {


		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
		const loadingText = this.add.text(screenCenterX, screenCenterY, 'GameOver', {
			fontFamily: 'Arial',
			fontSize: '50px',
			color: '#fff'
		}).setOrigin(0.5);

	}
}