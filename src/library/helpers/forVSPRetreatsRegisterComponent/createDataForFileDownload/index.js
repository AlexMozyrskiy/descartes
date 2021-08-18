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
    const uniqueDistanceNumbersArr = getUniqueNumbersFromArr(distancesList);
    const uniqueDistanceNumbersStr = uniqueDistanceNumbersArr.join(',');

    const regionsNumbersArr = uniqueDistanceNumbersArr.map((item) => {
      const distansInfoObj = distancesAndRegions.find((distanceAndRegion) => distanceAndRegion.distanceNumber === item);
      return distansInfoObj.regionNumber;
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
    data.forEach((item, i) => {
      forXLSXAoA.push([
        `${item.stationName} путь ${item.trackNumber}, ${item.kilometer} км ПК ${item.picket} (${item.meter}м), ${item.thread} нить ${item.retreat}`,
      ]);

      forBrowserPageRenderObj.body.push(
        `${item.stationName} путь ${item.trackNumber}, ${item.kilometer} км ПК ${item.picket} (${item.meter}м), ${item.thread} нить ${item.retreat}`
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
