
export default class Luna {
  constructor(scene) {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(201, 365, "lunasheet", 0).setSize(202, 300).setOffset(0, 0);

    this.baseMaxScale = 0.5;
    this.sprite.scale = this.baseMaxScale;
    this.container = this.scene.add.container(0, 0)

    this.sprite.setOrigin(0.5,1)

    this.targetPos = { x: 200, y: 200 };

    this.container.add([this.sprite])

    this.container.alpha = 0;

    scene.anims.create({
      key: "luna-walk",
      frames: scene.anims.generateFrameNumbers("lunasheet", { start: 0, end: 2 }),
      frameRate: 4,
      repeat: -1,
    });
  }

  setPos(x, y) {
    this.targetPos.x = x;
    this.targetPos.y = y;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  stop() {
    this.setPos(this.sprite.x, this.sprite.y)
  }

  setTarget(tx, ty) {

    if(this.container.alpha < 1) {
      return;
    }

    this.targetPos.x = tx;
    this.targetPos.y = ty;

    this.sprite.anims.play("luna-walk");
    this.scene.physics.moveTo(this.sprite, tx, ty, 200);
  }

  update() {

    if(this.sprite.y < 300) {
      this.sprite.scale = this.baseMaxScale - 0.5*((300-this.sprite.y)/300);
    } else {
      this.sprite.scale = this.baseMaxScale;
    }

    if (this.sprite.body.velocity.y === 0 && this.sprite.body.velocity.x === 0) {
      this.sprite.setTexture("lunasheet", 0);
    } else {
      if (this.sprite.body.velocity.x < 0) {
        this.sprite.setFlipX(true);
      } else {
        this.sprite.setFlipX(false);
      }

      if(Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.targetPos.x, this.targetPos.y) < 5) {
        this.sprite.body.reset(this.targetPos.x, this.targetPos.y);
      }
    }
  }
}
