
export default class Luna {
  constructor(scene) {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(201, 365, "lunasheet", 0).setSize(202, 300).setOffset(0, 0);

    console.log(this.sprite.displayHeight )

    this.sprite.scale = 0.5;

    
    this.container = this.scene.add.container(0, 0)

    this.sprite.setOrigin(0.5,1)

    console.log(this.sprite.displayHeight )

    this.targetPos = { x: 200, y: 200 };

    console.log(scene.anims);

    this.container.add([this.sprite])

    this.container.alpha = 0;

    scene.anims.create({
      key: "luna-walk",
      frames: scene.anims.generateFrameNumbers("lunasheet", { start: 0, end: 2 }),
      frameRate: 4,
      repeat: -1,
    });

    
    // this.spritestandup.anims.play("luna-stand-up");

    // this.sprite.setTexture("lunasheet", 4);
  }

  setPos(x, y) {
    this.targetPos.x = x;
    this.targetPos.y = y;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  setTarget(tx, ty) {

    if(this.container.alpha < 1) {
      return;
    }

    this.targetPos.x = tx;
    this.targetPos.y = ty;

    console.log(tx, ty)

    this.sprite.anims.play("luna-walk");
    this.scene.physics.moveTo(this.sprite, tx, ty, 200);
  }

  update() {

    if(this.sprite.y < 300) {
      this.sprite.scale = 0.5 - 0.5*((300-this.sprite.y)/300);
    } else {
      this.sprite.scale = 0.5;
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
