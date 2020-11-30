import SceneBase from "../js/sceneBase";
import interaction from "../js/interaction.js";
import game from "../js/index.js"

import ImgLunaStandUpSheet from "../img/lunastandup.png";
import ImgPaintYellow from "../img/paintYellow.png";

import ImgHelp01 from "../img/s01_help01.png";
import ImgHelp02 from "../img/s01_help02.png";

export default class Scene01 extends SceneBase {
  constructor() {
    super({
      key: "Scene01",
    });
  }

  preload() {
    this.load.spritesheet("lunastandup", "./" + ImgLunaStandUpSheet, {
      frameWidth: 270,
      frameHeight: 240,
      margin: 0,
      spacing: 0,
    });

    this.load.image("help01", ImgHelp01);
    this.load.image("help02", ImgHelp02);

    this.load.image("s01paintYellow", ImgPaintYellow);

  }

  create(params) {
    super.setParams(params);

    this.backgroundDark = this.add.graphics();
    this.backgroundDark.fillStyle(0x0d0909);
    this.backgroundDark.fillRect(0, 0, 1024, 600);

    this.scene.scene.events.on('resume', () => 
    {
      if(game.config.physics.arcade.debug) {
        this.start();
      } else {
        interaction.writeText('Mysterious voice: "The world has lost its color. Luna, the daughter of the moon, can help restore color to the world but first she needs your help restoring her own color."', true, () => {
          this.start();
        }, true)
      }
    });

    this.scene.pause();
    console.log("paused s01")
  }

  start() {

    this.help01 = this.add.image(700, 430, "help01")
    this.help02 = this.add.image(520, 350, "help02")
    this.help02.alpha = 0;

    this.paintYellow = this.add.image(500, 526, "s01paintYellow");
    this.paintYellow.setInteractive();

    this.paintYellow.on("pointerdown", () => {
      this.input.setDefaultCursor("url(" + ImgPaintYellow + ") 21 20, pointer");

      this.help01.alpha = 0;
      this.help02.alpha = 1;
    })

    this.spritestandup = this.add.sprite(200, 290, "lunastandup", 0).setSize(270, 240);

    this.spritestandup.scale = 0.62;

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

                this.canMove = false;
                
                this.time.addEvent({
                  delay: 1000,
                  callback: () => {
                    interaction.writeText('Mysterious voice: "Morning Luna! I think your children fell close to here, go out into the world and find them. Use the colors you find to bring color back into the world."', true, () => {
                      this.canMove = true;

                      this.params.lightCb();
                    
                      this.setWalkable([40,40, 1160,40, 1160,560, 40, 560]);
      
                      interaction.exitRight(this, this.params.luna, 900, 300, this.params.exitRight);
                    })
    

                  },
                  callbackScope: this,
                  loop: false,
                });
                
                
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
