import Phaser from "phaser";
import ImgScene03 from "../img/s03.png";
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
    this.load.image("scene03", ImgScene03);
  }

  create(params) {

    console.log("creating scene 03")

    this.luna = params.luna;

    this.add.image(512,300, "scene03")

    this.input.topOnly = false;

    interaction.exitRight(this, params.luna, 900, 300, params.exitRight)

    interaction.exitUp(this, params.luna, 512, 30, params.exitUp)

    this.walkable = interaction.getPolygon(this, [48,283,473,279,493,16,584,17,606,264,967,307,960,430,34,423])
    this.walkable.on(
      "pointerdown",
      function (pointer, x) {
        if (this.input.manager.defaultCursor === "") {
          params.luna.setTarget(pointer.worldX, pointer.worldY);
        }
      },
      this
    );

    

    this.child = this.physics.add.image(512, 300, "child");

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
    
    

    this.scene.pause();
  }

  update() {
    
  }
}
