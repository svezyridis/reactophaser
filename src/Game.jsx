import ExampleScene from "./ExampleScene"
import React from "react";
import Phaser from 'phaser';

export default class Game extends React.Component {
    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser-example",
            width: 800,
            height: 300,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: [ExampleScene]
        };

        new Phaser.Game(config);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div id="phaser-game" />;
    }
}

