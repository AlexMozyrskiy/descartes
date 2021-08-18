import { createSelector } from 'reselect';

export const selectVideoRetreatData = (state) => {
  return state.videoRetreatData.retreatSheetsData;
};

export const selectIsDataLoaded = (state) => {
  return state.videoRetreatData.isDataLoaded;
};

// ---------------------------------------------- Расчитаем данные для телеграммы "Телеграмма по таблице Приложение 2 Ведомость учета неисправностей ВСП.xlsx" ----------------------------------------------
export const selectCalculatedDataVSPRetreatTelegram = createSelector([selectVideoRetreatData], (otstData) => {
  // Возвращаемый объект расчитанных данных
  let returnedDataObject = {};

  // третьи и четвертые степени для таблицы 3 и 4 степеней - Массив Объектов такой же по типу как и массив объектов в стейте
  let forAoACreatorAoO = [...otstData];

  // Массив массивов - для формаирования книги excel и рендеринга страницы в браузере
  let forExcelAndPageRenderingData = [];

  // ---------------- массив массивов для формаирования и аплоада отчетной книги по "1. 3 и 4 степени.xlsx" ------------------------
  // forExcelAndPageRenderingData = createThirdAndFourthDegreesAoA(forAoACreatorAoO);
  // ---------------- / массив массивов для формаирования и аплоада отчетной книги по "1. 3 и 4 степени.xlsx" ----------------------

  // ------------------ Запишем собранные данные в объект ----------------------
  returnedDataObject.AoO = forAoACreatorAoO;
  returnedDataObject.forXLSXAoA = forExcelAndPageRenderingData.forXLSXAoA;
  returnedDataObject.forBrowserPageRenderObj = forExcelAndPageRenderingData.forBrowserPageRenderObj;
  // ------------------ / Запишем собранные данные в объект --------------------

  return returnedDataObject;
});
// ---------------------------------------------- / Расчитаем данные для отчета "1. 3 и 4 степени.xlsx" --------------------------------------------
