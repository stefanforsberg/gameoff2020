import Phaser from "phaser";
import ImgScene04 from "../img/s04.png";
import ImgScene04Color from "../img/s04_color.png";
import ImgScene04Child from "../img/s04_child.png";
import interaction from "../js/interaction.js";

export default class Scene04 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scene04",
    });
  }

  preload() {
    this.load.image("scene04", ImgScene04);
    this.load.image("scene04Color", ImgScene04Color);
    this.load.image("scene04Child", ImgScene04Child);
  }

  create(params) {
    console.log("creating scene 04");

    this.input.topOnly = false;

    this.luna = params.luna;

    this.add.image(512, 300, "scene04");
    this.sceneColor = this.add.image(512, 300, "scene04Color");
    this.sceneColor.alpha = 0;

    this.child = this.physics.add.image(611, 149, "scene04Child").setSize(130, 130);
    this.child.scale = 0.4;

    this.river = interaction.getPolygon(this, [526, 122, 718, 140, 593, 298, 336, 460]);

    this.setupChildAnim(params);

    this.setupPickupChild(params);

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

  setupChildAnim(params) {
    interaction.click(this, this.river, "Blue", true, () => {
      this.sceneColor.alpha = 1;
      params.parent.sounds.scribble.play();

      params.parent.scene.pause();
      this.tweens.add({
        targets: [this.child],
        scale: { value: 1, duration: 3000 },
        x: { value: 390, duration: 3000 },
        y: { value: 390, duration: 3000 },
        yoyo: false,
        loop: 0,
        onComplete: () => {
          params.parent.scene.resume();
        },
      });
    });
  }

  setupPickupChild(params) {
    const overlap = this.physics.add.overlap(this.child, this.luna.sprite, () => {
      overlap.destroy();
      this.scene.launch("HeartScene", { x: this.child.x, y: this.child.y });
      this.scene.bringToTop("HeartScene");
      params.parent.scene.pause();

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.tweens.add({
            targets: [this.child],
            alpha: { value: 0, duration: 2000 },
            scale: { value: 0.5, duration: 2000 },
            x: { value: 530, duration: 2000 },
            y: { value: 528, duration: 2000 },
            yoyo: false,
            loop: 0,
            onComplete: () => {
              this.scene.stop("HeartScene");
              this.scene.manager.getScene("MenuScene").addRed();
              params.parent.scene.resume();
            },
          });
        },
        callbackScope: this,
        loop: false,
      });
    });
  }

  update() {}
}
