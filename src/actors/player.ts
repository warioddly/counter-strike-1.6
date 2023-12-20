
import * as THREE from 'three';
import {game} from "../modules";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Character} from "./character";
import {CharacterUtils} from "../utils";
import {Capsule} from "three/examples/jsm/math/Capsule";
import {PLAYER_SPEED, STEPS_PER_FRAME, PLAYER_MOUSE_SENSITIVITY} from "../constants";


export class Player extends Character {

    constructor() {

        super();


        this.collider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1, 0 ), 0.35 );

        document.addEventListener( 'keydown', ( event ) => {
            this.keyStates[ event.code ] = true;
        } );
        document.addEventListener( 'keyup', ( event ) => {
            this.keyStates[ event.code ] = false;
        } );
        document.addEventListener( 'mousedown', () => document.body.requestPointerLock());
        document.body.addEventListener( 'mousemove', ( event ) => {
            if ( document.pointerLockElement === document.body ) {
                game.camera.rotation.y -= event.movementX / PLAYER_MOUSE_SENSITIVITY;
                game.camera.rotation.x -= event.movementY / PLAYER_MOUSE_SENSITIVITY;
            }
        } );

        new GLTFLoader().load('/assets/objects/sas__cs2_agent_model_red/scene.gltf', ( gltf ) => {

            this.model = gltf.scene;
            this.model.scale.set(0.6, 0.6, 0.6);

            game.scene.add( this.model );

            this.initialized = true;

        });


    }


    controls( dt: number ) {

        const speedDelta = dt * PLAYER_SPEED;

        if ( this.keyStates[ 'KeyW' ] ) {

            this.velocity.add( CharacterUtils.getForwardVector(
                    game.camera,
                    this.direction,
                    speedDelta
                )
            )
        }

        if ( this.keyStates[ 'KeyS' ] ) {

            this.velocity.add( CharacterUtils.getForwardVector(
                    game.camera,
                    this.direction,
                    -speedDelta
                )
            )

        }

        if ( this.keyStates[ 'KeyA' ] ) {

            this.velocity.add( CharacterUtils.getSideVector(
                    game.camera,
                    this.direction,
                    -speedDelta
                )
            );

        }

        if ( this.keyStates[ 'KeyD' ] ) {

            this.velocity.add( CharacterUtils.getSideVector(
                    game.camera,
                    this.direction,
                    speedDelta
                )
            );

        }

    }


    updatePosition( dt: number ) {

        const damping = Math.exp( - 4 * dt ) - 1;

        this.velocity.addScaledVector( this.velocity, damping );

        const deltaPosition = this.velocity.clone().multiplyScalar( dt );
        this.collider.translate( deltaPosition );

        game.camera.position.copy( this.collider.end );

    }


    update(dt: number) {

        if (!this.initialized) return;

        const deltaTime = (Math.min( 0.05, game.clock.getDelta() ) / STEPS_PER_FRAME);

        for ( let i = 0; i < STEPS_PER_FRAME; i ++ ) {

            this.controls( deltaTime );
            this.updatePosition( deltaTime );

        }

    }


}

