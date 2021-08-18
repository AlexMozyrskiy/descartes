import { WORK_BOOK_DATA, IS_DATA_LOADED } from './actionTypes';

const initialState = {
  retreatSheetsData: [
    /* каждый объект в массиве - 1 строка в экселе */
    {
      sequentialNumber: null,
      carNumber: '',
      dateOfCheck: '',
      dateOfDecryption: '',
      stationName: '',
      trackNumber: '',
      distanceNumber: '',
      kilometer: null,
      meter: null,
      picket: null,
      thread: '',
      retreat: '',
      restrictionNumber: null,
      speedLimit: '',
    },
  ],
  isDataLoaded: false,
};

const videoRetreatDataReducers = (state = initialState, action) => {
  switch (action.type) {
    case WORK_BOOK_DATA: {
      const superState = {
        ...state,

        retreatSheetsData: action.retreatSheetsData.map((item) => {
          return {
            sequentialNumber: +item.sequentialNumber,
            carNumber: item.carNumber,
            dateOfCheck: item.dateOfCheck,
            dateOfDecryption: item.dateOfDecryption,
            stationName: item.stationName,
            trackNumber: item.trackNumber,
            distanceNumber: +item.distanceNumber,
            kilometer: +item.kilometer,
            meter: +item.meter,
            picket: +item.picket,
            thread: item.thread,
            retreat: item.retreat,
            restrictionNumber: +item.restrictionNumber,
            speedLimit: item.speedLimit,
          };
        }),
      };
      return superState;
    }

    case IS_DATA_LOADED: {
      const superState = {
        ...state,
        isDataLoaded: action.isDataLoaded,
      };
      return superState;
    }

    default:
      return state;
  }
};

export default videoRetreatDataReducers;
