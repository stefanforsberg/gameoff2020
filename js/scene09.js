import SceneBase from "../js/sceneBase"
import ImgScene09 from "../img/s09.png";
import interaction from "../js/interaction.js";


export default class Scene09 extends SceneBase {
  constructor() {
    super({
      key: "Scene09",
    });
  }

  preload() {
    this.load.image("scene09", ImgScene09);

  }

  create(params) {
    this.setParams(params);
    console.log("creating scene 09");

    this.add.image(512, 300, "scene09");

    this.lighthouse = this.add.rectangle(388,141, 100, 220, 0x0d0909, 0); 

    this.lighthouse.setInteractive();
    interaction.setTalkCursor(this.lighthouse);
    this.lighthouse.on("pointerdown", () => {
      this.canMove = false;
      interaction.writeText("Mysterious voice: If you find your children and some wood, a bird feather and a mining axe we can use this lighthouse to restore your home.", true, () => {
        this.canMove = true;
      })
    })

    interaction.exitLeft(this, params.luna, 103, 236, params.exitLeft);

    super.setWalkable([68,178, 321,180, 325,252, 68,319])

    this.scene.pause();
  }

  update() {}
}
