import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNF from 'react-native-fs';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import XLSX from 'xlsx';
import storage from '../storage/storage';
import { setProducts, showMessage } from '../stores/actions';

const FilePicker = (props) => {
  openPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx, DocumentPicker.types.xls]
      });
      const file = await RNF.readFile(res.uri, 'base64');
      const workbook = XLSX.read(file, { type: 'base64' });
      var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var result = XLSX.utils.sheet_to_json(first_worksheet, {
        header: 1
      });
      result.shift();
      const products = result.map((data) => ({
        id: data[0].toString(),
        code: data[1].toString(),
        name: data[2],
        price: data[3].toString(),
        historicalCost: data[4].toString()
      }));
      props.setProducts(products);
      save(products);
      props.showMessage('Đã thêm dữ liêu');
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        setError(err.message);
        setVisible(true);
      }
    }
  };

  save = (data) => {
    storage.save({
      key: 'products',
      data: data
    });
  };

  return (
    <>
      <Appbar.Action icon="database-plus" onPress={openPicker} color="#fff" />
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setProducts: setProducts,
      showMessage: showMessage
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(FilePicker);
