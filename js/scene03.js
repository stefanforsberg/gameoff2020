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
    this.load.image("scene03", ImgScene03);


  }

  create(params) {

    console.log("creating scene 03")

    this.luna = params.luna;

    this.add.image(512,300, "scene03")

    this.input.topOnly = false;

    interaction.exitRight(this, params.luna, 900, 300, params.exitRight)

    interaction.exitUp(this, params.luna, 525, 100, params.exitUp)

    this.walkable = interaction.getPolygon(this, [48,283,473,279,493,16,584,17,606,264,967,307,960,430,34,423])
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

  update() {
    
  }
}
