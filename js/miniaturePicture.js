const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragmetn = document.querySelector('.pictures');

const picturesTitle = document.querySelector('.pictures__title');
picturesTitle.classList.remove('visually-hidden');

function createMiniPicture(currentPhoto) {
  const clonePicture = pictureTemplate.cloneNode(true);

  const imgClonePicture = clonePicture.querySelector('.picture__img');
  imgClonePicture.src = currentPhoto.url;
  imgClonePicture.alt = currentPhoto.description;

  clonePicture.querySelector('.picture__likes').textContent = currentPhoto.likes;
  clonePicture.querySelector('.picture__comments').textContent = currentPhoto.comments.length;

  clonePicture.dataset.idPicture = currentPhoto.id;
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

export { startCreateMiniPicture };
