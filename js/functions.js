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
