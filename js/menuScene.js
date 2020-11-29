import Phaser from "phaser";
import game from "../js/index.js"
import ImgPaintHolder from "../img/paintHolder.png";
import ImgPaintYellow from "../img/paintYellow.png";
import ImgPaintBlue from "../img/paintBlue.png";
import ImgPaintRed from "../img/paintRed.png";
import ImgPaintGreen from "../img/paintGreen.png";
import ImgPaintOrange from "../img/paintOrange.png";
import ImgPaintPurple from "../img/paintPurple.png";
import ImgPaintBrown from "../img/paintBrown.png";
import ImgWood from "../img/s05_wood.png";
import ImgAxe from "../img/s07_axe.png";
import ImgFeather from "../img/s08_feather.png";
import AudioHammerNails from "../audio/hammerNails.mp3"


export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }

  preload() {
    this.load.image("paintHolder", ImgPaintHolder);
    this.load.image("paintYellow", ImgPaintYellow);
    this.load.image("paintBlue", ImgPaintBlue);
    this.load.image("paintRed", ImgPaintRed);
    this.load.image("paintGreen", ImgPaintGreen);
    this.load.image("paintOrange", ImgPaintOrange);
    this.load.image("paintPurple", ImgPaintPurple);
    this.load.image("paintBrown", ImgPaintBrown);
    this.load.image("wood", ImgWood);
    this.load.image("axe", ImgAxe);
    this.load.image("feather", ImgFeather);
    this.load.audio("hammerNails", AudioHammerNails);

  }

  create() {

    this.canMix = game.config.physics.arcade.debug ? true : false;

    this.hammerNails = this.sound.add("hammerNails", { loop: false, volume: 1 });

    this.paintHolder = this.add.image(512, 535, "paintHolder");
    this.paintHolder.alpha = 0;

    this.paintYellow = this.add.image(500, 526, "paintYellow");
    this.paintYellow.setInteractive();
    
    this.paintYellow.on("pointerdown", () => {
      if(this.input.manager.defaultCursor.indexOf("Blue") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintGreen + ") 21 20, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Red") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintOrange + ") 21 20, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Purple") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintBrown + ") 21 20, pointer");
      } else {
        this.input.setDefaultCursor("url(" + ImgPaintYellow + ") 21 20, pointer");
      }
      
    });

    this.paintBlue = this.add.image(430, 526, "paintBlue");
    this.paintBlue.alpha = game.config.physics.arcade.debug ? 1 : 0;
    this.paintBlue.setInteractive();

    this.paintBlue.on("pointerdown", () => {
      if(this.input.manager.defaultCursor.indexOf("Yellow") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintGreen + ") 21 20, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Red") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintPurple + ") 21 20, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Orange") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintBrown + ") 21 20, pointer");
      } else {
        this.input.setDefaultCursor("url(" + ImgPaintBlue + ") 21 20, pointer");
      }
      
    });

    this.paintRed = this.add.image(570, 525, "paintRed");
    this.paintRed.alpha = game.config.physics.arcade.debug ? 1 : 0;
    this.paintRed.setInteractive();

    this.paintRed.on("pointerdown", () => {
      if(this.input.manager.defaultCursor.indexOf("Yellow") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintOrange + ") 21 20, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Blue") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintPurple + ") 21 20, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Green") > -1 && this.canMix) {
        this.input.setDefaultCursor("url(" + ImgPaintBrown + ") 21 20, pointer");
      } else {
        this.input.setDefaultCursor("url(" + ImgPaintRed + ") 21 20, pointer");
      }
      
    });

    this.wood = this.add.image(750, 530, "wood");
    this.wood.alpha = game.config.physics.arcade.debug ? 1 : 0;

    this.axe = this.add.image(810, 530, "axe");
    this.axe.alpha = game.config.physics.arcade.debug ? 1 : 0;

    this.feather = this.add.image(870, 530, "feather");
    this.feather.alpha = game.config.physics.arcade.debug ? 1 : 0;

    
  }

  readyForEndgame() {
    if(this.axe.alpha === 0 || this.wood.alpha === 0 || this.feather.alpha === 0 ||  this.paintBlue.alpha === 0 || this.paintRed.alpha === 0)
    {
      return false;
    }

    this.tweens.add({
      targets: [this.axe, this.wood],
      x: 390,
      y: 257,
      alpha: 0,
      yoyo: false,
      loop: 0,
      duration: 1000,
      onComplete: () => {
        this.hammerNails.play();
      }
    })

    this.tweens.add({
      delay: 2000,
      targets: [this.paintYellow],
      x: 393,
      y: 140,
      scale: 0.5,
      alpha: 0.5,
      yoyo: false,
      loop: 0,
      duration: 1000
    });

    this.tweens.add({
      delay: 4000,
      targets: [this.paintBlue],
      x: 387,
      y: 147,
      scale: 0.5,
      alpha: 0.5,
      yoyo: false,
      loop: 0,
      duration: 1000
    });

    this.tweens.add({
      delay: 6000,
      targets: [this.paintRed],
      x: 399,
      y: 147,
      scale: 0.5,
      alpha: 0.5,
      yoyo: false,
      loop: 0,
      duration: 1000
    });

    this.tweens.add({
      delay: 8000,
      targets: [this.feather],
      x: 483,
      y: 146,
      yoyo: false,
      loop: 0,
      duration: 1000
    });

    return true;
  }

  showMenu() {
    this.tweens.add({
      targets: [this.paintHolder],
      alpha: { value: 1, duration: 1000 },
      yoyo: false,
      loop: 0,
    });
  }

  addBlue() {
    this.tweens.add({
      targets: [this.paintBlue],
      alpha: { value: 1, duration: 1000 },
      yoyo: false,
      loop: 0,
    });
  }

  addRed() {
    this.tweens.add({
      targets: [this.paintRed],
      alpha: { value: 1, duration: 1000 },
      yoyo: false,
      loop: 0,
    });
  }

  addWood() {
    this.tweens.add({
      targets: [this.wood],
      alpha: { value: 1, duration: 1000 },
      yoyo: false,
      loop: 0,
    });
  }

  addAxe() {
    this.tweens.add({
      targets: [this.axe],
      alpha: { value: 1, duration: 1000 },
      yoyo: false,
      loop: 0,
    });
  }

  addFeather() {
    this.tweens.add({
      targets: [this.feather],
      alpha: { value: 1, duration: 1000 },
      yoyo: false,
      loop: 0,
    });
  }

  canMixNow() {
    this.canMix = true;
  }

  update() {}
}
