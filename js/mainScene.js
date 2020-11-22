import Phaser from "phaser";
import Luna from "../js/luna.js";
import ImgLuna from "../img/luna.png";
import ImgLunaShadow from "../img/lunaShadow.png";
import ImgLunaSheet from "../img/lunasheet.png";
import ImgNavigateRight from "../img/navigate_right.png";
import ImgNavigateLeft from "../img/navigate_left.png";
import ImgNavigateUp from "../img/navigate_up.png";
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
      mainTheme: this.sound.add("mainTheme", { loop: true, volume: 1 }),
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

    this.sounds.mainTheme.play();

    this.luna = new Luna(this);

    this.scene.launch("MenuScene");

    console.log(this.scene.manager.getScene("Scene02"));

    this.scene.launch("Scene02", {
      luna: this.luna,
      exitLeft: () => {
        this.luna.setPos(728, 320);

        this.sceneOrder("Scene06", "Scene02");
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
        this.luna.setPos(757, 319);
        this.sceneOrder("Scene06", "Scene05");
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
        this.luna.setPos(176, 322);
        this.sceneOrder("Scene05", "Scene06");
      }
    });

    this.scene.launch("Scene07", {
      parent: this,
      luna: this.luna,

      exitLeft: () => {
        this.luna.setPos(361,181);
        this.luna.baseMaxScale = 0.5;
        this.sceneOrder("Scene04", "Scene07");
      },
    });

    this.scene.launch("Scene08", {
      parent: this,
      luna: this.luna,

      exitLeft: () => {
        this.luna.setPos(361,181);
        this.luna.baseMaxScale = 0.5;
        this.sceneOrder("Scene04", "Scene07");
      },
    });

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

    this.sceneOrder("Scene01");

    this.input.on(
      "pointerdown",
      function (pointer, x) {
          console.log(pointer.worldX + "," + pointer.worldY);
      },
      this
    );

    this.input.on(
      "pointerup",
      function () {
        this.input.setDefaultCursor("");
      },
      this
    );
  }

  update() {
    this.luna.update();
  }
}
