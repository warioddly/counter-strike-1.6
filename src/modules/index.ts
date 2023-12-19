import { scene } from "./scene";
import { renderer } from "./renderer";
import { camera } from "./camera";
import { clock } from "./clock";

export const game = {
    scene: scene,
    renderer: renderer,
    camera: camera,
    clock: clock,
    configs: {
        player: {
            speed: 0.1,
            jumpSpeed: 0.2,
        },
    }
}
