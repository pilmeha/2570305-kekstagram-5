import { isEscapeKey } from './util.js';

const bigPictureForm = document.querySelector('.big-picture');

function startCreateBigPicture(photosData) {
  const bigPictureOpenForm = document.querySelector('.pictures');
  bigPictureOpenForm.addEventListener('click', (evt) => {
    const idPicture = findIdPhoto(evt);
    evt.preventDefault();
    const photo = findPhoto(photosData, idPicture);
    openBigPicture(photo);
  });
}

function findIdPhoto(evt) {
  const pictureElement = evt.target.closest('[data-id-picture]');
  if (!pictureElement) {
    return;
  }
  return pictureElement.dataset.idPicture;
}

function findPhoto(photosData, idPicture) {
  return photosData.find((item) => item.id === Number(idPicture));
}

function addCommentForBigPicture(commentsArray, bigPictuteComment) {
  bigPictuteComment.innerHTML = '';
  commentsArray.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>`;
    bigPictuteComment.appendChild(commentElement);
  });
}

function openBigPicture(photo) {
  const bigPictureImg = bigPictureForm.querySelector('.big-picture__img img');
  const bigPictureLikesCount = bigPictureForm.querySelector('.likes-count');
  const bigPictureCommentCount = bigPictureForm.querySelector('.comments-count');
  const bigPictuteComment = bigPictureForm.querySelector('.social__comments');
  const bigPictureDesc = bigPictureForm.querySelector('.social__caption');
  const commentCount = bigPictureForm.querySelector('.social__comment-count');
  const loadNewComment = bigPictureForm.querySelector('.comments-loader');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.alt;
  bigPictureLikesCount.textContent = photo.likes;
  bigPictureCommentCount.textContent = photo.comments.length;
  addCommentForBigPicture(photo.comments, bigPictuteComment);
  bigPictureDesc.textContent = photo.description;

  bigPictureForm.classList.remove('hidden');
  commentCount.classList.add('hidden');
  loadNewComment.classList.add('hidden');
  document.body.classList.add('modal-open');

  const bigPictureCloseForm = bigPictureForm.querySelector('.big-picture__cancel');
  bigPictureCloseForm.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      closeBigPicture();
    }
  });
}

function closeBigPicture() {
  bigPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

export { startCreateBigPicture };
