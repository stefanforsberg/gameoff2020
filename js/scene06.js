import Phaser from "phaser";
import ImgScene06 from "../img/s06.png";
import ImgIce from "../img/s06_ice.png";
import ImgSun from "../img/s06_sun.png";
import ImgSunColor from "../img/s06_sun_color.png";
import ImgChild from "../img/s03_child.png";
import interaction from "../js/interaction.js";
import AudioIceMelt from "../audio/iceMelt.mp3"
import AudioIceBreak from "../audio/iceBreak.mp3"

export default class Scene06 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scene06",
    });
  }

  preload() {
    this.load.image("scene06", ImgScene06);
    this.load.image("child06", ImgChild);
    this.load.image("sun06", ImgSun);
    this.load.image("sunColor06", ImgSunColor);
    this.load.spritesheet("ice", "./" + ImgIce, {
      frameWidth: 175,
      frameHeight: 260,
      margin: 0,
      spacing: 0,
    });

    this.load.audio("iceMelt", AudioIceMelt);
    this.load.audio("iceBreak", AudioIceBreak);

    
  }

  create(params) {
    console.log("creating scene 06");
    
    this.iceMelt = this.sound.add("iceMelt", { loop: false, volume: 1 });
    this.iceBreak = this.sound.add("iceBreak", { loop: false, volume: 1 });

    this.input.topOnly = false;

    this.luna = params.luna;

    this.add.image(512, 300, "scene06");

    this.child = this.physics.add.image(465, 170, "child06");

    this.sprite = this.add.sprite(465,200, "ice", 0);
    this.sprite.alpha = 0.8;

    

    this.sun = this.add.image(750,110, "sun06")
    this.sun.setInteractive();

    this.sunColor = this.add.image(750,110, "sunColor06")
    this.sunColor.alpha = 0;

    interaction.click(this, this.sun, "Yellow", true, () => {
      params.parent.sounds.scribble.play();

      this.sunColor.alpha = 1;

      this.time.addEvent({
        delay: 2000,
        callback: () => {

          this.sprite.anims.play("ice-crack");
          this.iceBreak.play();

          this.time.addEvent({
            delay: 2000,
            callback: () => {
              this.iceMelt.play();
              this.sprite.anims.play("ice-melt");
    
              params.parent.scene.resume();
    
              const overlap = this.physics.add.overlap(this.child, this.luna.sprite, () => {
                overlap.destroy();
                this.scene.launch("HeartScene", {x: this.child.x, y: this.child.y})
                this.scene.bringToTop("HeartScene");
                params.parent.scene.pause();
          
                this.time.addEvent({
                  delay: 2000,
                  callback: () => {
                    this.scene.stop("HeartScene")
          
                    this.tweens.add({
                      targets: [this.child ],
                      alpha: { value: 0, duration: 2000 },
                      scale: { value: 0.5, duration: 2000 },
                      x: {value: 476, duration: 2000},
                      y: {value: 528, duration: 2000},
                      yoyo: false,
                      loop: 0,
                      onComplete: () => {
                        
                        this.scene.manager.getScene("MenuScene").addBlue();
                        params.parent.scene.resume();
                      }
                    });
                  },
                  callbackScope: this,
                  loop: false
                });
          
               
              });
            },
            callbackScope: this,
            loop: false,
          });
        },
        callbackScope: this,
        loop: false
      });



      params.parent.scene.pause();

      
    });


    this.anims.create({
      key: "ice-crack",
      frames: this.anims.generateFrameNumbers("ice", { start: 0, end: 2 }),
      frameRate: 1,
      repeat: -1,
      yoyo: false,
    });

    this.anims.create({
      key: "ice-melt",
      frames: this.anims.generateFrameNumbers("ice", { start: 3, end: 8 }),
      frameRate: 3,
      repeat: 0,
      yoyo: false,
    });

    interaction.exitLeft(this, params.luna, 50, 300, params.exitLeft);

    interaction.exitRight(this, params.luna, 900, 300, params.exitRight)

    this.walkable = interaction.getPolygon(this, [40,308,462,219,538,253,902,291,902,405,40,405]);
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
