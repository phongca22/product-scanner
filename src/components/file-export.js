import React from 'react';
import RNF from 'react-native-fs';
import { Menu } from 'react-native-paper';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import XLSX from 'xlsx';
import { showMessage } from '../stores/actions';

const FileExport: () => React$Node = (props) => {
  let isAccess = false;
  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;
        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          isAccess = true;
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

  const run = async () => {
    if (!isAccess) {
      const status = await request(PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (status !== RESULTS.GRANTED) {
        props.showMessage('Chưa cấp quyền ghi vào bộ nhớ của điện thoại');
        return;
      }
    }

    const worksheet = XLSX.utils.json_to_sheet(
      props.products.map((val) => ({
        ...val,
        price: parseInt(val.price, 10),
        historicalCost: parseInt(val.historicalCost, 10)
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HangHoa');
    XLSX.utils.sheet_add_aoa(worksheet, [['STT', 'MaHang', 'TenHang_V', 'Giá tiền', 'Giá gốc']], { origin: 'A1' });

    const wbout = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
    var file = RNF.DownloadDirectoryPath + '/tap-hoa.xlsx';
    RNF.writeFile(file, wbout, 'ascii')
      .then((r) => {
        props.showMessage('Đã xuất file tap-hoa.xlsx vào thư mục Download');
      })
      .catch((e) => {
        props.showMessage(e.message);
      })
      .finally(() => props.close());
  };

  return (
    <>
      <Menu.Item icon="file-excel" onPress={run} title="Xuất file" />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showMessage: showMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FileExport);
