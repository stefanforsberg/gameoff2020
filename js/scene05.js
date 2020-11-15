import Phaser from "phaser";
import ImgScene05 from "../img/s05.png";
import ImgSunbather from "../img/s05_sunbather.png";
import interaction from "../js/interaction.js";

export default class Scene05 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scene05",
    });
  }

  preload() {
    this.load.image("scene05", ImgScene05);
    this.load.spritesheet("sunbather", "./" + ImgSunbather, {
      frameWidth: 40,
      frameHeight: 60,
      margin: 0,
      spacing: 0,
    });
    
  }

  create(params) {
    console.log("creating scene 05");

    this.input.topOnly = false;

    this.luna = params.luna;

    this.add.image(512, 300, "scene05");

    this.sprite = this.add.sprite(485,140, "sunbather", 0).setSize(40, 60);

    const frames = this.anims.generateFrameNumbers("sunbather", { start: 0, end: 4 });
    frames.push({key: "sunbather", frame:4});
    frames.push({key: "sunbather", frame:4});
    frames.push({key: "sunbather", frame:4});
    frames.push({key: "sunbather", frame:4});


    this.anims.create({
      key: "sunbather-drink",
      frames: frames,
      frameRate: 6,
      repeat: -1,
      yoyo: true,
      repeatDelay: 3000
    });

    this.sprite.anims.play("sunbather-drink");

    interaction.exitLeft(this, this.luna, 50, 300, params.exitLeft);

    this.walkable = interaction.getPolygon(this, [19, 135, 444, 205, 319, 461, 18, 454]);
    this.walkable.on(
      "pointerdown",
      function (pointer) {
        if (this.input.manager.defaultCursor === "") {
          params.luna.setTarget(pointer.worldX, pointer.worldY);
        }
      },
      this
    );

    this.scene.pause();
  }

  update() {}
}
