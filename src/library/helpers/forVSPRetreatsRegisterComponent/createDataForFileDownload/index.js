/* функция принимает массив объектов (тип как в стейте)
    возвращает массив массивов для формирования книги "Телеграмма по таблице Приложение 2 Ведомость учета неисправностей ВСП.xlsx"
*/

import { distancesAndRegions } from '../../../DB/distancesAndRegionsData';
import { getUniqueNumbersFromArr } from '../../common/getUniqueNumbersFromArr';

export function createDataForFileDownload(data) {
  // возвращаемый объект, тут будет 1 массив и 1 объект:
  // 1 массив - массив массивов для формирования книги excel с помощью библиотеки XLSX;
  // 2 объект - объект для отрисовки таблицы на странице в браузере, состоит из 2 свойств:
  // 1 свойство - массив из элемнтов для создания header`а таблицы,
  // 2 свойство массив массивов с данными для создания тела таблицы.
  let returnedObj = {};

  // массив массивов для формирования книги excel с помощью библиотеки XLSX;
  let forXLSXAoA = [];

  // объект для отрисовки таблицы на странице в браузере, состоит из 2 свойств:
  let forBrowserPageRenderObj = {
    header: [], // 1 свойство - массив из элемнтов для создания header`а тбалица,
    body: [], // 2 свойство массив массивов с данными для создания тела таблицы.
  };

  /* Если файл уже загружен */
  if (data[0].sequentialNumber) {
    const distancesList = data.map((item) => {
      return item.distanceNumber;
    });

    /* ---------- Первая строчка телеграммы ----------------- */
    const uniqueDistanceNumbersArrT = getUniqueNumbersFromArr(distancesList);
    let uniqueDistanceNumbersArr = [];
    uniqueDistanceNumbersArrT.forEach((item) => {
      /* защита от NaN и числа 0 */
      if (item !== 0 && !isNaN(item) && isFinite(item)) uniqueDistanceNumbersArr.push(item);
    });
    const uniqueDistanceNumbersStr = uniqueDistanceNumbersArr.join(',');

    const regionsNumbersArr = uniqueDistanceNumbersArr.map((item) => {
      const distansInfoObj = distancesAndRegions.find((distanceAndRegion) => distanceAndRegion.distanceNumber === item);
      /* если не нашли ПЧ в базе вернем 0 */
      return typeof distansInfoObj === 'undefined' ? 0 : distansInfoObj.regionNumber;
    });
    const uniqueRegionsNumbersArr = getUniqueNumbersFromArr(regionsNumbersArr);
    const uniqueRegionsNumbersStr = uniqueRegionsNumbersArr.join(',');

    // Шапка таблицы
    forXLSXAoA.push([
      `ДИ, НЗ-РБ, ДИЗ-РБ, ДИЗтер-ДИтер-${uniqueRegionsNumbersStr}, П,РЦДМ, ДИЦУСИ, ПЧ-${uniqueDistanceNumbersStr}.`,
    ]);
    forBrowserPageRenderObj.header.push(
      `ДИ, НЗ-РБ, ДИЗ-РБ, ДИЗтер-ДИтер-${uniqueRegionsNumbersStr}, П,РЦДМ, ДИЦУСИ, ПЧ-${uniqueDistanceNumbersStr}.`
    );
    /* ---------- / Первая строчка телеграммы --------------- */

    /* ---------- Вторая строчка телеграммы ----------------- */
    forXLSXAoA.push([
      `Выявлены замечания по результатам расшифровки линейного видеонаблюдения: – ${data.length} шт.: `,
    ]);
    forBrowserPageRenderObj.body.push(
      `Выявлены замечания по результатам расшифровки линейного видеонаблюдения: – ${data.length} шт.: `
    );
    /* ---------- Вторая строчка телеграммы ----------------- */

    /* ---------- Последующие строки телеграммы, перечислем неисправности --------- */
    const getThred = (thread) => {
      const dirstLetter = thread.substr(0, 1);
      if (dirstLetter === 'о') {
        return 'обе нити';
      } else if (dirstLetter === 'л') {
        return 'левая нить';
      } else if (dirstLetter === 'п') {
        return 'правая нить';
      }
    };
    data.forEach((item) => {
      forXLSXAoA.push([
        `${item.stationName} путь ${item.trackNumber}, ${item.kilometer} км ПК ${item.picket} (${
          item.meter
        }м), ${getThred(item.thread)} ${item.retreat}${item.value === '' ? item.value : `, величина ${item.value}`} `,
      ]);

      forBrowserPageRenderObj.body.push(
        `${item.stationName} путь ${item.trackNumber}, ${item.kilometer} км ПК ${item.picket} (${
          item.meter
        }м), ${getThred(item.thread)} ${item.retreat}${item.value === '' ? item.value : `, величина ${item.value}`} `
      );
    });
    /* ---------- / Последующие строки телеграммы, перечислем неисправности ------- */
  }

  returnedObj = {
    forXLSXAoA,
    forBrowserPageRenderObj,
  };

  return returnedObj;
}
