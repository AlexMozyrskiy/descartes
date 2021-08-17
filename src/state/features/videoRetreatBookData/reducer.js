import { WORK_BOOK_DATA } from './actionTypes';
import { headersConst } from '../../../CONSTS/sheetsHeaderConsts';

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
      distanceNumber: null,
      kilometer: null,
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

        retreatSheetsData: action.workBookDataObject.retreatSheetsData.map((item) => {
          return {
            sequentialNumber: +item[headersConst.SEQUENTIAL_NUMBER],
            carNumber: item[headersConst.CAR_NUMBER],
            dateOfCheck: item[headersConst.DATE_OF_CHECK],
            dateOfDecryption: item[headersConst.DATE_OF_DECRYPTION],
            stationName: item[headersConst.STATION_NAME],
            trackNumber: item[headersConst.TRACK_NUMBER],
            distanceNumber: +item[headersConst.DISTANCE_NUMBER],
            kilometer: +item[headersConst.KILOMETER],
            picket: +item[headersConst.PICKET],
            thread: item[headersConst.THREAD],
            retreat: item[headersConst.RETREAT],
            restrictionNumber: +item[headersConst.RESTRICTION_NUMBER],
            speedLimit: item[headersConst.SPEED_LIMIT],
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
