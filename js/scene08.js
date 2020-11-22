import Phaser from "phaser";
import ImgScene08 from "../img/s08.png";
import ImgFlamingo from "../img/s08_flamingo.png";
import interaction from "../js/interaction.js";


export default class Scene08 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scene08",
    });
  }

  preload() {
    this.load.image("scene08", ImgScene08);
    

    this.load.spritesheet("flamingo", "./" + ImgFlamingo, {
      frameWidth: 74,
      frameHeight: 152,
      margin: 0,
      spacing: 0,
    });

  }

  create(params) {
    console.log("creating scene 08");

    // this.hack = this.sound.add("hack", { loop: false, volume: 0.1 });

    

    // this.input.topOnly = false;

    // this.luna = params.luna;

    this.add.image(512, 300, "scene08");
    // this.sceneColor = this.add.image(512, 300, "scene04Color");
    // this.sceneColor.alpha = 0;

    this.flamingo = this.add.sprite(797, 273, "flamingo", 0);
    // this.waves.alpha = 0;

    // const frames = this.anims.generateFrameNumbers("hacker", { start: 0, end: 5 });
    // frames.push({ key: "hacker", frame: 5 });

    this.anims.create({
      key: "flamingo",
      frames: this.anims.generateFrameNumbers("flamingo", { start: 0, end: 2 }),
      frameRate: 4,
      repeat: -1,
      yoyo: true,
    });

    this.flamingo.anims.play("flamingo");
    

    // this.child = this.physics.add.image(777, 197, "scene04Child");
    // this.child.scale = 0.4;

    // this.river = interaction.getPolygon(this, [520,181, 843,186, 672,479, 351,476]);

    // this.setupRiverClick(params);

    // this.setupPickupChild(params);

    interaction.exitLeft(this, params.luna, 174, 383, params.exitLeft);

    // interaction.exitUp(this, this.luna, 377, 105, params.exitUpt);

    this.walkable = interaction.getPolygon(this, [182,356, 561,309, 594,389, 356,386, 172,412]);
    this.walkable.on(
      "pointerdown",
      function (pointer) {
        if (this.input.manager.defaultCursor === "") {
          params.luna.setTarget(pointer.worldX, pointer.worldY);
        }
      },
      this
    );
    // this.scene.scene.events.on('pause', () => 
    // {
    //   if(this.riverSound.isPlaying) {
    //     this.riverSound.pause();
    //   }
    // });

    // this.scene.scene.events.on('resume', () => 
    // {
    //   if(this.riverSound.isPaused) {
    //     this.riverSound.resume();
    //   }
    // });

    this.scene.pause();


  }

  update() {}
}
