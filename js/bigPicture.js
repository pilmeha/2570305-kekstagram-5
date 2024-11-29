import { isEscapeKey } from './util.js';

const bigPictureForm = document.querySelector('.big-picture');
const bigPictuteComments = bigPictureForm.querySelector('.social__comments');
const loadCommentButton = bigPictureForm.querySelector('.comments-loader');
const COMMENTS_TO_SHOW = 5;

function startCreateBigPicture(photosData) {
  const bigPictureOpenForm = document.querySelector('.pictures');
  bigPictureOpenForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    const idPicture = findIdPhoto(evt);
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

function addCommentsForBigPicture(commentsArray) {
  bigPictuteComments.innerHTML = '';
  commentsArray.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>`;
    bigPictuteComments.appendChild(commentElement);
  });

  const commentsItems = bigPictuteComments.children;
  bigPictureForm.querySelector('.loaded-comments').textContent = commentsItems.length > COMMENTS_TO_SHOW ? COMMENTS_TO_SHOW : commentsItems.length;
  for (let i = COMMENTS_TO_SHOW; i < commentsItems.length; i++) {
    commentsItems[i].classList.add('hidden');
  }

  if (commentsItems.length > 5) {
    loadCommentButton.classList.remove('hidden');
    loadCommentButton.addEventListener('click', loadedComment);
  } else {
    loadCommentButton.classList.add('hidden');
  }
}

function loadedComment() {
  const commentsItems = bigPictuteComments.children;
  const loadedCommentsCountElement = bigPictureForm.querySelector('.loaded-comments');
  const loadedCommentsCount = parseInt(loadedCommentsCountElement.textContent, 10);
  const currenntComments = loadedCommentsCount + COMMENTS_TO_SHOW > commentsItems.length ? commentsItems.length - loadedCommentsCount : COMMENTS_TO_SHOW;
  for (let i = 0; i < currenntComments; i++) {
    document.querySelector('.social__comment.hidden').classList.remove('hidden');
  }
  loadedCommentsCountElement.textContent = loadedCommentsCount + currenntComments;
  if (loadedCommentsCount + currenntComments === commentsItems.length) {
    loadCommentButton.classList.add('hidden');
  }
}

function openBigPicture(photo) {
  const bigPictureImg = bigPictureForm.querySelector('.big-picture__img img');
  const bigPictureLikesCount = bigPictureForm.querySelector('.likes-count');
  const bigPictureCommentCount = bigPictureForm.querySelector('.comments-count');
  const bigPictureDesc = bigPictureForm.querySelector('.social__caption');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.alt;
  bigPictureLikesCount.textContent = photo.likes;
  bigPictureCommentCount.textContent = photo.comments.length;
  addCommentsForBigPicture(photo.comments);
  bigPictureDesc.textContent = photo.description;

  bigPictureForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const bigPictureCloseForm = bigPictureForm.querySelector('.big-picture__cancel');
  bigPictureCloseForm.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', onDocumentEscKeyDown);
}

function onDocumentEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

export { startCreateBigPicture };
