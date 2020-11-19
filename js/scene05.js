import Phaser from "phaser";
import ImgScene05 from "../img/s05.png";
import ImgSunbather from "../img/s05_sunbather.png";
import ImgTree from "../img/s05_tree.png";
import ImgTreeColor from "../img/s05_tree_color.png";
import ImgLeaf from "../img/s05_leaf.png";
import ImgRain from "../img/s05_rain.png";
import interaction from "../js/interaction.js";
import AudioBeach from "../audio/beach.mp3"

export default class Scene05 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scene05",
    });
  }

  preload() {
    this.load.image("scene05", ImgScene05);
    this.load.image("scene05Tree", ImgTree);
    this.load.image("scene05TreeColor", ImgTreeColor);
    this.load.image("scene05Rain", ImgRain);

    this.load.spritesheet("leaf", "./" + ImgLeaf, {
      frameWidth: 23,
      frameHeight: 15,
      margin: 0,
      spacing: 0,
    });

    this.load.spritesheet("sunbather", "./" + ImgSunbather, {
      frameWidth: 40,
      frameHeight: 60,
      margin: 0,
      spacing: 0,
    });

    this.load.audio("beach", AudioBeach);
  }

  create(params) {
    console.log("creating scene 05");

    this.beach = this.sound.add("beach", { loop: true, volume: 1 });
    this.beach.play();

    this.input.topOnly = false;

    this.luna = params.luna;

    this.add.image(512, 300, "scene05");

    this.setupSunbather();

    this.setupTree(params);

    
    

    interaction.exitLeft(this, this.luna, 50, 300, params.exitLeft);

    this.walkable = interaction.getPolygon(this, [19, 135, 444, 205, 319, 461, 18, 454]);
    this.walkable.on(
      "pointerdown",
      function (pointer) {
        if (this.input.manager.defaultCursor === "") {
          params.luna.setTarget(pointer.worldX, pointer.worldY);
        }
      },
      this
    );

    this.scene.scene.events.on('pause', () => 
    {
      if(this.beach.isPlaying) {
        this.beach.pause();
      }
    });

    this.scene.scene.events.on('resume', () => 
    {
      if(this.beach.isPaused) {
        this.beach.resume();
      }
    });

    this.scene.pause();
  }

  setupTree(params) {

    this.leafEmitter = this.add.particles("leaf").createEmitter({
      frame: [0,1],
      scale: { start: 1, end: 0.5 },
      alpha: { start: 0.7, end: 1 },
      x: {min: 220, max: 310},
      y: {min: 40, max: 110},
      minVelocityX: 10,
      gravityX: 45,
      gravityY: 10,
      quantity: 1,
      blendMode: "NORMAL",
      lifespan: {min: 2000, max: 10000},
      frequency: 200,
      rotate: { start: 0, end: 720 }
    });

    this.leafEmitter.pause();

    this.tree = this.add.sprite(245,123, "scene05Tree");
    this.treeColor = this.add.sprite(245,123, "scene05TreeColor");
    this.treeColor.alpha = 0;

   
    this.treeColors = [];

    this.tree.setInteractive();

    this.tree.on("pointerdown", () => {
      params.parent.sounds.scribble.play();

      if(this.input.manager.defaultCursor.indexOf("Yellow") > -1) {
        this.treeColors.push("Y");
      } else if (this.input.manager.defaultCursor.indexOf("Red") > -1) {
        this.treeColors.push("R");
      } else if (this.input.manager.defaultCursor.indexOf("Orange") > -1) {
        this.treeColors.push("O");
      }

      console.log(this.treeColors)

      if((this.treeColors.indexOf("Y") > -1 && this.treeColors.indexOf("R") > -1) || this.treeColors.indexOf("O") > -1) {
        this.tree.destroy();
        this.treeColor.alpha = 1;

        this.leafEmitter.resume();

        this.add.particles("scene05Rain").createEmitter({
          scale: { start: 0.9, end: 0.4 },
          alpha: { start: 0.6, end: 0 },
          x: {min: 0, max: 1200},
          y: {min: -100, max: -40},
          minVelocityY: 50,
          gravityX: -35,
          gravityY: 100,
          quantity: 3,
          blendMode: "NORMAL",
          lifespan: 4000,
        });
      }
    });

   

    
  }

  setupSunbather() {
    this.sprite = this.add.sprite(485, 140, "sunbather", 0).setSize(40, 60);

    const frames = this.anims.generateFrameNumbers("sunbather", { start: 0, end: 4 });
    frames.push({ key: "sunbather", frame: 4 });
    frames.push({ key: "sunbather", frame: 4 });
    frames.push({ key: "sunbather", frame: 4 });
    frames.push({ key: "sunbather", frame: 4 });

    this.anims.create({
      key: "sunbather-drink",
      frames: frames,
      frameRate: 6,
      repeat: -1,
      yoyo: true,
      repeatDelay: 3000,
    });

    this.sprite.anims.play("sunbather-drink");

    this.sprite.setInteractive();

    this.sprite.on(
      "pointerdown",
      function () {
        interaction.writeText(
          "Lazy sunbather: Ah, this is so nice. I'm going to sit here until fall...",
          true,
          () => {
            
          }
        );
      },
      this
    );
  }

  update() {}
}
