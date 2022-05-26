import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNF from 'react-native-fs';
import { Menu } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import XLSX from 'xlsx';
import storage from '../storage/storage';
import { setProducts, showMessage } from '../stores/actions';

const FileImport = (props) => {
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
        id: data[0],
        code: data[1],
        name: data[2],
        price: data[3],
        historicalCost: data[4]
      }));
      props.setProducts(products);
      save(products);
      props.showMessage('Đã thêm dữ liêu');
      props.close();
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        props.showMessage(err.message);
      }

      props.close();
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
      <Menu.Item icon="database-plus" onPress={openPicker} title="Thêm dữ liệu" />
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

export default connect(null, mapDispatchToProps)(FileImport);
