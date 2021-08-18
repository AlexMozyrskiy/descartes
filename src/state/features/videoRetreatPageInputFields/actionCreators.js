import { WORK_BOOK_DATA } from './actionTypes';

export const setVideoRetreatData = (workBookDataObject) => {
  return {
    type: WORK_BOOK_DATA,
    workBookDataObject,
  };
};
