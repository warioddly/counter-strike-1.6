

// @ts-ignore
import Stats from 'three/addons/libs/stats.module.js';
import * as nipplejs from "nipplejs";

export class TouchControl {


    constructor() {

        const controlDiv = this.createControlDiv();

        document.body.appendChild(controlDiv);

        nipplejs.create({
            zone: controlDiv,
            mode: 'dynamic',
            position: { left: '50%', top: '50%' },
            color: 'red'
        });

    }


    createControlDiv() : HTMLDivElement {
        const div = document.createElement('div');
        div.id = 'dynamic';
        div.classList.add('zone');
        div.classList.add('dynamic');
        div.classList.add('active');
        return div;
    }

}
