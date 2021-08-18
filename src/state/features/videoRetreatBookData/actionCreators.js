import { WORK_BOOK_DATA, IS_DATA_LOADED } from './actionTypes';

export const setVideoRetreatData = (retreatSheetsData) => {
  return {
    type: WORK_BOOK_DATA,
    retreatSheetsData,
  };
};

export const setIsDataLoaded = (booleanVar) => {
  return {
    type: IS_DATA_LOADED,
    isDataLoaded: booleanVar,
  };
};
