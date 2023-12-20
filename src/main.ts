
import {game} from "./modules";
import {Player} from "./actors/player";
import {World} from "./world";

const maxFPS = 60;
const frameDelay = 1000 / maxFPS;

let lastFrameTime = 0;

class Engine {

    private player: Player;
    private world: World;


    constructor() {

        this.world = new World();
        this.player = new Player();

        game.renderer.setAnimationLoop( this._animate.bind(this) );

    }


    private _animate( dt: number ) {

        const elapsed = dt - lastFrameTime;

        if (elapsed > frameDelay) {

            this.player.update(dt);

            game.update(dt);

            lastFrameTime = dt - (elapsed % frameDelay);
        }

    }

}



new Engine();
