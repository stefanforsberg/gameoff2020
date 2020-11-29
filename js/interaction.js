import Phaser from "phaser";
import game from "../js/index.js"
import CursorTalk from "../img/cursorTalk.png";

const textContainerElement = document.getElementById("text-container");
const textElement = document.getElementById("text");

const setTalkCursor = function(gameObject) {
    gameObject.input.cursor = "url(" + CursorTalk.replace("/", "") + ") 20 17, pointer";
}

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

const click = function(scene, gameObject, cursor, remove, cb, talkIcon) {

    if(talkIcon) {
        setTalkCursor(gameObject)
    }

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



const exitUp = function(scene, luna, x, y, cb, yOffset) {
    
    if(!yOffset) {
        yOffset = -80
    }

    const i = exit(scene, luna, x, y, "navigateUp", cb);
    i.body.setOffset(-20, yOffset);
}

const exitDown = function(scene, luna, x, y, cb) {
    exit(scene, luna, x, y, "navigateDown", cb);
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

const writeText = function(text, hide, cb, alwaysRun) {
    
    if(textElement.style.display === 'flex' && !alwaysRun) {
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
            }, 3000);
            
            
          }
    }

    updateContainer();
}

export default {polygon, getPolygon, exitRight, exitLeft, exitUp, exitDown, click, writeText, setTalkCursor} 