import SceneBase from "../js/sceneBase"
import ImgScene09 from "../img/s09.png";
import ImgRainbow from "../img/rainbow.png";
import interaction from "../js/interaction.js";


export default class Scene09 extends SceneBase {
  constructor() {
    super({
      key: "Scene09",
    });
  }

  preload() {
    this.load.image("scene09", ImgScene09);
    
    this.load.spritesheet("rainbow", "./" + ImgRainbow, {
      frameWidth: 125,
      frameHeight: 125,
      margin: 0,
      spacing: 0,
    });
  }

  create(params) {
    this.setParams(params);

    this.add.image(512, 300, "scene09");

    this.lighthouse = this.add.rectangle(388,241, 100, 220, 0x0d0909, 0); 

    this.lighthouse.setInteractive();
    interaction.setTalkCursor(this.lighthouse);
    this.lighthouse.on("pointerdown", () => {
      
      this.canMove = false;

      if(this.scene.manager.getScene("MenuScene").readyForEndgame()) {
        this.lighthouse.destroy();
        this.walkable.destroy();
        this.endScene();
      } else {
        interaction.writeText('Mysterious voice: "If you can find some wood, a bird feather and a mining axe we can use this lighthouse to restore your home."', true, () => {
          this.canMove = true;
        })
      }
    })
    
    interaction.exitLeft(this, params.luna, 103, 336, params.exitLeft);

    super.setWalkable([68,278, 321,280, 325,352, 68,419])

    this.scene.pause();
  }

  endScene() {

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        this.rainbow = this.add.particles("rainbow").createEmitter({
          frame: [0],
          scale: { start: 0.1, end: 0.4 },
          alpha: { start: 0.4, end: 0.2 },
          x: 390,
          y: 145,
          gravityX: 0,
          gravityY: -30,
          speedX: { max: 300, min: 200 },
          quantity: 2,
          blendMode: "Add",
          lifespan: 3000,
        });
      },
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 6000,
      callback: () => {
        this.rainbow.setFrame([0,1])
      },
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 8000,
      callback: () => {
        this.rainbow.setFrame([0,1,2])
      },
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 10000,
      callback: () => {
        this.rainbow.setFrame([0,1,2,3,4,5])
        this.rainbow.setScale({ start: 0.1, end: 0.7 },)
      },
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 13000,
      callback: () => {
        this.params.parent.scene.launch("SceneOutro");
        this.params.parent.scene.bringToTop("SceneOutro")
      },
      callbackScope: this,
      loop: false,
    });
  }

  update() {}
}
