
import * as THREE from 'three';

export class UserUtils {

    static isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

        console.log(navigator.userAgent);
        return regex.test(navigator.userAgent);
    }

}


