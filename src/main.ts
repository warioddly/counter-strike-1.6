
import {game} from "./modules";
import {Player} from "./actors/player";
import {World} from "./world";

class Engine {

    private player: Player;
    private world: World;


    constructor() {

        this.world = new World();
        this.player = new Player();

        game.renderer.setAnimationLoop( this._animate.bind(this) );

    }


    private _animate( time: number ) {

        this.player.update(time);

        game.renderer.render( game.scene, game.camera );

    }

}



new Engine();
