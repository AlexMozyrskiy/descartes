import XLSX from 'xlsx/dist/xlsx.full.min';
import { useDispatch, useSelector } from 'react-redux';

import { Upload, Button, Alert } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

import { initialState } from '../../../../state/features/videoRetreatBookData/reducer';
import { getArrayForState } from '../../../../library/helpers/forVSPRetreatsRegisterComponent/getObjectForState';
import { setVideoRetreatData, setIsDataLoaded } from '../../../../state/features/videoRetreatBookData/actionCreators';
import {
  selectIsDataLoaded,
  selectCalculatedDataVSPRetreatTelegram,
  selectVideoRetreatData,
} from '../../../../state/features/videoRetreatBookData/selectors';
import { createAndUploadWorkBook } from '../../../../library/helpers/common/createAndUploadWorkBook';
import { createDataForFileDownload } from '../../../../library/helpers/forVSPRetreatsRegisterComponent/createDataForFileDownload';

const VSPRetreatRegister = () => {
  const dispatch = useDispatch();

  const isDataLoaded = useSelector(selectIsDataLoaded);
  const calculatingData = useSelector(selectCalculatedDataVSPRetreatTelegram);
  const data = useSelector(selectVideoRetreatData);

  const onFileDeleteClick = () => {
    dispatch(setVideoRetreatData(initialState.retreatSheetsData));
    dispatch(setIsDataLoaded(false));
  };

  // ------------ Пропсы которые будем передавать в Upload Ant Design, тут и метод при изменении аплоада, то есть загрузки файла ------------
  const props = {
    // name: 'file',
    // action: null,
    // headers: {
    //     authorization: 'authorization-text',
    // },
    onChange(evt) {
      const selectedFile = typeof evt.fileList[0] !== 'undefined' ? evt.fileList[0].originFileObj : null; // выбранный в браузере файл, один, так как запрещен мульти выбор файлов

      if (selectedFile) {
        // если файл был выбран. эта проверка чтобы если пользователь нажал кнопку выбрать файл а потом закрыл окно с выбором файла не выбрав его
        let reader = new FileReader();
        reader.readAsBinaryString(selectedFile);
        reader.onload = function (event) {
          const data = event.target.result;
          const workBook = XLSX.read(data, {
            type: 'binary',
          });

          const workSheetDataObj = workBook.Sheets['Приложение 1 '];
          const arrayForState = getArrayForState(workSheetDataObj);
          console.log(arrayForState);

          dispatch(setVideoRetreatData(arrayForState));
          dispatch(setIsDataLoaded(true));
        };

        reader.onerror = function (event) {
          console.error('Файл не может быть прочитан. Код ошибки: ' + event.target.error.code);
        };
      }
    },
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: 'download ',
      showRemoveIcon: true,
      removeIcon: <DeleteOutlined onClick={onFileDeleteClick} />,
    },
  };
  // ------------ / Пропсы которые будем передавать в Upload Ant Design, тут и метод при изменении аплоада, то есть загрузки файла ----------

  // ------------------------------------ Declare функцию вызывающуюся при нажатии на кнопку для выгрузки сформирвоанного отчетного файла ------------------------------------------------
  const onSaveButtonClick = () => {
    createDataForFileDownload(data);
    // const data = calculatingData.forXLSXAoA; // данные из селектора - массив массивов для формирования отчетной xlsx книги

    // createAndUploadWorkBook(
    //   // Создает и предлагает скачать юзеру книгу со сформированным отчетом
    //   data, // данные для записи
    //   '1. 3 и 4 степени.xlsx', // имя создаваемой отчетной книги
    //   '3 и 4 степени' // имя листа в этой книге
    // );
  };
  // ------------------------------------ Declare функцию вызывающуюся при нажатии на кнопку для выгрузки сформирвоанного отчетного файла ------------------------------------------------

  return (
    <div>
      {!isDataLoaded ? (
        <Alert message='Загрузите Файл' type='error' showIcon style={{ marginBottom: '10px' }} />
      ) : (
        <Alert message='Файл Загружен' type='success' showIcon style={{ marginBottom: '10px' }} />
      )}
      <Upload {...props}>
        <Button type='primary' icon={<UploadOutlined />}>
          Загрузить файл
        </Button>
      </Upload>
      <button onClick={onSaveButtonClick}></button>
    </div>
  );
};

export default VSPRetreatRegister;
