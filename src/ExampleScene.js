import Phaser from "phaser";
import { object, func } from "prop-types";

var gameState = Array(6).fill(0).map(x => Array(7).fill(0))
const columnSpacing = 113.5
const rowSpacing = 110
var controls
var column
var discToMove = null
var target = new Phaser.Math.Vector2();
var distanceText
var nextPlayer = "red"




export default class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image('connect4', 'assets/images/connect4.png')
        this.load.image('arrow', 'assets/images/arrow.png')
        this.load.image('black', 'assets/images/black.png')
        this.load.image('red', 'assets/images/red.png')
    }
    create() {
        //  A simple background for our game
        distanceText = this.add.text(10, 10, 'Click to set target', { fill: '#00ff00' })

        var reds = this.physics.add.group({ key: 'red', frameQuantity: 21 })
        var blacks = this.physics.add.group({ key: 'black', frameQuantity: 21 })
        this.add.image(400, 405, 'connect4')
        Phaser.Actions.SetScale(reds.getChildren(), 0.95)
        Phaser.Actions.SetScale(blacks.getChildren(), 0.95)
        let redsInPlay = 0
        let blacksInPlay = 0

        //initializeBoard(gameState, reds, blacks)
        let arrow = this.add.image(399, 20, "arrow")

        //  Create a little 32x32 texture to use to show where the mouse is
        var graphics = this.make.graphics({ x: 0, y: 0, add: false, fillStyle: { color: 0xf4a742, alpha: 1 } })

        graphics.fillRect(0, 0, 100, 725);

        graphics.generateTexture('block', 100, 725);

        //  All the Columns can share the same Shape, no need for a unique instance per one, a reference is fine
        var hitArea = new Phaser.Geom.Rectangle(0, 0, 100, 700)
        var hitAreaCallback = Phaser.Geom.Rectangle.Contains

        const columns = this.make.group({
            key: 'block',
            repeat: 7,
            setXY: { x: 60, y: 405, stepX: columnSpacing },
            hitArea: hitArea,
            hitAreaCallback: hitAreaCallback,


        })

        columns.getChildren().forEach((column, index) => {
            column.setAlpha(0.01)
            column.setData('column', index + 1)
        })


        //  Camera controls
        var cursors = this.input.keyboard.createCursorKeys()

        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.7
        }

        this.cameras.main.disableCull = true

        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)

        this.input.on('pointerover', function (pointer, gameObjects) {
            column = gameObjects[0].getData("column")
            gameObjects[0].setAlpha(0.4)
            arrow.setPosition(gameObjects[0].x, 20)

        })

        this.input.on("pointerout", (pointer, gameObjects) => {
            gameObjects[0].setAlpha(0.01)
            column = null
        })

        this.input.on('pointerdown', () => {
            //find the available row for the current column
            if (discToMove) return
            let row = getRow(gameState, column)

            if (row > 0) {
                discToMove = (nextPlayer === "red") ? reds.getChildren()[redsInPlay] : blacks.getChildren()[blacksInPlay]
                discToMove.setPosition(60 + (column - 1) * columnSpacing, -30)
                const [x, y] = mapPositionToCoords(row, column)
                target.x = x
                target.y = y
                this.physics.moveToObject(discToMove, target, 600)
                gameState[row - 1][column - 1] = (nextPlayer === "black") ? "red" : "black"
                checkForWinner(gameState)
                nextPlayer = nextPlayer === "red" ? "black" : "red"
                if (nextPlayer === "red") {
                    blacksInPlay = blacksInPlay + 1
                }
                else {
                    redsInPlay = redsInPlay + 1
                }

            }

        })

        target.x = 20
        target.y = 100
        //this.physics.moveToObject(discToMove, target, 200);



    }

    update(time, delta) {

        controls.update(delta)
        if (discToMove) {
            var distance = Phaser.Math.Distance.Between(discToMove.x, discToMove.y, target.x, target.y);

            if (discToMove.body.speed > 0) {
                distanceText.setText('Distance: ' + distance);

                //  4 is our distance tolerance, i.e. how close the source can get to the target
                //  before it is considered as being there. The faster it moves, the more tolerance is required.
                if (distance < 8) {
                    discToMove.body.reset(target.x, target.y);
                    discToMove = null
                }
            }
        }

    }
}

function mapPositionToCoords(row, column) {
    let y = 655 - (row - 1) * rowSpacing
    let x = 60 + (column - 1) * columnSpacing
    return [
        x, y
    ]
}

function initializeBoard(state, reds, blacks) {
    let redsInPlay = 0
    let blacksInPlay = 0
    state.forEach((row, rowIndex) => {
        row.forEach((element, columnIndex) => {
            if (element === "red") {
                const { x, y } = mapPositionToCoords(rowIndex, columnIndex)
                reds.getChildren()[redsInPlay].setPosition(x, y)
                redsInPlay = (redsInPlay === 20) ? redsInPlay : redsInPlay + 1
            }
            if (element === "black") {
                const { x, y } = mapPositionToCoords(rowIndex, columnIndex)
                blacks.getChildren()[blacksInPlay].setPosition(x, y)
                blacksInPlay = (blacksInPlay === 20) ? blacksInPlay : blacksInPlay + 1
            }

        })
    });
}

function getRow(gameState, column) {
    let row = 0
    gameState.every((element, index) => {
        if (element[column - 1] === 0) {
            row = index + 1
            return false
        }
        return true
    })
    return row
}

function checkForWinner(gameState){
    
}