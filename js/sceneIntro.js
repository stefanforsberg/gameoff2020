import Phaser from "phaser";

import ImgIntro01 from "../img/intro_01.png";
import ImgStar from "../img/intro_star.png";
import ImgMoonShard1 from "../img/intro_moon_shard01.png";
import ImgMoonShard2 from "../img/intro_moon_shard02.png";
import ImgMoonShard3 from "../img/intro_moon_shard03.png";
import ImgMoonShard4 from "../img/intro_moon_shard04.png";
import ImgSkip from "../img/intro_skip.png";
import ImgEarth from "../img/intro_earth.png";
import ImgEarthNoColor from "../img/intro_earth_nocolor.png";
import ImgLuna from "../img/intro_luna.png";
import ImgBeing from "../img/being.png";
import ImgTitle from "../img/title.png";
import ImgShot from "../img/intro_shot.png";
import ImgComet from "../img/intro_comet.png";
import ImgCometTrail from "../img/intro_cometTrail.png";

import AudioIntro from "../audio/intro.mp3";

export default class SceneIntro extends Phaser.Scene {
  constructor() {
    super({
      key: "SceneIntro",
    });
  }

  preload() {
    this.load.image("intro01", ImgIntro01);
    this.load.image("star", ImgStar);
    this.load.image("being", ImgBeing);
    this.load.image("title", ImgTitle);
    this.load.image("shot", ImgShot);

    this.load.image("comet", ImgComet);
    this.load.image("cometTrail", ImgCometTrail);

    this.load.image("moon1", ImgMoonShard1);
    this.load.image("moon2", ImgMoonShard2);
    this.load.image("moon3", ImgMoonShard3);
    this.load.image("moon4", ImgMoonShard4);

    this.load.image("skip", ImgSkip);

    this.load.image("earth", ImgEarth);
    this.load.image("earthNoColor", ImgEarthNoColor);

    this.load.image("intro_luna", ImgLuna);

    this.load.audio("introTheme", AudioIntro);
  }

  create(params) {

    this.params = params;

    this.introTheme = this.sound.add("introTheme", { loop: false, volume: 1 });

    this.backgroundDark = this.add.graphics();
    this.backgroundDark.fillStyle(0x0d0909);
    this.backgroundDark.fillRect(0, 0, 1024, 600);

    const title = this.add.image(512, 300, "title");

    document.getElementById("loading").style.display = 'none';

    this.intro01 = this.add.image(512, 300, "intro01");
    this.intro01.alpha = 0;

    this.earth = this.add.image(512, 300, "earth");
    this.earth.scale = 0.6;
    this.earth.alpha = 0;

    this.earthNoColor = this.add.image(512, 300, "earthNoColor");
    this.earthNoColor.alpha = 0;

    title.setInteractive();
    title.once("pointerdown", () => {
      document.getElementsByTagName("body")[0].style.animation = "colorFadeToDark 2s normal forwards";

      this.introTheme.play();

      this.time.addEvent({
        delay: 36000,
        callback: () => {
          this.end();
        },
        callbackScope: this,
        loop: false,
      });

      this.tweens.add({
        targets: [this.intro01],
        alpha: { value: 1, duration: 2000 },
        yoyo: false,
        loop: 0,
        onComplete: () => {
          title.alpha = 0;

          this.skip = this.add.image(900, 100, "skip");
          this.skip.alpha = 0.5;
          this.skip.setInteractive();
          this.skip.on("pointerdown", () => {
            this.end();
          });

          this.introPart1();

          this.time.addEvent({
            delay: 3650,
            callback: () => {
              this.introPart2();
            },
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 11000,
            callback: () => {
              this.introPart3();
            },
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 22000,
            callback: () => {
              this.introPart4();
            },
            callbackScope: this,
            loop: false,
          });
        },
      });
    });
  }

  end() {
    this.tweens.add({
      targets: [this.introTheme],
      volume: { value: 0, duration: 3000 },
      yoyo: false,
      loop: 0,
      onComplete: () => {
        this.params.cb();
        this.scene.remove();
      },
    });

    this.cameras.main.fade(3000, 13, 9, 9);
  }

  introPart1() {
    this.cameras.main.setBackgroundColor("#0D0909");

    this.stars = this.add.particles("star").createEmitter({
      scale: { start: 0.9, end: 0.4 },
      alpha: { start: 0.6, end: 0 },
      x: { min: 0, max: 1200 },
      y: { min: 0, max: 600 },
      gravityX: 2,
      gravityY: 2,
      quantity: 3,
      frequency: 300,
      blendMode: "NORMAL",
      lifespan: 1000,
    });
  }

  introPart2() {
    this.comet = this.add.image(-60, -60, "comet");

    this.tweens.add({
      targets: [this.comet],
      x: { value: 1000, duration: 14400 },
      y: { value: 700, duration: 14400 },
      angle: { value: 700, duration: 14400 },
      yoyo: false,
      loop: 0,
    });

    this.emitter = this.add.particles("cometTrail").createEmitter({
      scale: { start: 0.4, end: 0.2 },
      alpha: { start: 0.6, end: 0.2 },
      gravityX: 0,
      gravityY: 0,
      speedX: { max: -65, min: -85 },
      speedY: { max: -45, min: -65 },
      quantity: 1,
      blendMode: "Add",
      lifespan: 1000,
    });

    this.emitter.startFollow(this.comet);
    
    this.comet2 = this.add.image(-60, 300, "comet");
    this.comet2.scale = 0.5;

    this.tweens.add({
      targets: [this.comet2],
      x: { value: 1000, duration: 4400 },
      y: { value: 700, duration: 4400 },
      angle: { value: -700, duration: 4400 },
      yoyo: false,
      loop: 0,
    });

    this.emitter = this.add.particles("cometTrail").createEmitter({
      scale: { start: 0.2, end: 0.1 },
      alpha: { start: 0.6, end: 0.2 },
      gravityX: 0,
      gravityY: 0,
      speedX: { max: -45, min: -65 },
      speedY: { max: -45, min: -65 },
      quantity: 1,
      blendMode: "Add",
      lifespan: 1000,
    });

    this.emitter.startFollow(this.comet2);

    this.time.addEvent({
      delay: 6000,
      callback: () => {
        this.cameras.main.shake(3000);
        this.cameras.main.flash(2000);
      },
      callbackScope: this,
      loop: false,
    });

    this.comet3 = this.add.image(400, -60, "comet");
    this.comet3.scale = 0.6;

    this.tweens.add({
      targets: [this.comet3],
      x: { value: 1200, duration: 5400 },
      y: { value: 300, duration: 5400 },
      angle: { value: -700, duration: 5400 },
      yoyo: false,
      loop: 0,
    });

    this.emitter = this.add.particles("cometTrail").createEmitter({
      scale: { start: 0.2, end: 0.1 },
      alpha: { start: 0.6, end: 0.2 },
      gravityX: 0,
      gravityY: 0,
      speedX: { max: -45, min: -65 },
      speedY: { max: -45, min: -65 },
      quantity: 1,
      blendMode: "Add",
      lifespan: 1000,
    });

    this.emitter.startFollow(this.comet3);

    this.time.addEvent({
      delay: 6000,
      callback: () => {
        this.cameras.main.shake(3000);
        this.cameras.main.flash(2000);
      },
      callbackScope: this,
      loop: false,
    });

    // this.time.addEvent({
    //   delay: 6000,
    //   callback: () => {
    //     this.emitter.stop();
    //   },
    //   callbackScope: this,
    //   loop: false,
    // });
  }

  introPart3() {
    this.luna = this.add.image(512, 300, "intro_luna");
    this.luna.scale = 0.5;
    this.luna.alpha = 0;

    this.moon1 = this.add.image(436, 253, "moon1");
    this.moon2 = this.add.image(550, 253, "moon2");
    this.moon3 = this.add.image(430, 363, "moon3");
    this.moon4 = this.add.image(545, 363, "moon4");

    this.intro01.alpha = 0;

    this.tweens.add({
      targets: [this.being],
      alpha: { value: 0, duration: 3000 },
      yoyo: false,
      loop: 0,
    });

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        this.tweens.add({
          targets: [this.luna],
          scale: { value: 1, duration: 3000 },
          alpha: { value: 1, duration: 3000 },
          yoyo: false,
          loop: 0,
          onComplete: () => {
            this.stars.gravityY = -300;
            this.stars.frequency = 20;
            this.stars.setLifespan(8000);

            this.time.addEvent({
              delay: 3000,
              callback: () => {
                this.tweens.add({
                  targets: [this.luna],
                  y: { value: 800, duration: 1000 },
                });
              },
            });
          },
        });
      },
      callbackScope: this,
      loop: false,
    });

    this.tweens.add({
      targets: [this.moon1],
      x: { value: -50, duration: 8000 },
      y: { value: -50, duration: 8000 },
      scale: { value: 0.5, duration: 8000 },
      angle: { value: 720, duration: 8000 },
      yoyo: false,
      loop: 0,
    });

    this.tweens.add({
      targets: [this.moon2],
      x: { value: 1150, duration: 8000 },
      y: { value: -50, duration: 8000 },
      scale: { value: 0.5, duration: 8000 },
      angle: { value: 720, duration: 8000 },
      yoyo: false,
      loop: 0,
    });

    this.tweens.add({
      targets: [this.moon3],
      x: { value: -50, duration: 8000 },
      y: { value: 650, duration: 8000 },
      scale: { value: 0.5, duration: 8000 },
      angle: { value: 720, duration: 8000 },
      yoyo: false,
      loop: 0,
    });

    this.tweens.add({
      targets: [this.moon4],
      x: { value: 1150, duration: 8000 },
      y: { value: 650, duration: 8000 },
      scale: { value: 0.5, duration: 8000 },
      angle: { value: 720, duration: 8000 },
      yoyo: false,
      loop: 0,
    });
  }

  introPart4() {
    this.luna.x = 512;
    this.luna.y = 300;
    this.luna.alpha = 1;
    this.luna.scale = 20;

    this.stars2 = this.add.particles("star").createEmitter({
      scale: { start: 0, end: 5 },
      alpha: { start: 0.6, end: 0 },
      x: 512,
      y: 300,
      angle: { min: 0, max: 360 },
      speed: { min: 300, max: 500 },
      gravityX: 0,
      gravityY: 0,
      quantity: 1,
      blendMode: "NORMAL",
      lifespan: 2000,
    });

    this.earth.alpha = 1;

    this.stars.remove();

    this.tweens.add({
      targets: [this.luna],
      scale: { value: 0, duration: 5000 },
      ease: "Quad",
      yoyo: false,
      loop: 0,
    });

    this.tweens.add({
      targets: [this.earth],
      scale: { value: 1, duration: 3000 },
      ease: "Quad",
      yoyo: false,
      loop: 0,
      onComplete: () => {
        this.stars2.stop();
        this.tweens.add({
          targets: [this.earthNoColor],
          alpha: { value: 1, duration: 8000 },
          ease: "Power",
          yoyo: false,
          loop: 0,
        });
      },
    });
  }

  update() {}
}
