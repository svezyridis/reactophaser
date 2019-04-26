import Phaser from "phaser";

var gameState = Array(6).fill(0).map(x => Array(7).fill(0))
const columnSpacing = 113.5
const rowSpacing = 110



export default class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image('connect4', 'assets/images/connect4.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.image('black', 'assets/images/black.png');
        this.load.image('red', 'assets/images/red.png');

        gameState.forEach((row, rowIndex) => {
            row.forEach((element, columnIndex) => {
                gameState[rowIndex][columnIndex] = Math.random() > 0.5 ? "red" : "black"
            })
        })

    }
    create() {
        //  A simple background for our game

        var reds = this.make.group({ key: 'red', frameQuantity: 21 })
        var blacks = this.make.group({ key: 'black', frameQuantity: 21 })
        let background = this.add.image(400, 405, 'connect4')


        Phaser.Actions.SetScale(reds.getChildren(), 0.95)
        Phaser.Actions.SetScale(blacks.getChildren(), 0.95)

        initializeBoard(gameState, reds, blacks)
        console.log(gameState)


        let arrow = this.add.image(399, 20, "arrow")


    }

    update() {
    }
}

function mapPositionToCoords(row, column) {
    let y = 655 - row * rowSpacing
    let x = 60 + column * columnSpacing
    return {
        x: x,
        y: y
    }
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