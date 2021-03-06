import ExampleScene from "./ExampleScene"
import React, { useEffect } from "react";
import Phaser from 'phaser';


const Game = () => {

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser-example",
            width: 800,
            height: 770,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            backgroundColor: "#fff",
            scene: [ExampleScene]
        }

        new Phaser.Game(config);
    }, [])


    return <div id="phaser-game" />

}
export default Game

