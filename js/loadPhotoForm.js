import { MAX_SCALE, MIN_SCALE, STEP_SCALE } from './data.js';
// import { checkValidation } from './validationForm.js';

const loadPhotoSection = document.querySelector('.img-upload');
const loadPhotoForm = loadPhotoSection.querySelector('.img-upload__form');
const uploadControl = loadPhotoSection.querySelector('.img-upload__input');
const editForm = loadPhotoSection.querySelector('.img-upload__overlay');
const editFormCloseButton = editForm.querySelector('.img-upload__cancel');
const imageElement = editForm.querySelector('.img-upload__preview');
const editFormTextHashtags = editForm.querySelector('.text__hashtags');
const editFormTextDescription = editForm.querySelector('.text__description');
const body = document.body;

//переменные для кнопок увеличения/уменьшения изображения
const scaleField = editForm.querySelector('.img-upload__scale');
const scaleValue = scaleField.querySelector('.scale__control--value');
const smallerButton = scaleField.querySelector('.scale__control--smaller');
const biggerButton = scaleField.querySelector('.scale__control--bigger');

const onEscapeKeyDown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    closeEditForm();
  }
};

editFormCloseButton.addEventListener('click', closeEditForm);

uploadControl.addEventListener('change', () => {
  editForm.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleValue.value = '100%';
  imageElement.style = `transform: scale(${1})`;
  loadPhotoForm.addEventListener('keydown', onEscapeKeyDown);
});

function closeEditForm() {
  editForm.classList.add('hidden');
  body.classList.remove('modal-open');
  // document.querySelector('.img-upload__form').reset();
  uploadControl.value = '';
  editFormTextHashtags.value = '';
  editFormTextDescription.value = '';
  // loadPhotoForm.reset();
  loadPhotoForm.removeEventListener('keydown', onEscapeKeyDown);
}

// loadPhotoForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   checkValidation();
// });

//кнопки увеличить уменьшить размер изображения

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value.slice(0, -1), 10);
  const decreasedValue = currentValue + STEP_SCALE > MAX_SCALE ? MAX_SCALE : currentValue + STEP_SCALE;
  scaleValue.value = `${decreasedValue}%`;

  imageElement.style = `transform: scale(${decreasedValue / 100})`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value.slice(0, -1), 10);
  const decreasedValue = currentValue - STEP_SCALE < MIN_SCALE ? MIN_SCALE : currentValue - STEP_SCALE;
  scaleValue.value = `${decreasedValue}%`;

  imageElement.style = `transform: scale(${decreasedValue / 100})`;
};

smallerButton.addEventListener('click', onSmallerButtonClick);

biggerButton.addEventListener('click', onBiggerButtonClick);

// export { loadPhotoForm };
