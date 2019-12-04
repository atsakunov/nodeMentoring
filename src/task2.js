import fs from 'fs';
import csv from 'csvtojson'
import {
    pipeline
} from 'stream';

import {
    INPUT_PATH,
    OUTPUT_PATH
} from './constants';

const errorHandling = (err) => {
    if (err) {
        console.error('Operation failed', err);
    } else {
        console.log('Succesfull');
    }
};

pipeline(
    fs.createReadStream(INPUT_PATH),
    csv(),
    fs.createWriteStream(OUTPUT_PATH),
    errorHandling
);