import { getRowsCount } from '../../common/getRowsCount';
// import { definePicketByMeter } from '../../common/definePicketByMeter';

export const getArrayForState = (parsedObject) => {
  const rowsCount = getRowsCount(parsedObject);

  let returnedArray = [];

  for (let i = 4; i <= rowsCount; i++) {
    returnedArray.push({
      sequentialNumber: isUndefinedReturnEmtyStr(parsedObject, 'A', i),
      carNumber: isUndefinedReturnEmtyStr(parsedObject, 'B', i),
      dateOfCheck: isUndefinedReturnEmtyStr(parsedObject, 'C', i),
      dateOfDecryption: isUndefinedReturnEmtyStr(parsedObject, 'D', i),
      stationName: isUndefinedReturnEmtyStr(parsedObject, 'E', i),
      trackNumber: isUndefinedReturnEmtyStr(parsedObject, 'F', i),
      distanceNumber: isUndefinedReturnEmtyStr(parsedObject, 'G', i),
      kilometer: isUndefinedReturnEmtyStr(parsedObject, 'H', i),
      meter: parceMeter(isUndefinedReturnEmtyStr(parsedObject, 'I', i)),
      picket: parcePicket(isUndefinedReturnEmtyStr(parsedObject, 'I', i)),
      thread: isUndefinedReturnEmtyStr(parsedObject, 'J', i),
      retreat: isUndefinedReturnEmtyStr(parsedObject, 'K', i),
      restrictionNumber: isUndefinedReturnEmtyStr(parsedObject, 'L', i),
      speedLimit: isUndefinedReturnEmtyStr(parsedObject, 'M', i),
      value: isUndefinedReturnEmtyStr(parsedObject, 'N', i)
    });
  }

  /**
   * Если передано undefined то есть такой ячейки не существует в excele или она не заполнена
   * вернет '', в противном случае вернет value этой ячейки
   *
   * @param {Object} parsedObject - спарсеный объект из excel
   * @param {String} columnLiter - Буква соответствуюшая Названию колонки в excel
   * @param {number} rowNumber - Цифра соответствуюшая номеру строки в excel
   * @returns
   */
  function isUndefinedReturnEmtyStr(parsedObject, columnLiter, rowNumber) {
    if (typeof parsedObject[`${columnLiter}${rowNumber}`] === 'undefined') {
      return '';
    } else {
      return parsedObject[`${columnLiter}${rowNumber}`].w;
    }
  }

  return returnedArray;
};

/**
 *
 * @param {String} picketAndMeter - строка вида '2/118'
 */
function parceMeter(picketAndMeter) {
  const splited = picketAndMeter.split('/');
  const meter = splited[1];
  return meter;
}

/**
 *
 * @param {String} picketAndMeter - строка вида '2/118'
 */
function parcePicket(picketAndMeter) {
  const splited = picketAndMeter.split('/');
  const picket = splited[0];
  return picket;
}
