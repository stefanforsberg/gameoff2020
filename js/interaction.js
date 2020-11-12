import Phaser from "phaser";
import game from "../js/index.js"

const polygon = function(scene, points, icon, click) {
    var polygon = new Phaser.Geom.Polygon(points);

    const graphics = scene.add.graphics(0, 0);

    if(game.config.physics.arcade.debug) {
        graphics.lineStyle(5, 0xFF00FF, 1.0);
        graphics.fillStyle(0xFFFFFF, 0.6);
        graphics.fillPoints(polygon.points, true);
    }
    
    graphics.setInteractive(polygon, Phaser.Geom.Polygon.Contains)
    graphics.input.cursor = "url(" + icon + ") 32 32, pointer";
    
    graphics.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (p) => click(p,graphics));
}

const click = function(scene, gameObject, cursor, remove, cb) {
    gameObject.on("pointerdown", () => {
        if(scene.input.manager.defaultCursor.indexOf(cursor) > -1) {

            if(remove) {
                gameObject.removeInteractive();
            }

            cb();
        }

        scene.input.setDefaultCursor("");
    });
}



const exitUp = function(scene, luna, x, y, cb) {
    exit(scene, luna, x, y, "navigateUp", cb);
}

const exitRight = function(scene, luna, x, y, cb) {
    exit(scene, luna, x, y, "navigateRight", cb);
}

const exitLeft = function(scene, luna, x, y, cb) {
    exit(scene, luna, x, y, "navigateLeft", cb);
}

const exit = function(scene, luna, x, y, imgName, cb) {
    const img = scene.physics.add.image(x, y, imgName).setSize(130, 130);

    img.alpha = 0.5

    scene.physics.add.overlap(img, luna.sprite, cb);

    img.setInteractive();
    img.on("pointerover", () => { img.alpha = 1; })
    img.on("pointerout", () => { img.alpha = 0.5; })
}

export default {polygon, exitRight, exitLeft, exitUp, click} 