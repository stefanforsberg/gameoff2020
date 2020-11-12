import Phaser from "phaser";
import CursorWalk from "../img/cursorWalk.png";
import CursorNo from "../img/cursorNo.png";
import ImgBridge from "../img/s02bridge.png";
import ImgBridgeColor from "../img/s02bridgecolor.png";
import interaction from "../js/interaction.js"

export default class Scene02 extends Phaser.Scene {
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

    console.log("creating scene 02")

    this.luna = params.luna;

    this.add.image(512, 300, "scene02");
    const bridge = this.add.image(500, 300, "bridge");

    interaction.polygon(this, [145, 192, 284, 253, 283, 313.5, 68, 412, 84, 283], CursorWalk.replace("/",""), (p) => {
        this.luna.setTarget(p.worldX, p.worldY)
    });

    interaction.polygon(this, [298, 254, 743,263, 722,347, 292,335], CursorNo.replace("/",""), (p, graphics) => {
        if(graphics.input.cursor.indexOf("cursorWalk") > -1) {
            this.luna.setTarget(p.worldX, p.worldY)
        } else {
            graphics.input.cursor = "url(" + CursorWalk.replace("/","") + ") 32 32, pointer";
        }
        
    });
    interaction.exitLeft(this, this.luna, 50, 300, params.exitLeft);

    this.scene.pause();
  }

  update() {
    
  }
}
