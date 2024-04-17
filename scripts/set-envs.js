
require('dotenv').config();

const targetPath = './src/enviroments/environment.ts';

const envFileContent = `
export const enviroment = {
    mapbox_key: "${ process.env['MAPBOX_KEY'] }",
    otra: "PROPIEDAD",
};
`


mkdirSync('./src/environments', { recursive: true })