import Phaser from "phaser";
import SceneBase from "../js/sceneBase"
import ImgScene08 from "../img/s08.png";
import ImgFlowerColor from "../img/s08_flowerColor.png";
import ImgFlamingo from "../img/s08_flamingo.png";
import interaction from "../js/interaction.js";


export default class Scene08 extends SceneBase {
  constructor() {
    super({
      key: "Scene08",
    });
  }

  preload() {
    this.load.image("scene08", ImgScene08);
    this.load.image("flowerColor", ImgFlowerColor);
    

    this.load.spritesheet("flamingo", "./" + ImgFlamingo, {
      frameWidth: 74,
      frameHeight: 152,
      margin: 0,
      spacing: 0,
    });

  }

  create(params) {
    this.setParams(params);
    console.log("creating scene 08");

    this.add.image(512, 300, "scene08");
    
    this.flowerColor = this.add.image(367, 266, "flowerColor");
    this.flowerColor.alpha = 0;
    this.flowerColor.setInteractive();
    interaction.click(this, this.flowerColor, "Purple", true, () => {
        this.flowerColor.alpha = 1;
        this.params.parent.sounds.scribble.play();
        this.canMove = false;
        interaction.writeText("Flamingo: Thank you stranger, I'm off to join my family down south.", true, () => {this.canMove = true});
    });

    this.flamingo = this.add.sprite(797, 273, "flamingo", 0);

    this.flamingo.setInteractive();
    this.flamingo.on("pointerdown", () => {
      this.canMove = false;
      interaction.writeText("Flamingo: I really want to see my favorite Lavender flower before leaving south", true, () => {this.canMove = true});
    })

    this.anims.create({
      key: "flamingo",
      frames: this.anims.generateFrameNumbers("flamingo", { start: 0, end: 2 }),
      frameRate: 4,
      repeat: -1,
      yoyo: true,
    });

    this.flamingo.anims.play("flamingo");
    
    interaction.exitLeft(this, params.luna, 174, 383, params.exitLeft);

    super.setWalkable([141,356, 532,353,889,375, 921,455, 141,485])

    this.scene.pause();
  }

  update() {}
}
