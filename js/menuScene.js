import Phaser from "phaser";
import ImgPaintHolder from "../img/paintHolder.png";
import ImgPaintYellow from "../img/paintYellow.png";
import ImgPaintBlue from "../img/paintBlue.png";
import ImgPaintRed from "../img/paintRed.png";
import ImgPaintGreen from "../img/paintGreen.png";
import ImgPaintOrange from "../img/paintOrange.png";
import ImgPaintPurple from "../img/paintPurple.png";
import ImgWood from "../img/s05_wood.png";
import ImgAxe from "../img/s07_axe.png";

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
    this.load.image("wood", ImgWood);
    this.load.image("axe", ImgAxe);
  }

  create() {
    this.paintHolder = this.add.image(512, 535, "paintHolder");
    this.paintHolder.alpha = 0;

    this.paintYellow = this.add.image(426, 528, "paintYellow");
    this.paintYellow.setInteractive();
    
    this.paintYellow.on("pointerdown", () => {
      if(this.input.manager.defaultCursor.indexOf("Blue") > -1) {
        this.input.setDefaultCursor("url(" + ImgPaintGreen + ") 32 32, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Red") > -1) {
        this.input.setDefaultCursor("url(" + ImgPaintOrange + ") 32 32, pointer");
      }else {
        this.input.setDefaultCursor("url(" + ImgPaintYellow + ") 32 32, pointer");
      }
      
    });

    this.paintBlue = this.add.image(480, 526, "paintBlue");
    this.paintBlue.alpha = 0;
    this.paintBlue.setInteractive();

    this.paintBlue.on("pointerdown", () => {
      if(this.input.manager.defaultCursor.indexOf("Yellow") > -1) {
        this.input.setDefaultCursor("url(" + ImgPaintGreen + ") 32 32, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Red") > -1) {
        this.input.setDefaultCursor("url(" + ImgPaintPurple + ") 32 32, pointer");
      } else {
        this.input.setDefaultCursor("url(" + ImgPaintBlue + ") 32 32, pointer");
      }
      
    });

    this.paintRed = this.add.image(532, 525, "paintRed");
    this.paintRed.alpha = 0;
    this.paintRed.setInteractive();

    this.paintRed.on("pointerdown", () => {
      if(this.input.manager.defaultCursor.indexOf("Yellow") > -1) {
        this.input.setDefaultCursor("url(" + ImgPaintOrange + ") 32 32, pointer");
      } else if(this.input.manager.defaultCursor.indexOf("Blue") > -1) {
        this.input.setDefaultCursor("url(" + ImgPaintPurple + ") 32 32, pointer");
      } else {
        this.input.setDefaultCursor("url(" + ImgPaintRed + ") 32 32, pointer");
      }
      
    });

    this.wood = this.add.image(750, 530, "wood");
    this.wood.alpha = 0;

    this.axe = this.add.image(810, 530, "axe");
    this.axe.alpha = 0;

    
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

  

  update() {}
}
