import Phaser from "phaser";

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;


export default class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image('connect4', 'assets/images/connect4.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create() {
        //  A simple background for our game
        let background = this.add.image(400, 365, 'connect4')
        background.setScale(0.9)
        stars = this.physics.add.image(400, 300, "star")
        stars.setVelocity(100, 200).setBounce(0,1).setCollideWorldBounds(true).setGravityY(200)
        console.log(stars)
        // stars.setVelocity(100,200).setBound(1,1).setCollideWorldBounds(true).setGravityY(200);
    }

    update() {

    }
}