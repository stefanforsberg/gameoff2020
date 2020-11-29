import Phaser from "phaser";
import ImgScene09Outro from "../img/s09_outro.png";
import ImgRainbow from "../img/rainbow.png";
import ImgThank from "../img/outro_thank.png";
import ImgMoonShard1 from "../img/intro_moon_shard01.png";
import ImgMoonShard2 from "../img/intro_moon_shard02.png";
import ImgMoonShard3 from "../img/intro_moon_shard03.png";
import ImgMoonShard4 from "../img/intro_moon_shard04.png";

export default class SceneOutro extends Phaser.Scene {
  constructor() {
    super({
      key: "SceneOutro",
    });
  }

  preload() {
    this.load.image("scene09outro", ImgScene09Outro);

    this.load.image("moon1outro", ImgMoonShard1);
    this.load.image("moon2outro", ImgMoonShard2);
    this.load.image("moon3outro", ImgMoonShard3);
    this.load.image("moon4outro", ImgMoonShard4);

    this.load.image("thank", ImgThank);

    this.load.spritesheet("outrorainbow", "./" + ImgRainbow, {
      frameWidth: 125,
      frameHeight: 125,
      margin: 0,
      spacing: 0,
    });
  }

  create(params) {

    this.outro = this.add.image(512, 300, "scene09outro");
    this.outro.alpha = 0;

    this.tweens.add({
      targets: [this.outro],
      alpha: 1,
      yoyo: false,
      loop: 0,
      duration: 3000,
      onComplete: () => {
        this.rainbow = this.add.particles("outrorainbow").createEmitter({
          frame: [0, 1, 2, 3, 4, 5, 6],
          scale: { start: 0.1, end: 1.4 },
          alpha: { start: 0, end: 1 },
          speedX: { min: 120, max: 240 },
          speedY: { min: -2, max: 2 },
          x: 156,
          y: 309,
          lifespan: 4000,
          blendMode: "Add",
        });
      },
    });

    this.time.addEvent({
      delay: 6000,
      callback: () => {
        this.moon1 = this.add.image(400, -300, "moon1outro");
        this.moon1.angle = 134;

        this.tweens.add({
          targets: [this.moon1],
          x: 736,
          y: 253,
          angle: 0,
          yoyo: false,
          loop: 0,
          duration: 8000,
          ease: "Cubic.easeOut",
          onComplete: () => {
            this.add.image(512, 300, "thank")
          }
        });

        this.moon2 = this.add.image(1200, -300, "moon2outro");
        this.moon2.angle = 134;

        this.tweens.add({
          targets: [this.moon2],
          x: 847,
          y: 253,
          angle: 0,
          yoyo: false,
          loop: 0,
          duration: 8000,
          ease: "Cubic.easeOut",
          onComplete: () => {

          }
        });

        this.moon3 = this.add.image(400, 900, "moon3outro");
        this.moon3.angle = 134;

        this.tweens.add({
          targets: [this.moon3],
          x: 730,
          y: 363,
          angle: 0,
          yoyo: false,
          loop: 0,
          duration: 8000,
          ease: "Cubic.easeOut",
        });

        this.moon4 = this.add.image(1200, 900, "moon4outro");
        this.moon4.angle = 134;

        this.tweens.add({
          targets: [this.moon4],
          x: 842,
          y: 363,
          angle: 0,
          yoyo: false,
          loop: 0,
          duration: 8000,
          ease: "Cubic.easeOut",
        });
      },
      callbackScope: this,
      loop: false,
    });
  }

  update() {}
}
