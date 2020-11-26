import SceneBase from "../js/sceneBase";
import ImgScene03 from "../img/s03.png";
import interaction from "../js/interaction.js"

export default class Scene03 extends SceneBase {
  constructor() {
    super({
      key: "Scene03",
    });
  }

  preload() {
    this.load.image("scene03", ImgScene03);


  }

  create(params) {
    super.setParams(params);

    console.log("creating scene 03")

    this.luna = params.luna;

    this.add.image(512,300, "scene03")

    interaction.exitRight(this, params.luna, 911, 360, params.exitRight)

    interaction.exitUp(this, params.luna, 525, 100, params.exitUp)

    super.setWalkable([48,283,473,279,493,16,584,17,606,264,967,307,960,430,34,423])

    this.scene.pause();
  }

  update() {
    
  }
}
