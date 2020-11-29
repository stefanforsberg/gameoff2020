import SceneBase from "../js/sceneBase";
import CursorWalk from "../img/cursorWalk.png";
import CursorNo from "../img/cursorNo.png";
import ImgBridge from "../img/s02bridge.png";
import ImgBridgeColor from "../img/s02bridgecolor.png";
import interaction from "../js/interaction.js"

export default class Scene02 extends SceneBase {
  constructor() {
    super({
      key: "Scene02",
    });
  }

  preload() {
    this.load.image("bridge", ImgBridge);
    this.load.image("bridgecolor", ImgBridgeColor);
  }

  create(params) {

    super.setParams(params);

    this.luna = params.luna;

    this.add.image(512, 300, "scene02");
    this.bridge = this.add.image(500, 300, "bridge");
    this.bridge.setInteractive();

    this.bridgeColor = this.add.image(500, 300, "bridgecolor");
    this.bridgeColor.alpha = 0;

    interaction.click(this, this.bridge, "Brown", true, () => {
      this.params.parent.sounds.scribble.play();
      this.bridgeColor.alpha = 1;
      interaction.exitRight(this, this.luna, 884, 307, params.exitRight);
      super.setWalkable([145,192, 284,253, 734,277, 913,239, 966,341, 269,337, 68,412, 84, 283]);
    });

    super.setWalkable([145,192, 284,253, 269,337, 68,412, 84, 283]);

    interaction.exitLeft(this, this.luna, 100, 300, params.exitLeft);

    

    this.scene.pause();
  }

  update() {
    
  }
}
