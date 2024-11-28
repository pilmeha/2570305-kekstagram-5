import { createArrayPhotos } from './data.js';
import { startCreateMiniPicture } from './miniaturePicture.js';
import { startCreateBigPicture } from './bigPicture.js';

const photosData = createArrayPhotos();

startCreateMiniPicture(photosData);
startCreateBigPicture(photosData);
