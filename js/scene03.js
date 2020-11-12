import Phaser from "phaser";
import ImgChild from "../img/s03_child.png";
import ImgHeart from "../img/heart.png"
import interaction from "../js/interaction.js"

export default class Scene03 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scene03",
    });
  }

  preload() {
    this.load.image("child", ImgChild);
    this.load.image("heart", ImgHeart);
  }

  create(params) {

    console.log("creating scene 03")

    this.luna = params.luna;

    this.backgroundBright = this.add.graphics();
    this.backgroundBright.fillStyle(0xF5F4F0);
    this.backgroundBright.fillRect(0, 0, 1024, 600);

    this.child = this.physics.add.image(512, 300, "child");

    const overlap = this.physics.add.overlap(this.child, this.luna.sprite, () => {
      overlap.destroy();
      this.scene.launch("HeartScene", {x: this.child.x, y: this.child.y})
      this.scene.bringToTop("HeartScene");
      params.mainScene.scene.pause();

      

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.tweens.add({
            targets: [this.child ],
            alpha: { value: 0, duration: 2000 },
            scale: { value: 0.5, duration: 2000 },
            x: {value: 476, duration: 2000},
            y: {value: 528, duration: 2000},
            yoyo: false,
            loop: 0,
            onComplete: () => {
              this.scene.stop("HeartScene")
              this.scene.manager.getScene("MenuScene").addBlue();
              params.mainScene.scene.resume();
            }
          });
        },
        callbackScope: this,
        loop: false
      });

     
    });
    
    interaction.exitRight(this, params.luna, 900, 300, params.exitRight)

    interaction.exitUp(this, params.luna, 512, 70, params.exitUp)


    this.scene.pause();
  }

  update() {
    
  }
}
