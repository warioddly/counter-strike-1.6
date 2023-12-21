
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// @ts-ignore
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
import { game } from "../modules";
import {pathResolver} from "../utils/path_resolver";

export class World {

    private initialized: boolean = false;
    private octreeHelper: OctreeHelper;

    constructor() {

        game.scene.add( new THREE.AmbientLight( 0xFFFFFF ) );

        new GLTFLoader().load(pathResolver('assets/objects/de_dust2_-_cs_map/scene.gltf'), ( gltf ) => {

            const scene = gltf.scene;
            const boundingBox = new THREE.Box3().setFromObject(scene);
            scene.position.sub(boundingBox.getCenter(new THREE.Vector3()));


            scene.traverse( child => {

                if ( child.isMesh ) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                    if ( child.material.map ) {

                        child.material.map.anisotropy = 4;

                    }

                }

            } );

            this.octreeHelper = new OctreeHelper( game.octree )
            this.octreeHelper.visible = false;

            game.octree.fromGraphNode( scene );
            game.scene.add( scene, this.octreeHelper );

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
