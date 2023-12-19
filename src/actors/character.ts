
import * as THREE from 'three';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';

export abstract class Character {

    protected mesh: THREE.Object3D;
    protected keyStates: { [key: string]: boolean } = {};
    protected velocity: THREE.Vector3 = new THREE.Vector3();
    protected collider: Capsule;
    protected direction: THREE.Vector3 = new THREE.Vector3();

    protected initialized: boolean = false;

    // abstract attack();
    // abstract move();
    abstract update(dt: number);
    abstract controls(dt: number);
    abstract updatePosition(dt: number);
    // abstract respawn();
    // abstract takeDamage();

}

