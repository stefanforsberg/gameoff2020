import SceneBase from "../js/sceneBase";
import ImgScene10 from "../img/s10.png";
import ImgFountainYellow from "../img/s10_fountainYellow.png";
import ImgFountainRed from "../img/s10_fountainRed.png";
import ImgFountainRedColor from "../img/s10_fountainRedColor.png";

import AudioFountain from "../audio/river.mp3"

import ImgShot from "../img/intro_shot.png";
import ImgShotRed from "../img/shotRed.png";
import ImgShotOrange from "../img/shotOrange.png";

import interaction from "../js/interaction.js";

export default class Scene10 extends SceneBase {
  constructor() {
    super({
      key: "Scene10",
    });
  }

  preload() {
    this.load.image("scene10", ImgScene10);
    this.load.image("shot", ImgShot);
    this.load.image("shotRed", ImgShotRed);
    this.load.image("shotOrange", ImgShotOrange);
    this.load.image("fountainYellow", ImgFountainYellow);
    this.load.image("fountainRed", ImgFountainRed);
    this.load.image("fountainRedColor", ImgFountainRedColor);

    this.load.audio("fountain", AudioFountain);
  }

  create(params) {
    this.setParams(params);

    this.add.image(512, 300, "scene10");

    this.fountainSound = this.sound.add("fountain", { loop: true, volume: 0.7 });
    this.fountainSound.play();

    this.setupYellowFontain();
    this.setupRedFontain();

    interaction.exitLeft(this, params.luna, 90, 460, params.exitLeft);
    interaction.exitRight(this, params.luna, 978, 460, params.exitRight);

    super.setWalkable([38, 420, 1140, 420, 1140, 510, 38, 510]);

    this.scene.scene.events.on('pause', () => 
    {
      if(this.fountainSound.isPlaying) {
        this.fountainSound.pause();
      }
    });

    this.scene.scene.events.on('resume', () => 
    {
      if(this.fountainSound.isPaused) {
        this.fountainSound.resume();
      }
    });

    this.scene.pause();
  }

  setupYellowFontain() {
    this.fountainYellow = this.add.image(250, 300, "fountainYellow");
    this.add.particles("shot").createEmitter({
      scale: { start: 0.1, end: 1 },
      alpha: { start: 0.3, end: 0.1 },
      x: 322,
      y: 185,
      speedX: { max: 250, min: 150 },
      speedY: -40,
      gravityX: 0,
      gravityY: 400,
      quantity: 2,
      blendMode: "NORMAL",
      lifespan: 1200,
    });
  }

  setupRedFontain() {
    this.fountainRed = this.add.image(750, 304, "fountainRed");
    this.fountainRed.setInteractive();

    this.fountainRedColor = this.add.image(750, 304, "fountainRedColor");
    this.fountainRedColor.alpha = 0;

    interaction.click(this, this.fountainRed, "Red", true, () => {
      this.params.parent.sounds.scribble.play();

      this.fountainRedColor.alpha = 1;

      this.add.particles("shotRed").createEmitter({
        scale: { start: 0.1, end: 1 },
        alpha: { start: 0.3, end: 0.1 },
        x: 677,
        y: 185,
        speedX: { max: -150, min: -250 },
        speedY: -40,
        gravityX: 0,
        gravityY: 400,
        quantity: 2,
        blendMode: "NORMAL",
        lifespan: 1200,
      });

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.canMove = false;

          this.add.particles("shotOrange").createEmitter({
            scale: { start: 0.6, end: 0.4 },
            alpha: { start: 0.3, end: 0.1 },
            x: 512,
            y: 345,
            speedX: { max: 100, min: -100 },
            speedY: -300,
            gravityX: 0,
            gravityY: 400,
            quantity: 1,
            blendMode: "NORMAL",
            lifespan: 1500,
          });

          interaction.writeText("Mysterious voice: Ahh, interesting! You can now combine the colors to make new colors. Click a color in your color palette with another color selected to mix.", true, () => {
            this.scene.manager.getScene("MenuScene").canMixNow();
            this.canMove = true;
          });
        }
      });


    });
  }

  update() {}
}
