/* eslint-disable react/jsx-no-undef */
import React from 'react';
import RNF from 'react-native-fs';
import { Appbar, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import XLSX from 'xlsx';

const FileExport: () => React$Node = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState('');
  const onDismissSnackBar = () => setVisible(false);
  const run = () => {
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
        setVisible(true);
        setError('');
      })
      .catch((e) => {
        setVisible(e.message);
      });
  };

  return (
    <>
      <Appbar.Action icon="file-excel" onPress={run} color="#fff" />
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        {error || 'Đã xong'}
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(FileExport);
