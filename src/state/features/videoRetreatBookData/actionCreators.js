import { WORK_BOOK_DATA } from './actionTypes';

export const setVideoRetreatData = (retreatSheetsData) => {
  return {
    type: WORK_BOOK_DATA,
    retreatSheetsData,
  };
};
