import SceneBase from "../js/sceneBase";
import ImgScene04 from "../img/s04.png";
import ImgScene04Color from "../img/s04_color.png";
import ImgScene04Child from "../img/s04_child.png";
import ImgScene04Waves from "../img/s04_waves.png";
import AudioRiver from "../audio/river.mp3"
import interaction from "../js/interaction.js";

export default class Scene04 extends SceneBase {
  constructor() {
    super({
      key: "Scene04",
    });
  }

  preload() {
    this.load.image("scene04", ImgScene04);
    this.load.image("scene04Color", ImgScene04Color);
    this.load.image("scene04Child", ImgScene04Child);
    this.load.audio("river", AudioRiver);

    this.load.spritesheet("waves", "./" + ImgScene04Waves, {
      frameWidth: 525,
      frameHeight: 303,
      margin: 0,
      spacing: 0,
    });
  }

  create(params) {
    super.setParams(params);

    this.riverSound = this.sound.add("river", { loop: true, volume: 0.4 });

    

    this.input.topOnly = false;

    this.luna = params.luna;

    this.add.image(512, 300, "scene04");
    this.sceneColor = this.add.image(512, 300, "scene04Color");
    this.sceneColor.alpha = 0;

    this.waves = this.add.sprite(585,325, "waves", 0).setSize(520, 303);
    this.waves.alpha = 0;

    this.anims.create({
      key: "waves",
      frames: this.anims.generateFrameNumbers("waves", { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1,
      yoyo: false,
    });
    
    

    this.child = this.physics.add.image(777, 197, "scene04Child");
    this.child.scale = 0.6;

    this.river = interaction.getPolygon(this, [520,181, 843,186, 672,479, 351,476]);

    this.setupRiverClick(params);

    this.setupPickupChild(params);

    interaction.exitLeft(this, this.luna, 50, 300, params.exitLeft);

    interaction.exitUp(this, this.luna, 377, 145, params.exitUp, -100);

    super.setWalkable([19, 135, 340,152, 353,88, 398,82, 421,144, 496,197, 384,402, 400,402, 390, 471, 347, 473, 330,507, 18,454])

    this.scene.scene.events.on('pause', () => 
    {
      if(this.riverSound.isPlaying) {
        this.riverSound.pause();
      }
    });

    this.scene.scene.events.on('resume', () => 
    {
      if(this.riverSound.isPaused) {
        this.riverSound.resume();
      }
    });

    this.scene.pause();


  }

  setupRiverClick(params) {
    interaction.click(this, this.river, "Blue", true, () => {

      this.sceneColor.alpha = 1;
      params.parent.sounds.scribble.play();

      this.waves.anims.play("waves");
      this.waves.alpha = 0.6
      
      this.riverSound.play();

      params.parent.scene.pause();
      this.tweens.add({
        targets: [this.child],
        scale: { value: 1, duration: 4000 },
        x: { value: 370, duration: 4000 },
        y: { value: 425, duration: 4000 },
        yoyo: false,
        loop: 0,
        onComplete: () => {
          params.parent.scene.resume();
        },
      });
    });
  }

  setupPickupChild(params) {
    const overlap = this.physics.add.overlap(this.child, this.luna.sprite, () => {
      overlap.destroy();
      
      this.luna.stop();
      params.parent.sounds.playChildFound();
      this.canMove = false;

      this.scene.launch("HeartScene", { x: this.child.x, y: this.child.y, child: this.child });
      this.scene.bringToTop("HeartScene");

      this.time.addEvent({
        delay: 3000,
        callback: () => {
          this.scene.stop("HeartScene");
          
          this.tweens.add({
            targets: [this.child],
            alpha: { value: 0, duration: 2000 },
            scale: { value: 0.5, duration: 2000 },
            x: { value: 570, duration: 2000 },
            y: { value: 526, duration: 2000 },
            yoyo: false,
            loop: 0,
            onComplete: () => {
              this.canMove = true;
              
              this.scene.manager.getScene("MenuScene").addRed();
            },
          });
        },
        callbackScope: this,
        loop: false,
      });
    });
  }

  update() {}
}
