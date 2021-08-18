import XLSX from 'xlsx/dist/xlsx.full.min';
import { useDispatch } from 'react-redux';

import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { getArrayForState } from '../../../../library/helpers/forVSPMalfunctionRegisterComponent/getObjectForState';
import { setVideoRetreatData } from '../../../../state/features/videoRetreatBookData/actionCreators';

const VSPMalfunctionRegister = () => {
  const dispatch = useDispatch();
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

          dispatch(setVideoRetreatData(arrayForState));
        };

        reader.onerror = function (event) {
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
