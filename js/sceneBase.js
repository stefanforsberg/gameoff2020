import interaction from "../js/interaction.js";

export default class SceneBase extends Phaser.Scene {
    constructor(o) {
        super(o);
        this.canMove = true;
    }

    setParams(params) {
        this.params = params;
    }

    setWalkable(points,) {
        this.walkable = interaction.getPolygon(this, points);
        this.walkable.on(
          "pointerdown",
          function (pointer) {
            if (this.input.manager.defaultCursor === "" && this.canMove) {
                this.params.luna.setTarget(pointer.worldX, pointer.worldY);
            }
          },
          this
        );
    }
    
}