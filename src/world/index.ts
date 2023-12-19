
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { game } from "../modules";

export class World {

    private initialized: boolean = false;

    constructor() {

        game.scene.add( new THREE.AmbientLight( 0xFFFFFF ) );

        new GLTFLoader().load('/assets/objects/de_dust2_-_cs_map/scene.gltf', ( gltf ) => {

            const scene = gltf.scene;
            const boundingBox = new THREE.Box3().setFromObject(scene);
            scene.position.sub(boundingBox.getCenter(new THREE.Vector3()));
            game.scene.add( gltf.scene );

            this.initialized = true;

        });

        document.body.appendChild( game.renderer.domElement );
        window.addEventListener( 'resize', this._resize.bind(this) );


    }



    private _resize() {
        game.camera.aspect = window.innerWidth / window.innerHeight;
        game.camera.updateProjectionMatrix();
        game.renderer.setSize( window.innerWidth, window.innerHeight );
    }


}
