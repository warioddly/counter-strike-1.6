
import * as THREE from 'three';

export class CharacterUtils {

    static getSideVector( camera: THREE.PerspectiveCamera, direction: THREE.Vector3, dt: number ) {
        camera.getWorldDirection( direction );
        direction.y = 0;
        direction.normalize();
        direction.cross( camera.up );
        return direction.multiplyScalar( dt );
    }


    static getForwardVector(camera: THREE.PerspectiveCamera, direction: THREE.Vector3, dt: number ) {
        camera.getWorldDirection( direction );
        direction.y = 0;
        direction.normalize();
        return direction.multiplyScalar( dt );
    }

}


