import Phaser from "phaser";
import ImgScene07 from "../img/s07.png";
import ImgHacker from "../img/s07_hacker.png";
import ImgGems from "../img/s07_gems.png";
import interaction from "../js/interaction.js";
import AudioHack from "../audio/hack.mp3"


export default class Scene07 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scene07",
    });
  }

  preload() {
    this.load.image("scene07", ImgScene07);
    this.load.image("scene07Gems", ImgGems);
    

    this.load.spritesheet("hacker", "./" + ImgHacker, {
      frameWidth: 78,
      frameHeight: 87,
      margin: 0,
      spacing: 0,
    });

    this.load.audio("hack", AudioHack);
  }

  create(params) {
    console.log("creating scene 07");

    this.hack = this.sound.add("hack", { loop: false, volume: 0.1 });

    

    // this.input.topOnly = false;

    // this.luna = params.luna;

    this.add.image(512, 300, "scene07");
    // this.sceneColor = this.add.image(512, 300, "scene04Color");
    // this.sceneColor.alpha = 0;

    this.add.image(649,321, "scene07Gems")

    this.hacker = this.add.sprite(507,263, "hacker", 0).setSize(78, 87);
    // this.waves.alpha = 0;

    this.hacker.scale = 1.4;

    const frames = this.anims.generateFrameNumbers("hacker", { start: 0, end: 5 });
    frames.push({ key: "hacker", frame: 5 });

    this.anims.create({
      key: "hacker",
      frames: frames,
      frameRate: 8,
      repeat: -1,
      yoyo: true,
    });

    this.hacker.anims.play("hacker").on('animationrepeat', () => { this.hack.play()});
    

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
