import Phaser from "phaser";
import game from "../js/index.js"

const textContainerElement = document.getElementById("text-container");
const textElement = document.getElementById("text");

const polygon = function(scene, points, icon, click) {
    var polygon = new Phaser.Geom.Polygon(points);

    const graphics = scene.add.graphics(0, 0);

    if(game.config.physics.arcade.debug) {
        graphics.lineStyle(5, 0xFF00FF, 1.0);
        graphics.fillStyle(0xff00FF, 0.6);
        graphics.fillPoints(polygon.points, true);
    }
    
    graphics.setInteractive(polygon, Phaser.Geom.Polygon.Contains)
    graphics.input.cursor = "url(" + icon + ") 32 32, pointer";
    
    graphics.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (p) => click(p,graphics));
}

const getPolygon = function(scene, points) {
    var polygon = new Phaser.Geom.Polygon(points);

    const graphics = scene.add.graphics(0, 0);

    if(game.config.physics.arcade.debug) {
        graphics.lineStyle(5, 0xFF00FF, 1.0);
        graphics.fillStyle(0xff00FF, 0.6);
        graphics.fillPoints(polygon.points, true);
    }
    
    graphics.setInteractive(polygon, Phaser.Geom.Polygon.Contains);

    return graphics;
}

const click = function(scene, gameObject, cursor, remove, cb) {
    gameObject.on("pointerdown", () => {

        console.log("Clicking on o. " + scene.input.manager.defaultCursor)

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
    const i = exit(scene, luna, x, y, "navigateUp", cb);
    i.body.setOffset(-20,-80);
}

const exitRight = function(scene, luna, x, y, cb) {
    exit(scene, luna, x, y, "navigateRight", cb);
}

const exitLeft = function(scene, luna, x, y, cb) {
    exit(scene, luna, x, y, "navigateLeft", cb);
}

const exit = function(scene, luna, x, y, imgName, cb) {
    const img = scene.physics.add.image(x, y, imgName).setSize(80, 80);

    img.alpha = 0.2

    scene.physics.add.overlap(img, luna.sprite, cb);

    img.setInteractive();
    img.on("pointerover", () => { img.alpha = 1; })
    img.on("pointerout", () => { img.alpha = 0.2; })

    return img;
}

const writeText = function(text, hide, cb) {
    
    if(textElement.style.display === 'flex') {
        return;
    }

    const textSpeed = 30;
    let i = 0;

    textElement.style.display = 'flex';
    textContainerElement.innerHTML = ""

    function updateContainer() {
        if (i < text.length) {
            textContainerElement.innerHTML += text.charAt(i).toString().replace("}", "<br />");
            i++;
            setTimeout(updateContainer, textSpeed);
          } else {

            setTimeout(() => {
                if(hide) {
                    textElement.style.display = 'none';
                }
    
                if(cb) {
                    cb();
                }
            }, 2000);
            
            
          }
    }

    updateContainer();
}

export default {polygon, getPolygon, exitRight, exitLeft, exitUp, click, writeText} 