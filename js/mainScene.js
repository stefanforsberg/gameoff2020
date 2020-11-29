import Phaser from "phaser";
import game from "../js/index.js"
import Luna from "../js/luna.js";
import ImgLuna from "../img/luna.png";
import ImgLunaShadow from "../img/lunaShadow.png";
import ImgLunaSheet from "../img/lunasheet.png";
import ImgNavigateRight from "../img/navigate_right.png";
import ImgNavigateLeft from "../img/navigate_left.png";
import ImgNavigateUp from "../img/navigate_up.png";
import ImgNavigateDown from "../img/navigate_down.png";
import AudioScribble from "../audio/scribble.mp3"
import AudioChildFound from "../audio/childFound.mp3"
import AudioMainTheme from "../audio/mainTheme.mp3"
import ImgScene02 from "../img/s02.png";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene",
    });
  }

  preload() {
    this.load.image("luna", ImgLuna);
    this.load.image("lunaShadow", ImgLunaShadow);
    this.load.image("scene02", ImgScene02);

    this.load.image("navigateRight", ImgNavigateRight);
    this.load.image("navigateLeft", ImgNavigateLeft);
    this.load.image("navigateUp", ImgNavigateUp);
    this.load.image("navigateDown", ImgNavigateDown);

    

    this.load.spritesheet("lunasheet", "./" + ImgLunaSheet, {
      frameWidth: 202,
      frameHeight: 300,
      margin: 0,
      spacing: 0,
    });

    this.load.audio("scribble", AudioScribble);
    this.load.audio("mainTheme", AudioMainTheme);
    this.load.audio("childFound", AudioChildFound);
    

    

  }

  sceneOrder(keyNew, keyOld) {
    if (keyOld) {
      this.scene.pause(keyOld);
    }
    this.scene.resume(keyNew);
    this.scene.bringToTop(keyNew);
    this.scene.bringToTop("MainScene");
    this.scene.bringToTop("MenuScene");
  }

  create() {

    this.sounds = {
      scribble: this.sound.add("scribble", { loop: false, volume: 0.5 }),
      mainTheme: this.sound.add("mainTheme", { loop: true, volume: 0 }),
      childFound: this.sound.add("childFound", { loop: false, volume: 0.5 }),
      playChildFound: () => {
        this.tweens.add({
          targets:  this.sounds.mainTheme,
          volume:   0,
          duration: 1000
        });

        this.sounds.childFound.play();
      }
    };    

    this.sounds.childFound.on('complete', () => {
        this.tweens.add({
          targets:  this.sounds.mainTheme,
          volume:   1,
          duration: 1000
        });
    });

    
    if(game.config.physics.arcade.debug) {
      this.start();
    } else {
      this.scene.launch("SceneIntro", { cb: () => {this.start();}});
    }
    
    
  }

  start() {
    this.sounds.mainTheme.play();
    this.tweens.add({
      targets: [this.sounds.mainTheme],
      volume: { value: 1, duration: 3000 },
      yoyo: false,
      loop: 0,
    });

    this.luna = new Luna(this);

     this.scene.launch("MenuScene");

     this.scene.launch("Scene01", {
      parent: this,
      luna: this.luna,
      exitRight: () => {
        this.luna.setPos(240, 320);
        this.sceneOrder("Scene03", "Scene01");
      },
      lightCb: () => {
        this.scene.manager.getScene("MenuScene").showMenu();
      },
    });

    this.scene.launch("Scene02", {
      parent: this,
      luna: this.luna,
      exitLeft: () => {
        this.luna.setPos(716, 271);

        this.sceneOrder("Scene05", "Scene02");
      },
      exitRight: () => {
        this.luna.setPos(243, 342);

        this.sceneOrder("Scene09", "Scene02");
      },
    });

    this.scene.launch("Scene03", {
      parent: this,
      luna: this.luna,
      exitRight: () => {
        this.luna.setPos(240, 320);

        this.sceneOrder("Scene06", "Scene03");
      },
      exitUp: () => {
        this.luna.setPos(170, 294);
        this.sceneOrder("Scene04", "Scene03");
      }
    });

    this.scene.launch("Scene04", {
      parent: this,
      luna: this.luna,

      exitLeft: () => {
        this.luna.setPos(489, 219);
        this.sceneOrder("Scene03", "Scene04");
      },
      exitUp: () => {
        this.luna.baseMaxScale = 0.3;
        this.luna.setPos(310, 359);
        this.sceneOrder("Scene07", "Scene04");
      }
    });

    this.scene.launch("Scene05", {
      parent: this,
      luna: this.luna,

      exitLeft: () => {
        this.luna.setPos(835, 490);
        this.sceneOrder("Scene10", "Scene05");
      },
      exitRight: () => {
        this.luna.setPos(209, 309)
        this.sceneOrder("Scene02", "Scene05");
      }
    });

    this.scene.launch("Scene06", {
      parent: this,
      luna: this.luna,

      exitLeft: () => {
        this.luna.setPos(748, 332);
        this.sceneOrder("Scene03", "Scene06");
      },
      exitRight: () => {
        this.luna.setPos(254,483);
        this.sceneOrder("Scene10", "Scene06");
      },
      exitDown: () => {
        this.luna.setPos(305, 389);
        this.sceneOrder("Scene08", "Scene06");
      }
    });

    this.scene.launch("Scene07", {
      parent: this,
      luna: this.luna,

      exitLeft: () => {
        this.luna.setPos(361,281);
        this.luna.baseMaxScale = 0.5;
        this.sceneOrder("Scene04", "Scene07");
      },
    });

    this.scene.launch("Scene08", {
      parent: this,
      luna: this.luna,

      exitLeft: () => {
        this.luna.setPos(522,362);
        this.sceneOrder("Scene06", "Scene08");
      },
    });

    this.scene.launch("Scene09", {
      parent: this,
      luna: this.luna,
      exitLeft: () => {
        this.luna.setPos(725, 317);

        this.sceneOrder("Scene02", "Scene09");
      },
    });

    this.scene.launch("Scene10", {
      parent: this,
      luna: this.luna,
      exitLeft: () => {
        this.luna.setPos(734, 376);
        this.sceneOrder("Scene06", "Scene10");
      },
      exitRight: () => {
        this.luna.setPos(176, 322);
        this.sceneOrder("Scene05", "Scene10");
      },
    });

    setTimeout(() => {
      this.sceneOrder("Scene01");
    },1000)
        
  }

  update() {
    if(this.luna) {
      this.luna.update();
    }
    
  }
}
