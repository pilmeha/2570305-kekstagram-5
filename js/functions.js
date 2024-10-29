const CheckStringLength = (str, length) => str.length <= length;

CheckStringLength('проверяемая строка', 20); // true
CheckStringLength('проверяемая строка', 18); // true
CheckStringLength('проверяемая строка', 10); // false


function ChekcStrToPolindrom(str) {
  const str2 = str.replaceAll(' ', '').toLowerCase();
  let reverseStr = '';
  for (let i = str2.length - 1; i >= 0; i--) {
    reverseStr += str2[i];
  }
  return str2 === reverseStr;
}

ChekcStrToPolindrom('топот'); // true
ChekcStrToPolindrom('ДовОд'); // true
ChekcStrToPolindrom('Кекс'); // false
ChekcStrToPolindrom('Лёша на полке клопа нашёл '); // true

function convertTimeToArray(timeStr) {
  const arrayTime = timeStr.split(':');
  for (let i = 0; i < arrayTime.length; i++) {
    arrayTime[i] = +arrayTime[i];
  }
  return arrayTime;
}

function canMeetBetwenWork(workStart, workEnd, meetStart, meetTime) {
  const workStartArray = convertTimeToArray(workStart);
  const workEndArray = convertTimeToArray(workEnd);
  const meetStartArray = convertTimeToArray(meetStart);
  const meetEndArray = [];
  let result = false;
  meetEndArray[0] = meetStartArray[0] + Math.floor(meetTime / 60);
  meetEndArray[1] = meetStartArray[1] + meetTime % 60;
  if (meetStartArray[1] >= 60) {
    meetStartArray[0] += 1;
    meetStartArray[1] = 0;
  }

  if (workStartArray[0] <= meetStartArray[0] & workEndArray[0] >= meetEndArray[0]) {
    if (workStartArray[1] <= meetStartArray[1] & workEndArray[1] >= meetEndArray[1]) {
      result = true;
    }
  }

  return result;
}

console.log(canMeetBetwenWork('08:00', '17:30', '14:00', 90)); // true
console.log(canMeetBetwenWork('8:0', '10:0', '8:0', 120));     // true
console.log(canMeetBetwenWork('08:00', '14:30', '14:00', 90)); // false
console.log(canMeetBetwenWork('14:00', '17:30', '08:0', 90));  // false
console.log(canMeetBetwenWork('8:00', '17:30', '08:00', 900)); // false
