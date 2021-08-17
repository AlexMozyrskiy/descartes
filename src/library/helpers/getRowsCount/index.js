/**
 * Считает количество заполненных ячеек в колонке "А" файла excel
 *
 * @param {Object} parsedObject - объект парс excel файла с помощью библиотеки XLSX
 * @returns
 */
export const getRowsCount = (parsedObject) => {
  let counter = 0;

  Object.keys(parsedObject).forEach((item) => {
    if (item.slice(0, 1) === 'A') {
      counter++;
    }
  });

  return counter;
};
