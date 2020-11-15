import Phaser from "phaser";
import CursorWalk from "../img/cursorWalk.png";
import CursorNo from "../img/cursorNo.png";
import ImgSun from "../img/s01_sun.png";
import interaction from "../js/interaction.js";

import ImgLunaStandUpSheet from "../img/lunastandup.png";

export default class Scene01 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scene01",
    });
  }

  preload() {
    this.load.image("sun", ImgSun);

    this.load.spritesheet("lunastandup", "./" + ImgLunaStandUpSheet, {
      frameWidth: 270,
      frameHeight: 240,
      margin: 0,
      spacing: 0,
    });
  }

  create(params) {
    console.log("scene 1");

    this.params = params;

    this.input.on(
      "pointerdown",
      function (pointer, x) {
        if (this.input.manager.defaultCursor === "") {
          this.params.luna.setTarget(pointer.worldX, pointer.worldY);
        }
      },
      this
    );

    this.backgroundDark = this.add.graphics();
    this.backgroundDark.fillStyle(0x0d0909);
    this.backgroundDark.fillRect(0, 0, 1024, 600);

    this.spritestandup = this.add.sprite(200, 290, "lunastandup", 0).setSize(270, 240);

    this.spritestandup.scale = 0.63;

    this.sun = this.add.image(800, 150, "sun");
    this.sun.alpha = 0;

    this.sun.setInteractive();

    this.backgroundBright = this.add.graphics();
    this.backgroundBright.fillStyle(0xf5f4f0);
    this.backgroundBright.fillRect(0, 0, 1024, 600);
    this.backgroundBright.alpha = 0;

    this.anims.create({
      key: "luna-wake-up",
      frames: this.anims.generateFrameNumbers("lunastandup", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "luna-stand-up",
      frames: this.anims.generateFrameNumbers("lunastandup", { start: 1, end: 8 }),
      frameRate: 6,
      repeat: 0,
    });

    this.spritestandup.setInteractive();

    interaction.click(this, this.spritestandup, "Yellow", true, () => {
      this.params.parent.sounds.scribble.play();

      this.spritestandup.anims.play("luna-wake-up");

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.spritestandup.anims.play("luna-stand-up");

          this.spritestandup.once("animationcomplete", () => {

            document.getElementsByTagName("body")[0].style.animation = "colorFade 1s normal forwards";

            this.tweens.add({
              targets: [this.backgroundBright, this.params.luna.container],
              alpha: { value: 1, duration: 1000 },
              yoyo: false,
              loop: 0,
              onComplete: () => {
                this.params.lightCb();
                interaction.exitRight(this, this.params.luna, 900, 300, this.params.exitRight);
              },
            });
          });
        },
        callbackScope: this,
        loop: false,
      });
    });
  }

  update() {}
}
