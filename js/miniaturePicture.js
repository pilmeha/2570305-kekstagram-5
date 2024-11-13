import { createArrayPhotos } from './data.js';

const photosData = createArrayPhotos();

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragmetn = document.querySelector('.pictures');

function createMiniPicture(currentPhoto) {
  const clonePicture = pictureTemplate.cloneNode(true);
  const imgClonePicture = clonePicture.querySelector('.picture__img');

  imgClonePicture.src = currentPhoto.url;
  imgClonePicture.alt = currentPhoto.description;

  const pictureInfo = clonePicture.querySelector('.picture__info');
  pictureInfo.querySelector('.picture__likes').textContent = currentPhoto.likes;
  pictureInfo.querySelector('.picture__comments').textContent = currentPhoto.comments.length;

  return clonePicture;
}

function startCreateMiniPicture(photosArray) {
  const pictureListFragment = document.createDocumentFragment();

  for (let i = 0; i < photosArray.length; i++) {
    const clonePicture = createMiniPicture(photosArray[i]);
    pictureListFragment.appendChild(clonePicture);
  }

  picturesFragmetn.appendChild(pictureListFragment);
}

startCreateMiniPicture(photosData);

