import XLSX from 'xlsx/dist/xlsx.full.min';

import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { getRowsCount } from '../../../../library/helpers/getRowsCount';

const VSPMalfunctionRegister = () => {
  // ------------ Пропсы которые будем передавать в Upload Ant Design, тут и метод при изменении аплоада, то есть загрузки файла ------------
  const props = {
    // name: 'file',
    // action: null,
    // headers: {
    //     authorization: 'authorization-text',
    // },
    onChange(evt) {
      let workBookData; // возвращаем объект для сета его в глобальные стейт
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
          const workSheetDataJson = XLSX.utils.sheet_to_json(workSheetDataObj);
          console.log(workSheetDataObj);
          console.log(getRowsCount(workSheetDataObj));

          workBookData = {
            retreatSheetsData: workSheetDataJson,
          };

          // dispatch(setWorkBookDataThunkCreator(workBookData));
        };

        reader.onerror = function (event) {
          workBookData = null;
          console.error('Файл не может быть прочитан. Код ошибки: ' + event.target.error.code);
        };
      }
    },
  };
  // ------------ / Пропсы которые будем передавать в Upload Ant Design, тут и метод при изменении аплоада, то есть загрузки файла ----------

  return (
    <div>
      <Upload {...props}>
        <Button type='primary' icon={<UploadOutlined />}>
          Загрузить файл
        </Button>
      </Upload>
    </div>
  );
};

export default VSPMalfunctionRegister;
