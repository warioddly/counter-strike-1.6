import {HOST} from "../constants";

export const pathResolver = (path: string) => {
    if (!path.startsWith('/')) path = '/' + path;
    if (HOST.endsWith('/')) return `${HOST.slice(0, -1)}${path}`;
    return `${HOST}${path}`;
}
