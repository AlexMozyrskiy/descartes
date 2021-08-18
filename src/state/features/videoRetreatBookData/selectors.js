// import { createSelector } from "reselect";

export const selectVideoRetreatData = (state) => {
  return state.videoRetreatData.retreatSheetsData;
};

export const selectIsDataLoaded = (state) => {
  return state.videoRetreatData.isDataLoaded;
};
