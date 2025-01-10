const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;

const inputForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const inputHashtag = document.querySelector('.text__hashtags');

const pristine = new Pristine(inputForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

let errorMessage = '';

const error = () => errorMessage;

const hashtagsHandler = (text) => {
  errorMessage = '';

  text = text.toLowerCase().trim();
  if (!text) {
    return true;
  }

  const inputArray = text.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#') >= 1),
      error: 'Хэш-теги должны быть разделены пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должнен начинаться с символа #',
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэш-тег не должнен состоять из одного символа #',
    },
    {
      check: inputArray.some((item) => inputArray.indexOf(item) !== inputArray.lastIndexOf(item)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Хэш-тегов должно быть не больше ${MAX_HASHTAGS}`,
    },
    {
      check: inputArray.some((item) => item.length > MAX_HASHTAG_LENGTH),
      error: `Длина хэш-тега не должна превышать ${MAX_HASHTAG_LENGTH} символов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(inputHashtag, hashtagsHandler, error, 2, false);

const onHashtagInput = () => {
  submitButton.disabled = !pristine.validate();
};

inputHashtag.addEventListener('input', onHashtagInput);
inputForm.addEventListener('submit', onHashtagInput);

export {inputHashtag};

// import { loadPhotoForm } from './loadPhotoForm.js';

// function checkValidation() {

//   const pristine = new Pristine(loadPhotoForm, {
//     classTo: 'img-upload__field-wrapper',
//     errorClass: 'img-upload__field-wrapper--error',
//     successClass: 'img-upload__field-wrapper--success',
//     errorTextParent: 'img-upload__field-wrapper',
//     errorTextTag: 'div',
//     errorTextClass: 'text__error'
//   }, false);

//   function validateHashtags(value) {
//     if (value === '') {
//       return true;
//     }

//     const hashtags = value.trim().split(/\s+/);
//     const regex = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

//     if (hashtags.length > 5) {
//       return false;
//     }

//     for (const hashtag of hashtags) {
//       if (!regex.test(hashtag)) {
//         return false;
//       }
//       if (hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)) {
//         return false;
//       }
//     }

//     const lowerCasedTags = hashtags.map((tag) => tag.toLowerCase());
//     if (new Set(lowerCasedTags).size !== lowerCasedTags.length) {
//       return false;
//     }

//     return hashtags.every((tag) => regex.test(tag));
//   }

//   const hashtagsField = loadPhotoForm.querySelector('.text__hashtags');
//   pristine.addValidator(hashtagsField, validateHashtags);

//   const isValid = pristine.validate();

//   function showSuccessMessage() {
//     const successTemplate = document.querySelector('#success').content.cloneNode(true);
//     document.body.appendChild(successTemplate);

//     const successButton = document.querySelector('.success__button');
//     successButton.addEventListener('click', () => {
//       const fileInput = document.querySelector('.img-upload__input');
//       const overlay = document.querySelector('.img-upload__overlay');
//       const body = document.body;

//       document.querySelector('.success').remove();
//       overlay.classList.add('hidden');
//       body.classList.remove('modal-open');
//       document.querySelector('.img-upload__form').reset();
//       fileInput.value = '';
//     });
//   }

//   function showErrorMessage() {
//     const errorTemplate = document.querySelector('#error').content.cloneNode(true);
//     document.body.appendChild(errorTemplate);

//     const errorButton = document.querySelector('.error__button');
//     errorButton.addEventListener('click', () => {
//       document.querySelector('.error').remove();
//     });
//   }

//   if (isValid) {
//     showSuccessMessage('success');
//     loadPhotoForm.reset();
//     pristine.reset();
//   } else {
//     showErrorMessage('error');
//   }
// }

// export{ checkValidation };
