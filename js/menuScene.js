import Phaser from "phaser";
import ImgPaintHolderBlack from "../img/paintHolderBlack.png";
import ImgPaintHolder from "../img/paintHolder.png";
import ImgPaintYellow from "../img/paintYellow.png";
import ImgPaintBlue from "../img/paintBlue.png";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }

  preload() {
    this.load.image("paintHolderBlack", ImgPaintHolderBlack);
    this.load.image("paintHolder", ImgPaintHolder);
    this.load.image("paintYellow", ImgPaintYellow);
    this.load.image("paintBlue", ImgPaintBlue);
  }

  create() {
    this.paintHolder = this.add.image(512, 635, "paintHolder");
    this.paintHolder.alpha = 0;

    this.paintYellow = this.add.image(426, 528, "paintYellow");
    this.paintYellow.setInteractive();
    
    this.paintYellow.on("pointerdown", () => {
      this.input.setDefaultCursor("url(" + ImgPaintYellow + ") 32 32, pointer");
    });

    this.paintBlue = this.add.image(483, 526, "paintBlue");
    this.paintBlue.alpha = 0;
    this.paintBlue.setInteractive();

    this.paintBlue.on("pointerdown", () => {
      this.input.setDefaultCursor("url(" + ImgPaintBlue + ") 32 32, pointer");
    });

    
  }

  showMenu() {
    this.tweens.add({
      targets: [this.paintHolder],
      alpha: { value: 1, duration: 1000 },
      y: {value: 535, duration: 1000},
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

  

  update() {}
}