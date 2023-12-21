
import * as THREE from 'three';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';

export abstract class Character {

    protected model: THREE.Object3D;
    protected collider: Capsule;
    protected velocity: THREE.Vector3 = new THREE.Vector3();
    protected direction: THREE.Vector3 = new THREE.Vector3();
    protected keyStates: { [key: string]: boolean } = {};
    private skeleton: THREE.Skeleton;
    protected playerOnFloor: boolean = false;

    protected initialized: boolean = false;

    // abstract attack();
    // abstract move();
    abstract update(dt: number);
    abstract controls(dt: number);
    abstract updatePosition(dt: number);
    abstract updateCollision(dt: number);
    // abstract respawn();
    // abstract takeDamage();

}

