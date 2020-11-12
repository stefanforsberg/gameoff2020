import Phaser from "phaser";
import MainScene from "../js/mainScene.js"
import MenuScene from "../js/menuScene.js"
import HeartScene from "../js/heartScene.js"
import Scene01 from "../js/scene01.js"
import Scene02 from "../js/scene02.js"
import Scene03 from "../js/scene03.js"
const config = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        parent: 'game',
        width: 1024,
        height: 600
    },
    parent: "game",
    scene: [MainScene, Scene01, Scene02, Scene03, MenuScene, HeartScene],
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true
        }
      }
  };
  
  const game = new Phaser.Game(config);

  export default game;