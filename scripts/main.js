import {
	MainScene,
	GameOverScene
} from "./Scene.js"
const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
//	backgroundColor: "#ffffff",
	parent: 'phaser-example',
	physics: {
		default: 'arcade'
	},
	scene:[MainScene,GameOverScene]
};
const game = new Phaser.Game(config);