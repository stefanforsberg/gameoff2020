import CursorWalk from "../img/cursorWalk.png";
import interaction from "../js/interaction.js";

export default class SceneBase extends Phaser.Scene {
    constructor(o) {
        super(o);
        this.canMove = true;
        
    }

    setParams(params) {
        this.params = params;
        this.input.topOnly = false;
    }

    setWalkable(points) {
        this.walkable = interaction.getPolygon(this, points);
        this.walkable.name = "walkable"

        this.walkable.input.cursor = "url(" + CursorWalk.replace("/","") + ") 32 32, pointer";

        this.walkable.on(
          "pointerdown",
          function (pointer) {

            console.log("aksdnakjsnkasjdn")
              
            if (this.canMove) {
                this.params.luna.setTarget(pointer.worldX, pointer.worldY);
            }
          },
          this
        );

        this.walkable.on(
            
            "pointerup",
            function (pointer, o) {

                console.log(o);

                pointer.worldX, pointer.worldY;
                console.log("scene" +  this.input.manager.defaultCursor);
                // this.walkable.input.cursor = "url(" + CursorWalk.replace("/","") + ") 32 32, pointer";
            },
            this
          );

          this.input.on(
            "pointerup",
            function (pointer, o) {
              if(o && o.length > 0 && o[0].name === "walkable") {
                console.log("do nothing")
              } else {
                this.input.setDefaultCursor("");
              }
            //   console.log(o[0] + ", " + o[0].name);
                
            },
            this
          );
    }
    
}