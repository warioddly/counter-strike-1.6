
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


class Engine {

    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _controls: OrbitControls;

    constructor() {

        this._scene = new THREE.Scene();
        this._scene.add( new THREE.AmbientLight( 0xFFFFFF ) );

        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 10000 );
        this._camera.position.z = 0.001;
        this._camera.rotation.order = 'YXZ';

        this._renderer = new THREE.WebGLRenderer( { antialias: true } );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.VSMShadowMap;
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;

        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.05;
        this._controls.minDistance = 0.550;
        this._controls.maxDistance = 22;


        /// Add your code here

        const box = new THREE.Mesh(
            new THREE.BoxGeometry( 0.2, 0.2, 0.2 ),
            new THREE.MeshNormalMaterial()
        );
        this._scene.add( box );


        new GLTFLoader().load('/assets/objects/de_dust2_-_cs_map/scene.gltf', ( gltf ) => {

            const scene = gltf.scene;
            const boundingBox = new THREE.Box3().setFromObject(scene);
            scene.position.sub(boundingBox.getCenter(new THREE.Vector3()));
            this._scene.add( gltf.scene );

        });

        document.body.appendChild( this._renderer.domElement );
        this._renderer.setAnimationLoop( this._animate.bind(this) );
        window.addEventListener( 'resize', this._resize.bind(this) );

        const keyStates = {};

        document.addEventListener( 'keydown', ( event ) => {

            keyStates[ event.code ] = true;

        } );

        document.addEventListener( 'keyup', ( event ) => {

            keyStates[ event.code ] = false;

        } );


        document.body.addEventListener( 'mousemove', ( event ) => {

            if ( document.pointerLockElement === document.body ) {

                this._camera.rotation.y -= event.movementX / 500;
                this._camera.rotation.x -= event.movementY / 500;

            }
        } );

    }


    private _animate( time: number ) {
        this._controls.update();
        this._renderer.render( this._scene, this._camera );
    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }


}



new Engine();
