import SceneBase from "../js/sceneBase";
import ImgScene07 from "../img/s07.png";
import ImgHacker from "../img/s07_hacker.png";
import ImgGems from "../img/s07_gems.png";
import ImgGemsColor from "../img/s07_gemsColor.png";
import ImgAxe from "../img/s07_axe.png";
import interaction from "../js/interaction.js";
import AudioHack from "../audio/hack.mp3";

export default class Scene07 extends SceneBase {
  constructor() {
    super({
      key: "Scene07",
    });
  }

  preload() {
    this.load.image("scene07", ImgScene07);
    this.load.image("scene07Gems", ImgGems);
    this.load.image("scene07GemsColor", ImgGemsColor);
    this.load.image("scene07Axe", ImgAxe);

    this.load.spritesheet("hacker", "./" + ImgHacker, {
      frameWidth: 78,
      frameHeight: 87,
      margin: 0,
      spacing: 0,
    });

    this.load.audio("hack", AudioHack);
  }

  create(params) {
    super.setParams(params);

    this.hack = this.sound.add("hack", { loop: false, volume: 0.1 });

    this.add.image(512, 300, "scene07");

    this.setupGems();

    this.hacker = this.add.sprite(769, 329, "hacker", 0).setSize(78, 87);
    this.hacker.flipX = true;

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

    this.hacker.anims.play("hacker").on("animationrepeat", () => {
      this.hack.play();
    });

    this.hacker.setInteractive();
    interaction.setTalkCursor(this.hacker);
    this.hacker.on("pointerdown", () => {
      this.canMove = false;
      interaction.writeText('Miner: "I just need some jade gems and I can return home."', true, () => {
        this.canMove = true;
      });
    });

    interaction.exitLeft(this, params.luna, 177,342, params.exitLeft);

    super.setWalkable([168,315, 346,264, 441,324,  441,405, 148,405]);

    this.scene.pause();
  }

  setupGems() {
    this.gems = this.add.image(649, 321, "scene07Gems");
    this.gems.setInteractive();

    this.gemsColor = this.add.image(649, 321, "scene07GemsColor");
    this.gemsColor.alpha = 0;

    interaction.click(this, this.gems, "Green", true, () => {
      this.params.parent.sounds.scribble.play();

      this.gemsColor.alpha = 1;

      this.canMove = false;

      this.params.parent.sounds.playChildFound();

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.setupAxe();
          this.hacker.destroy();
          interaction.writeText('Miner: "Ah thank you mysterious friend, I can finally return home to my family!"', true, () => {
            this.canMove = true;
            super.setWalkable([168,315, 346,264, 441,324, 558,310, 591,387, 148,405]);
          });
        },
        callbackScope: this,
        loop: false,
      });


      
    });
  }

  setupAxe() {
    this.axe = this.physics.add.sprite(518, 334, "scene07Axe");

    const overlap = this.physics.add.overlap(this.axe, this.params.luna.sprite, () => {
      this.params.luna.stop();
      this.canMove = false;
      overlap.destroy();

      this.tweens.add({
        targets: [this.axe],
        x: { value: 790, duration: 1000 },
        y: { value: 530, duration: 1000 },
        yoyo: false,
        loop: 0,
        onComplete: () => {
          this.axe.destroy();
          this.canMove = true;
        }
      });

      this.scene.manager.getScene("MenuScene").addAxe();
    });
  }

  update() {}
}
