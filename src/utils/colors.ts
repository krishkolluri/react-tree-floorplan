import {cssColors} from "../constants/colors";
const nearestColor = require('nearest-color');

const colorMatcher = nearestColor.from(cssColors);

export const hexColorToGeneralName  = (hexColor: string) => {
    const nearest = colorMatcher(hexColor);

    return nearest.name;
}

export const getRandomHexColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');
    const hexColor = `#${redHex}${greenHex}${blueHex}`;

    return hexColor;
}