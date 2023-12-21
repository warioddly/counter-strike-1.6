import {UserUtils} from "../utils";
import * as nipplejs from 'nipplejs';
import {TouchControl} from "./touch";


export class Platform {


    constructor() {

        // <div class="zone dynamic active"><h1>dynamic</h1></div>

        if (UserUtils.isMobile()) {
            new TouchControl();
        }



    }


}