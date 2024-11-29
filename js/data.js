import { createIdGenerator, getRandomInteger, getRandomArrayElement } from './util.js';

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MAX_ID_FOR_PHOTOS = 25;

function createArrayComments(count) {
  const commentsArray = [];
  const generateCommentId = createIdGenerator();
  while (commentsArray.length < count) {
    const comment = {
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: `${getRandomArrayElement(COMMENT_MESSAGES)}`,
      name: `${getRandomArrayElement(NAMES)}`
    };

    if (getRandomInteger(1, 2) === 2) {
      let secondMessage = `${getRandomArrayElement(COMMENT_MESSAGES)}`;
      while (comment.message === secondMessage) {
        secondMessage = `${getRandomArrayElement(COMMENT_MESSAGES)}`;
      }
      comment.message += ` ${secondMessage}`;
    }

    commentsArray.push(comment);
  }

  return commentsArray;
}

function createArrayPhotos() {
  const generatePhotoId = createIdGenerator();
  const photoIdForUrl = createIdGenerator();
  const photosArray = [];
  while (photosArray.length < MAX_ID_FOR_PHOTOS) {
    const photo = {
      id: generatePhotoId(),
      url: `photos/${photoIdForUrl()}.jpg`,
      description: 'Еще не придумал что здесь написать',
      likes: getRandomInteger(15, 200),
      comments: createArrayComments(getRandomInteger(0, 30))
    };
    photosArray.push(photo);
  }
  return photosArray;
}

export { createArrayPhotos };
