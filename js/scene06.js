import SceneBase from "../js/sceneBase"
import ImgScene06 from "../img/s06.png";
import ImgIce from "../img/s06_ice.png";
import ImgSun from "../img/s06_sun.png";
import ImgSunColor from "../img/s06_sun_color.png";
import ImgChild from "../img/s03_child.png";
import interaction from "../js/interaction.js";
import AudioIceMelt from "../audio/iceMelt.mp3"
import AudioIceBreak from "../audio/iceBreak.mp3"

export default class Scene06 extends SceneBase {
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
    this.setParams(params);

    console.log("creating scene 06");

    this.iceMelt = this.sound.add("iceMelt", { loop: false, volume: 1 });
    this.iceBreak = this.sound.add("iceBreak", { loop: false, volume: 1 });

    this.input.topOnly = false;

    this.luna = params.luna;

    this.add.image(512, 300, "scene06");

    this.child = this.physics.add.image(465, 170, "child06");

    this.child.setInteractive();
    interaction.setTalkCursor(this.child);
    this.child.on("pointerdown", () => {
      if(this.sunColor.alpha === 0) {
        this.canMove = false;
        interaction.writeText("Luna: Oh no, my poor child appears to be frozen solid. Maybe I can find a way to melt the ice...?", true, () => {this.canMove = true});
      } else {
        if (this.input.manager.defaultCursor === "" && this.canMove) {
          params.luna.setTarget(461, 235);
        }
      }
      
      
    })

    this.sprite = this.add.sprite(465,200, "ice", 0);
    this.sprite.alpha = 0.8;

    

    this.sun = this.add.image(750,110, "sun06")
    this.sun.setInteractive();

    this.sunColor = this.add.image(750,110, "sunColor06")
    this.sunColor.alpha = 0;

    interaction.click(this, this.sun, "Yellow", true, () => {
      params.parent.sounds.scribble.play();

      this.sunColor.alpha = 1;

      this.canMove = false;

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

              this.canMove = true;
    
              const overlap = this.physics.add.overlap(this.child, this.luna.sprite, () => {

                this.luna.stop();

                params.parent.sounds.playChildFound();

                this.canMove = false;

                overlap.destroy();
                this.scene.launch("HeartScene", {x: this.child.x, y: this.child.y})
                this.scene.bringToTop("HeartScene");
          
                this.time.addEvent({
                  delay: 2000,
                  callback: () => {
                    this.scene.stop("HeartScene")
          
                    this.canMove = true;

                    this.tweens.add({
                      targets: [this.child ],
                      alpha: { value: 0, duration: 2000 },
                      scale: { value: 0.5, duration: 2000 },
                      x: {value: 430, duration: 2000},
                      y: {value: 526, duration: 2000},
                      yoyo: false,
                      loop: 0,
                      onComplete: () => {
                        
                        this.scene.manager.getScene("MenuScene").addBlue();
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

    interaction.exitLeft(this, params.luna, 107,340, params.exitLeft);

    interaction.exitRight(this, params.luna, 862, 340, params.exitRight)

    interaction.exitDown(this, params.luna, 474, 423, params.exitDown)

    

    super.setWalkable([40,308,462,219,538,253,902,291,902,405, 536,406,526,460,421,463, 419,404, 40,405])

    this.scene.pause();
  }

  update() {}
}
