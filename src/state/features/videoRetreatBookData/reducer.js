import { WORK_BOOK_DATA } from './actionTypes';
import { retreatColumnHeaderNames } from '../../../CONSTS/sheetsHeaderConsts';

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

    default:
      return state;
  }
};

export default videoRetreatDataReducers;
