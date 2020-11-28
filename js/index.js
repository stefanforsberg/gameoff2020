import Phaser from "phaser";
import MainScene from "../js/mainScene.js"
import MenuScene from "../js/menuScene.js"
import HeartScene from "../js/heartScene.js"
import Scene01 from "../js/scene01.js"
import Scene02 from "../js/scene02.js"
import Scene03 from "../js/scene03.js"
import Scene04 from "../js/scene04.js"
import Scene05 from "../js/scene05.js"
import Scene06 from "../js/scene06.js"
import Scene07 from "../js/scene07.js"
import Scene08 from "../js/scene08.js"
import Scene09 from "../js/scene09.js"
import Scene10 from "../js/scene10.js"
import SceneIntro from "../js/sceneIntro.js"


const config = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        parent: 'game',
        width: 1024,
        height: 600
    },
    parent: "game",
    scene: [MainScene, Scene02, Scene03, Scene04, Scene05, Scene06, Scene07, Scene08, Scene09, Scene10, Scene01, MenuScene, HeartScene, SceneIntro],
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
  };
  
  const game = new Phaser.Game(config);

  export default game;