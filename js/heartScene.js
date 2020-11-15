import Phaser from "phaser";
import ImgHeart from "../img/heart.png";

export default class HeartScene extends Phaser.Scene {
  constructor() {
    super({
      key: "HeartScene",
    });
  }

  preload() {
    this.load.image("heart", ImgHeart);
  }

  create(params) {
    console.log("lauching heart")

    this.add.particles("heart").createEmitter({
      scale: { start: 0, end: 0.9 },
      alpha: { start: 1, end: 0 },
      speed: 50,
      x: params.x,
      y: params.y,
      blendMode: "NORMAL",
      lifespan: 2000,
      frequency: 200,
    });

    
  }

  update() {}
}
